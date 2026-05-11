import { getSupabaseServer, hasSupabaseEnv, jsonOk, jsonError } from '../../lib/supabaseServer';

export const dynamic = 'force-dynamic';

function normalize(body){
  return {
    cargo: String(body.cargo || '').trim(),
    nome: String(body.nome || body.responsavel || '').trim(),
    funcao: body.funcao || '',
    periodo_al: body.periodo_al || 'AL 2026/2027',
    foto_url: body.foto_url || '',
    ordem: Number(body.ordem || 100),
    ativo: body.ativo !== false
  };
}

export async function GET(){
  if(!hasSupabaseEnv()) return jsonOk([], { mode: 'local-fallback', configured: false });
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('diretoria')
    .select('*')
    .order('ordem', { ascending: true })
    .order('criado_em', { ascending: true });
  if(error) return jsonError(error.message, 500);
  return jsonOk(data || [], { mode: 'supabase', configured: true });
}

export async function POST(request){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda nao configurado na Vercel.', 503);
  const supabase = getSupabaseServer();
  const body = await request.json();
  const payload = normalize(body);
  if(!payload.cargo) return jsonError('Cargo obrigatorio.', 400);
  if(!payload.nome) return jsonError('Responsavel obrigatorio.', 400);

  if(body.id){
    const { data, error } = await supabase.from('diretoria').update(payload).eq('id', body.id).select('*').single();
    if(error) return jsonError(error.message, 500);
    return jsonOk(data, { action: 'updated' });
  }

  const { data, error } = await supabase.from('diretoria').insert(payload).select('*').single();
  if(error) return jsonError(error.message, 500);
  return jsonOk(data, { action: 'created' });
}

export async function DELETE(request){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda nao configurado na Vercel.', 503);
  const id = new URL(request.url).searchParams.get('id');
  if(!id) return jsonError('ID obrigatorio.', 400);
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('diretoria').delete().eq('id', id);
  if(error) return jsonError(error.message, 500);
  return jsonOk({ id });
}

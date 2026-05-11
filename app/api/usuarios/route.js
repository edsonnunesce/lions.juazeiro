import { getSupabaseServer, hasSupabaseEnv, jsonOk, jsonError } from '../../lib/supabaseServer';

export const dynamic = 'force-dynamic';

function normalize(body){
  return {
    nome: String(body.nome || body.name || '').trim(),
    email: String(body.email || '').trim().toLowerCase(),
    senha_temporaria: String(body.senha_temporaria || body.password || '').trim(),
    perfil: body.perfil || body.role || 'campanhas',
    ativo: body.ativo !== false
  };
}

export async function GET(){
  if(!hasSupabaseEnv()) return jsonOk([], { mode: 'local-fallback', configured: false });
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('usuarios_admin')
    .select('id,nome,email,perfil,ativo,criado_em')
    .order('criado_em', { ascending: false });
  if(error) return jsonError(error.message, 500);
  return jsonOk(data || [], { mode: 'supabase', configured: true });
}

export async function POST(request){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda nao configurado na Vercel.', 503);
  const supabase = getSupabaseServer();
  const body = await request.json();
  const payload = normalize(body);
  if(!payload.nome) return jsonError('Nome obrigatorio.', 400);
  if(!payload.email) return jsonError('Email obrigatorio.', 400);
  if(!payload.senha_temporaria) return jsonError('Senha temporaria obrigatoria.', 400);

  if(body.id){
    const { data, error } = await supabase.from('usuarios_admin').update(payload).eq('id', body.id).select('id,nome,email,perfil,ativo,criado_em').single();
    if(error) return jsonError(error.message, 500);
    return jsonOk(data, { action: 'updated' });
  }

  const { data, error } = await supabase.from('usuarios_admin').insert(payload).select('id,nome,email,perfil,ativo,criado_em').single();
  if(error) return jsonError(error.message, 500);
  return jsonOk(data, { action: 'created' });
}

export async function DELETE(request){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda nao configurado na Vercel.', 503);
  const id = new URL(request.url).searchParams.get('id');
  if(!id) return jsonError('ID obrigatorio.', 400);
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('usuarios_admin').delete().eq('id', id);
  if(error) return jsonError(error.message, 500);
  return jsonOk({ id });
}

import { getSupabaseServer, hasSupabaseEnv, jsonOk, jsonError } from '../../lib/supabaseServer';

export const dynamic = 'force-dynamic';

function normalize(body){
  return {
    secao: String(body.secao || '').trim(),
    titulo: String(body.titulo || '').trim(),
    imagem_url: String(body.imagem_url || body.url || '').trim(),
    legenda: String(body.legenda || '').trim(),
    credito: String(body.credito || '').trim(),
    edicao_id: String(body.edicao_id || 'al-2025-2026-001').trim(),
    ordem: Number(body.ordem || 100),
    ativo: body.ativo !== false
  };
}

export async function GET(){
  if(!hasSupabaseEnv()) return jsonOk([], { mode: 'local-fallback', configured: false });
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('revista_imagens')
    .select('*')
    .eq('ativo', true)
    .order('secao', { ascending: true })
    .order('ordem', { ascending: true })
    .order('criado_em', { ascending: false });
  if(error) return jsonError(error.message, 500);
  return jsonOk(data || [], { mode: 'supabase', configured: true });
}

export async function POST(request){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda nao configurado na Vercel.', 503);
  const supabase = getSupabaseServer();
  const body = await request.json();
  const payload = normalize(body);
  if(!payload.secao) return jsonError('Secao obrigatoria.', 400);
  if(!payload.imagem_url) return jsonError('URL da imagem obrigatoria.', 400);

  if(body.id){
    const { data, error } = await supabase.from('revista_imagens').update(payload).eq('id', body.id).select('*').single();
    if(error) return jsonError(error.message, 500);
    return jsonOk(data, { action: 'updated' });
  }

  const { data, error } = await supabase.from('revista_imagens').insert(payload).select('*').single();
  if(error) return jsonError(error.message, 500);
  return jsonOk(data, { action: 'created' });
}

export async function DELETE(request){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda nao configurado na Vercel.', 503);
  const id = new URL(request.url).searchParams.get('id');
  if(!id) return jsonError('ID obrigatorio.', 400);
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('revista_imagens').delete().eq('id', id);
  if(error) return jsonError(error.message, 500);
  return jsonOk({ id });
}

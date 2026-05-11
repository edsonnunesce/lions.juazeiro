import { getSupabaseServer, hasSupabaseEnv, jsonOk, jsonError } from '../../lib/supabaseServer';

export const dynamic = 'force-dynamic';

function normalize(body){
  return {
    titulo: String(body.titulo || '').trim(),
    causa_global: String(body.causa_global || 'Esforços Humanitários').trim(),
    data_inicio: body.data_inicio || new Date().toISOString().slice(0,10),
    local: body.local || '',
    resumo: body.resumo || '',
    fotos: Array.isArray(body.fotos) ? body.fotos : String(body.fotos || '').split(',').map(x=>x.trim()).filter(Boolean),
    status: body.status || 'publicada',
    entra_revista: body.entra_revista !== false
  };
}

export async function GET(){
  if(!hasSupabaseEnv()) return jsonOk([], { mode: 'local-fallback', configured: false });
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('campanhas')
    .select('*')
    .order('data_inicio', { ascending: false })
    .order('criado_em', { ascending: false });
  if(error) return jsonError(error.message, 500);
  return jsonOk(data || [], { mode: 'supabase', configured: true });
}

export async function POST(request){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda nao configurado na Vercel.', 503);
  const supabase = getSupabaseServer();
  const body = await request.json();
  const payload = normalize(body);
  if(!payload.titulo) return jsonError('Titulo obrigatorio.', 400);

  if(body.id){
    const { data, error } = await supabase.from('campanhas').update(payload).eq('id', body.id).select('*').single();
    if(error) return jsonError(error.message, 500);
    return jsonOk(data, { action: 'updated' });
  }

  const { data, error } = await supabase.from('campanhas').insert(payload).select('*').single();
  if(error) return jsonError(error.message, 500);
  return jsonOk(data, { action: 'created' });
}

export async function DELETE(request){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda nao configurado na Vercel.', 503);
  const id = new URL(request.url).searchParams.get('id');
  if(!id) return jsonError('ID obrigatorio.', 400);
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('campanhas').delete().eq('id', id);
  if(error) return jsonError(error.message, 500);
  return jsonOk({ id });
}

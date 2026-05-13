import { getSupabaseServer, hasSupabaseEnv, jsonOk, jsonError } from '../../lib/supabaseServer';

export const dynamic = 'force-dynamic';

function normalizeDate(value){
  const raw = String(value || '').trim();
  if(!raw) return new Date().toISOString().slice(0,10);
  if(/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const br = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if(br){
    const day = br[1].padStart(2,'0');
    const month = br[2].padStart(2,'0');
    const year = br[3];
    return `${year}-${month}-${day}`;
  }
  const dashedBr = raw.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if(dashedBr){
    const day = dashedBr[1].padStart(2,'0');
    const month = dashedBr[2].padStart(2,'0');
    const year = dashedBr[3];
    return `${year}-${month}-${day}`;
  }
  return raw;
}

function normalize(body){
  return {
    titulo: String(body.titulo || '').trim(),
    causa_global: String(body.causa_global || 'Esforços Humanitários').trim(),
    data_inicio: normalizeDate(body.data_inicio),
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

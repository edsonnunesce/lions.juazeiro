import { getSupabaseServer, hasSupabaseEnv, jsonOk, jsonError } from '../../lib/supabaseServer';

export const dynamic = 'force-dynamic';

const DEFAULT_ROWS = [
  { cargo:'Presidente', nome:'Arlete de Sá Barreto', funcao:'Representação institucional e presidência do clube', periodo_al:'AL 2026/2027', foto_url:'', ordem:10, ativo:true },
  { cargo:'Vice-Presidente', nome:'Francisco Mauricio Gomes da Silva', funcao:'Apoio à presidência e substituição institucional', periodo_al:'AL 2026/2027', foto_url:'', ordem:20, ativo:true },
  { cargo:'Secretário', nome:'José Batista Neto', funcao:'Secretaria, atas e documentação do clube', periodo_al:'AL 2026/2027', foto_url:'', ordem:30, ativo:true },
  { cargo:'Tesoureiro', nome:'Gildemar Grangeiro Pereira', funcao:'Tesouraria e organização financeira', periodo_al:'AL 2026/2027', foto_url:'', ordem:40, ativo:true },
  { cargo:'Assessor de LCIF', nome:'Francisco Mauricio Gomes da Silva', funcao:'Articulação com a Fundação de Lions Clubs International', periodo_al:'AL 2026/2027', foto_url:'', ordem:50, ativo:true },
  { cargo:'Diretora Social', nome:'Vera Lucia Gomes da Silva', funcao:'Organização social e integração do clube', periodo_al:'AL 2026/2027', foto_url:'', ordem:60, ativo:true },
  { cargo:'Diretor de Clube', nome:'Josino Pinheiro Torres', funcao:'Apoio à administração e às atividades do clube', periodo_al:'AL 2026/2027', foto_url:'', ordem:70, ativo:true },
  { cargo:'Diretora de Patrimônio', nome:'Josefa Maria dos Santos Vieira', funcao:'Gestão e acompanhamento do patrimônio', periodo_al:'AL 2026/2027', foto_url:'', ordem:80, ativo:true },
  { cargo:'Assessor de Sócios', nome:'Antônio Avartanhas de Sousa', funcao:'Quadro associativo e desenvolvimento de associados', periodo_al:'AL 2026/2027', foto_url:'', ordem:90, ativo:true },
  { cargo:'Assessor de Marketing', nome:'Edson Nunes Pereira', funcao:'Comunicação, marketing e presença digital', periodo_al:'AL 2026/2027', foto_url:'', ordem:100, ativo:true },
  { cargo:'Associado', nome:'Antônio Avartanhas de Sousa', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1000, ativo:true },
  { cargo:'Associado', nome:'Arlete de Sá Barreto', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1001, ativo:true },
  { cargo:'Associado', nome:'Elisabeth de Sá Barreto Sabiá', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1002, ativo:true },
  { cargo:'Associado', nome:'Edson Nunes Pereira', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1003, ativo:true },
  { cargo:'Associado', nome:'Francisco Mauricio Gomes da Silva', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1004, ativo:true },
  { cargo:'Associado', nome:'Francisco Romualdo de Lima', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1005, ativo:true },
  { cargo:'Associado', nome:'Gildemar Grangeiro Pereira', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1006, ativo:true },
  { cargo:'Associado', nome:'Helena Maria Sampaio Figueiredo', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1007, ativo:true },
  { cargo:'Associado', nome:'João Aécio Sabiá', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1008, ativo:true },
  { cargo:'Associado', nome:'José Batista Neto', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1009, ativo:true },
  { cargo:'Associado', nome:'Josefa Maria dos Santos Vieira', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1010, ativo:true },
  { cargo:'Associado', nome:'Josino Pinheiro Torres', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1011, ativo:true },
  { cargo:'Associado', nome:'Maria Auxiliadora Ribeiro', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1012, ativo:true },
  { cargo:'Associado', nome:'Maria de Fátima Ferreira Torres', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1013, ativo:true },
  { cargo:'Associado', nome:'Maria de Fátima Grangeiro', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1014, ativo:true },
  { cargo:'Associado', nome:'Maria Ozilauba Coelho Batista', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1015, ativo:true },
  { cargo:'Associado', nome:'Vera Lucia Gomes da Silva', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1016, ativo:true },
  { cargo:'Associado', nome:'Vicência da Silva Pinheiro de Sousa', funcao:'Associado do Lions Clube de Juazeiro do Norte', periodo_al:'Quadro associativo atual', foto_url:'', ordem:1017, ativo:true }
];

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
  if(!hasSupabaseEnv()) return jsonOk(DEFAULT_ROWS, { mode: 'official-fallback', configured: false });
  try{
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('diretoria')
      .select('*')
      .order('ordem', { ascending: true })
      .order('criado_em', { ascending: true });
    if(error) throw error;
    return jsonOk(data && data.length ? data : DEFAULT_ROWS, { mode: data && data.length ? 'supabase' : 'official-fallback', configured: true });
  }catch(error){
    return jsonOk(DEFAULT_ROWS, { mode: 'official-fallback', configured: true, databaseError: String(error.message || error) });
  }
}

export async function POST(request){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda nao configurado na Vercel.', 503);
  try{
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
  }catch(error){
    return jsonError(String(error.message || error), 500);
  }
}

export async function DELETE(request){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda nao configurado na Vercel.', 503);
  try{
    const id = new URL(request.url).searchParams.get('id');
    if(!id) return jsonError('ID obrigatorio.', 400);
    const supabase = getSupabaseServer();
    const { error } = await supabase.from('diretoria').delete().eq('id', id);
    if(error) return jsonError(error.message, 500);
    return jsonOk({ id });
  }catch(error){
    return jsonError(String(error.message || error), 500);
  }
}

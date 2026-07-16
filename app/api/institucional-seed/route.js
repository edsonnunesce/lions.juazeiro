import { getSupabaseServer, hasSupabaseEnv, jsonOk, jsonError } from '../../lib/supabaseServer';

export const dynamic = 'force-dynamic';

const diretoria = [
  ['Presidente','Arlete de Sá Barreto','Representação institucional e presidência do clube',10],
  ['Vice-Presidente','Francisco Mauricio Gomes da Silva','Apoio à presidência e substituição institucional',20],
  ['Secretário','José Batista Neto','Secretaria, atas e documentação do clube',30],
  ['Tesoureiro','Gildemar Grangeiro Pereira','Tesouraria e organização financeira',40],
  ['Assessor de LCIF','Francisco Mauricio Gomes da Silva','Articulação com a Fundação de Lions Clubs International',50],
  ['Diretora Social','Vera Lucia Gomes da Silva','Organização social e integração do clube',60],
  ['Diretor de Clube','Josino Pinheiro Torres','Apoio à administração e às atividades do clube',70],
  ['Diretora de Patrimônio','Josefa Maria dos Santos Vieira','Gestão e acompanhamento do patrimônio',80],
  ['Assessor de Sócios','Antônio Avartanhas de Sousa','Quadro associativo e desenvolvimento de associados',90],
  ['Assessor de Marketing','Edson Nunes Pereira','Comunicação, marketing e presença digital',100]
];

const associados = [
  'Antônio Avartanhas de Sousa','Arlete de Sá Barreto','Elisabeth de Sá Barreto Sabiá','Edson Nunes Pereira',
  'Francisco Mauricio Gomes da Silva','Francisco Romualdo de Lima','Gildemar Grangeiro Pereira','Helena Maria Sampaio Figueiredo',
  'João Aécio Sabiá','José Batista Neto','Josefa Maria dos Santos Vieira','Josino Pinheiro Torres','Maria Auxiliadora Ribeiro',
  'Maria de Fátima Ferreira Torres','Maria de Fátima Grangeiro','Maria Ozilauba Coelho Batista','Vera Lucia Gomes da Silva',
  'Vicência da Silva Pinheiro de Sousa'
];

async function ensureRow(supabase, payload){
  const { data: existing, error: findError } = await supabase.from('diretoria').select('id').eq('cargo', payload.cargo).eq('nome', payload.nome).limit(1);
  if(findError) throw findError;
  if(existing && existing.length){
    const { error } = await supabase.from('diretoria').update(payload).eq('id', existing[0].id);
    if(error) throw error;
    return 'updated';
  }
  const { error } = await supabase.from('diretoria').insert(payload);
  if(error) throw error;
  return 'inserted';
}

export async function POST(){
  if(!hasSupabaseEnv()) return jsonError('Supabase ainda não configurado.',503);
  try{
    const supabase=getSupabaseServer();
    let inserted=0,updated=0;
    for(const [cargo,nome,funcao,ordem] of diretoria){
      const action=await ensureRow(supabase,{cargo,nome,funcao,periodo_al:'AL 2026/2027',foto_url:'',ordem,ativo:true});
      action==='inserted'?inserted++:updated++;
    }
    for(let i=0;i<associados.length;i++){
      const action=await ensureRow(supabase,{cargo:'Associado',nome:associados[i],funcao:'Associado do Lions Clube de Juazeiro do Norte',periodo_al:'Quadro associativo atual',foto_url:'',ordem:1000+i,ativo:true});
      action==='inserted'?inserted++:updated++;
    }
    return jsonOk({inserted,updated,total:diretoria.length+associados.length});
  }catch(error){return jsonError(error.message,500);}
}

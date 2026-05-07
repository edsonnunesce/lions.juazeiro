import revistaDb from '../../data/lions-revista-db';

export const dynamic = 'force-dynamic';

export async function GET(){
  const payload = {
    updatedAt: revistaDb.updatedAt,
    automation: revistaDb.monthlyAutomation,
    sources: revistaDb.sources.map(source => ({
      id: source.id,
      title: source.title,
      scope: source.scope,
      url: source.url,
      autoRefresh: Boolean(source.autoRefresh)
    })),
    nextStep: 'Este endpoint lista as fontes oficiais que devem ser consultadas mensalmente por rotina agendada. Campanhas locais permanecem manuais e validadas pela diretoria.'
  };
  return Response.json(payload, {
    headers: {
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=604800'
    }
  });
}

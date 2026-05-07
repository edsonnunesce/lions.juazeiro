const databaseModel = {
  provider: 'supabase',
  status: 'prepared',
  tables: {
    campaigns: {
      description: 'Campanhas locais do Lions Clube Juazeiro do Norte',
      fields: ['id','titulo','data_inicio','data_fim','mes_referencia','causa_global','local','resumo','texto_completo','pessoas_atendidas','voluntarios','parceiros','responsavel','fotos','status','entra_revista','edicao_destino']
    },
    directors: {
      description: 'Diretoria e cargos do clube',
      fields: ['id','nome','cargo','funcao','periodo_al','foto_url','ordem','ativo']
    },
    magazineIssues: {
      description: 'Edicoes mensais da revista virtual',
      fields: ['id','codigo','numero','titulo','mes_referencia','periodo_al','capa','editorial','mensagem_presidencia','status','pdf_url']
    },
    officialSources: {
      description: 'Fontes oficiais Lions International, LCIF, LION Magazine, DMLA e LA-4',
      fields: ['id','origem','escopo','titulo','url','resumo','categoria','data_publicacao','data_coleta','entra_site','entra_revista','status']
    }
  },
  monthlyLogic: {
    localCampaignRule: 'Campanhas cadastradas do dia 1 ao ultimo dia do mes alimentam a revista do mes seguinte.',
    officialSourcesRule: 'Fontes oficiais alimentam site e revista mensalmente.',
    localValidationRule: 'Conteudo local depende de validacao manual da diretoria.'
  }
};

export default databaseModel;

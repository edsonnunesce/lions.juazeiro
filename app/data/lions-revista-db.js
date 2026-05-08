const revistaDb = {
  updatedAt: '2026-05-08',
  project: 'Lions Clube Juazeiro do Norte - Revista Virtual',
  editorialPolicy: {
    purpose: 'Base inicial para revista virtual mensal do Lions Clube Juazeiro do Norte.',
    rules: [
      'Separar dados oficiais, dados publicos e conteudo local validado.',
      'Toda edicao deve conter fontes e data de coleta.',
      'A revista deve ser exibida na pagina e exportavel em PDF via impressao do navegador.',
      'Fontes internacionais, LCIF, LION Magazine, Distrito Multiplo e LA-4 devem retroalimentar a revista mensalmente.',
      'Campanhas e atividades locais do Lions Juazeiro devem ser atualizadas manualmente pela diretoria autorizada.'
    ]
  },
  sources: [
    { id: 'lci-impact-pt', scope: 'global', title: 'O nosso impacto global', url: 'https://www.lionsclubs.org/pt/our-impact/our-service/our-global-impact', autoRefresh: true },
    { id: 'lci-service-reporting-pt', scope: 'global', title: 'Relatorios de Servicos', url: 'https://www.lionsclubs.org/pt/member-resource-center/service/resources/service-journey/service-reporting', autoRefresh: true },
    { id: 'lci-leaders', scope: 'global', title: 'Lideres de Lions International', url: 'https://www.lionsclubs.org/en/discover-our-clubs/our-leaders', autoRefresh: true },
    { id: 'lci-presidential-theme', scope: 'global', title: 'Tema Presidencial 2025/2026', url: 'https://www.lionsclubs.org/pt/discover-our-clubs/presidential-theme', autoRefresh: true },
    { id: 'lci-mission-1-5', scope: 'global', title: 'MISSION 1.5 / Abordagem Global do Quadro Associativo', url: 'https://www.lionsclubs.org/en/resources-for-members/resource-center/global-membership-approach', autoRefresh: true },
    { id: 'lcif-annual-report-pt', scope: 'lcif', title: 'Relatorio Anual LCIF 2024-2025', url: 'https://www.lionsclubs.org/pt/explore-our-foundation/annual-report', autoRefresh: true },
    { id: 'lcif-foundation-about-pt', scope: 'lcif', title: 'Conheca nossa Fundacao', url: 'https://www.lionsclubs.org/pt/about-us/our-foundation/about-our-foundation', autoRefresh: true },
    { id: 'lcif-history', scope: 'lcif', title: 'LCIF History', url: 'https://www.lionsclubs.org/en/discover-our-foundation/history', autoRefresh: true },
    { id: 'lcif-disaster-relief', scope: 'lcif', title: 'Socorro as Vitimas de Catastrofes', url: 'https://www.lionsclubs.org/pt/give-our-focus-areas/disaster-relief', autoRefresh: true },
    { id: 'lcif-sightfirst', scope: 'lcif', title: 'SightFirst', url: 'https://www.lionsclubs.org/en/give-our-focus-areas/vision/sightfirst', autoRefresh: true },
    { id: 'lion-magazine-pt', scope: 'revista', title: 'Revista LION', url: 'https://www.lionsclubs.org/pt/footer/lion-magazine', autoRefresh: true },
    { id: 'lion-magazine-en', scope: 'revista', title: 'LION Magazine', url: 'https://www.lionsclubs.org/en/footer/lion-magazine', autoRefresh: true },
    { id: 'lions-brasil-index', scope: 'brasil', title: 'Lions Internacional no Brasil', url: 'https://www.lions.org.br/index.html', autoRefresh: true },
    { id: 'dmla-site', scope: 'dmla', title: 'Distrito Multiplo LA', url: 'https://www.lions.org.br/dmla.html', autoRefresh: true },
    { id: 'la4-lions-brasil', scope: 'dla4', title: 'Distrito LA-4 Ceara', url: 'https://www.lions.org.br/distritos/la4/index.htm', autoRefresh: true }
  ],
  global: {
    impactPeriod: 'Julho de 2024 a junho de 2025',
    missionPillars: ['Melhorar a saude e o bem-estar', 'Fortalecer as comunidades', 'Apoiar os necessitados'],
    membership: {
      program: 'MISSION 1.5',
      internationalPresident: 'A.P. Singh',
      presidentialYear: '2025/2026',
      officialGoal: 1500000,
      goalDate: '2027-07-01',
      message: 'Continuar crescendo',
      receivedBulletin: {
        title: 'Quadro associativo Lions International',
        receivedAt: '2026-05-08',
        sourceType: 'Peca institucional recebida em grupo/comunicacao leonistica',
        verificationStatus: 'coerente com fontes oficiais; numeros pontuais em verificacao documental direta',
        totalMembers: 1400947,
        newClubsThisYear: 2546,
        newMembersThisYear: 216332
      }
    },
    impact: {
      projectsCompleted: 1500000,
      peopleServed: 410000000,
      lcifGrantsSince1968: 24000,
      lcifGrantsAwarded2024_2025: 1809,
      lcifGrantTotalUSD2024_2025: 44500000,
      lcifFundsRaisedUSD2024_2025: 83000000,
      lcifDisasterReliefSupportUSD: 173000000,
      lionsQuestStudents: 20000000,
      cataractSurgeries: 9800000
    },
    causes: [
      { name: 'Cancer Infantil', peopleServed: 8000000 },
      { name: 'Diabetes', peopleServed: 14000000 },
      { name: 'Socorro apos catastrofes', peopleServed: 6000000 },
      { name: 'Meio ambiente', peopleServed: 63000000 },
      { name: 'Esforcos Humanitarios', peopleServed: 113000000 },
      { name: 'Fome', peopleServed: 58000000 },
      { name: 'Visao', peopleServed: 22000000 },
      { name: 'Juventude', peopleServed: 21000000 }
    ]
  },
  lcif: {
    name: 'Lions Clubs International Foundation',
    acronym: 'LCIF',
    foundedAt: 1968,
    mission: 'Capacitar Lions clubes, voluntarios e parceiros para melhorar a saude e o bem-estar, fortalecer comunidades e apoiar necessitados por meio de servico humanitario e subsidios.',
    firstGrant: { year: 1972, amountUSD: 5000, purpose: 'Enchentes em Dakota do Sul, EUA' },
    impact: {
      grantsSince1968: 24000,
      disasterReliefSupportUSD: 173000000,
      lionsQuestStudents: 20000000,
      cataractSurgeries: 9800000,
      annualReport2024_2025: {
        fundsRaisedUSD: 83000000,
        grantsAwarded: 1809,
        grantsTotalUSD: 44500000,
        jurisdictionAreaIIIGrantUSD: 4676087
      },
      sightFirst: {
        impactedLives: 544000000,
        approvedUSD: 389000000,
        projects: 1461,
        countries: 118,
        cataractSurgeries: 9900000,
        eyeCentersEquipped: 1719,
        eyeCareWorkersTrained: 2660000
      }
    },
    magazineSections: ['LCIF em numeros', 'Causa global do mes', 'Historias de servico', 'Subsidios e oportunidades', 'Como isso inspira Juazeiro do Norte']
  },
  brazil: {
    multipleDistricts: [
      { code: 'LA', region: 'Norte/Nordeste' },
      { code: 'LB', region: 'Centro/Oeste' },
      { code: 'LC', region: 'Leste/Sudeste' },
      { code: 'LD', region: 'Sul' }
    ]
  },
  dmla: {
    name: 'Distrito Multiplo LA',
    region: 'Norte e Nordeste do Brasil',
    districts: ['LA-1 AM/AC/RO/RR', 'LA-2 BA', 'LA-3 PE/SE/AL', 'LA-4 CE', 'LA-5 PB/RN', 'LA-6 PA/AP/MA/PI']
  },
  dla4: {
    name: 'Distrito LA-4',
    state: 'Ceara',
    cycle: 'AL 2025/2026',
    mottoFromLogo: 'Com Deus e trabalho servimos com amor',
    editorialUse: 'Secao fixa com governadoria, divisoes, campanhas distritais, calendario, visitas oficiais e acoes integradas no Ceara.'
  },
  localClub: {
    name: 'Lions Clube de Juazeiro do Norte',
    district: 'LA-4',
    division: 'Divisao 12',
    region: 'Cariri - Ceara',
    editorialUse: 'Secao fixa mensal com atividades locais, fotos, relatorios, voluntarios, parceiros, metas, impactos e agenda.'
  },
  monthlyAutomation: {
    mode: 'hibrido',
    automaticSources: ['Lions International', 'LCIF', 'LION Magazine', 'Lions Brasil', 'DMLA', 'Distrito LA-4'],
    manualSources: ['Campanhas locais', 'Fotos locais', 'Pessoas atendidas localmente', 'Parceiros locais', 'Atas e validacoes da diretoria'],
    monthlyCycle: ['coletar fontes oficiais', 'classificar por escopo', 'alimentar blocos do site', 'montar revista mensal', 'validar conteudo local', 'exportar PDF']
  },
  monthlyMagazine: {
    currentIssueId: 'al-2025-2026-001',
    series: 'Revista Mensal AL 2025/2026',
    issues: [
      {
        id: 'al-2025-2026-001',
        number: 1,
        title: 'Revista Mensal AL 2025/2026 numero 1',
        month: 'Maio de 2026',
        status: 'modelo inicial',
        coverLine: 'Nos servimos Juazeiro, o Cariri e o mundo'
      }
    ]
  }
};

export default revistaDb;

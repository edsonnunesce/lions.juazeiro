const revistaDb = {
  updatedAt: '2026-05-06',
  project: 'Lions Clube Juazeiro do Norte - Revista Virtual',
  editorialPolicy: {
    purpose: 'Base inicial para revista virtual mensal do Lions Clube Juazeiro do Norte.',
    rules: [
      'Separar dados oficiais, dados publicos e conteudo local validado.',
      'Toda edicao deve conter fontes e data de coleta.',
      'A revista deve ser exibida na pagina e exportavel em PDF via impressao do navegador.'
    ]
  },
  sources: [
    { id: 'lci-impact-pt', scope: 'global', title: 'O nosso impacto global', url: 'https://www.lionsclubs.org/pt/our-impact/our-service/our-global-impact' },
    { id: 'lci-service-reporting-pt', scope: 'global', title: 'Relatorios de Servicos', url: 'https://www.lionsclubs.org/pt/member-resource-center/service/resources/service-journey/service-reporting' },
    { id: 'lcif-annual-report-pt', scope: 'global', title: 'Relatorio Anual LCIF 2024-2025', url: 'https://www.lionsclubs.org/pt/explore-our-foundation/annual-report' },
    { id: 'lcif-foundation-about', scope: 'global', title: 'About Our Foundation', url: 'https://www.lionsclubs.org/en/about-us/our-foundation/about-our-foundation' },
    { id: 'lion-magazine-pt', scope: 'revista', title: 'Revista LION', url: 'https://www.lionsclubs.org/pt/footer/lion-magazine' },
    { id: 'lions-brasil-index', scope: 'brasil', title: 'Lions Internacional no Brasil', url: 'https://www.lions.org.br/index.html' },
    { id: 'dmla-site', scope: 'dmla', title: 'Distrito Multiplo LA', url: 'https://www.lions.org.br/dmla.html' },
    { id: 'la4-lions-brasil', scope: 'dla4', title: 'Distrito LA-4 Ceara', url: 'https://www.lions.org.br/distritos/la4/index.htm' }
  ],
  global: {
    impactPeriod: 'Julho de 2024 a junho de 2025',
    missionPillars: ['Melhorar a saude e o bem-estar', 'Fortalecer as comunidades', 'Apoiar os necessitados'],
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

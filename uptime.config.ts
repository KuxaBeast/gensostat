import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "Gensokyo Radio Status",
  links: [
    { link: 'https://gensokyoradio.net', label: 'Gensokyo Radio' },
  ],
  // Nuke the default UptimeFlare footer branding
  customFooter: '',
  // Group monitors into logical sections on the status page
  group: {
    'Website': ['gensokyo_web'],
    'Stream': ['gensokyo_stream_eu', 'gensokyo_stream_na', 'gensokyo_stream_apac'],
  },
}

const workerConfig: WorkerConfig = {
  kvWriteCooldownMinutes: 3,
  monitors: [
    // Main website — single location is fine
    {
      id: 'gensokyo_web',
      name: 'Gensokyo Radio (Website)',
      method: 'GET',
      target: 'https://gensokyoradio.net',
      tooltip: 'Main website checked from Western Europe',
      statusPageLink: 'https://gensokyoradio.net',
      expectedCodes: [200],
      timeout: 10000,
      checkProxy: 'worker://weur',
      checkProxyFallback: true,
    },
    // Stream — checked from Western Europe
    {
      id: 'gensokyo_stream_eu',
      name: 'Stream (Europe)',
      method: 'GET',
      target: 'https://stream.gensokyoradio.net/',
      tooltip: 'Stream endpoint checked from Eastern Europe',
      statusPageLink: 'https://stream.gensokyoradio.net/',
      timeout: 15000,
      responseKeyword: 'Current region: Europe',
      checkProxy: 'worker://eeur',
      checkProxyFallback: true,
    },
    // Stream — checked from Eastern North America
    {
      id: 'gensokyo_stream_na',
      name: 'Stream (North America)',
      method: 'GET',
      target: 'https://stream.gensokyoradio.net/',
      tooltip: 'Stream endpoint checked from Eastern North America',
      statusPageLink: 'https://stream.gensokyoradio.net/',
      timeout: 15000,
      responseKeyword: 'Current region: Americas',
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
    },
    // Stream — checked from Asia-Pacific (Singapore)
    {
      id: 'gensokyo_stream_apac',
      name: 'Stream (Asia/Oceania)',
      method: 'GET',
      target: 'https://stream.gensokyoradio.net/',
      tooltip: 'Stream endpoint checked from Asia-Pacific',
      statusPageLink: 'https://stream.gensokyoradio.net/',
      timeout: 15000,
      responseKeyword: 'Current region: Asia/Oceania',
      checkProxy: 'worker://apac',
      checkProxyFallback: true,
    },
  ],
  notification: {
    // Uncomment and configure if you want alerts
    // webhook: {
    //   url: 'https://api.telegram.org/bot<TOKEN>/sendMessage',
    //   payloadType: 'json',
    //   payload: {
    //     chat_id: 123456789,
    //     text: '$MSG',
    //   },
    // },
    timeZone: 'Europe/Prague',
    gracePeriod: 5,
  },
}

const maintenances: MaintenanceConfig[] = []

export { maintenances, pageConfig, workerConfig }

export interface MicroAppConfig {
  name: string;
  url: string;
}

export const MICRO_APPS: MicroAppConfig[] = [
  {
    name: 'micro-app-react',
    url: 'http://localhost:10000/',
  },
];

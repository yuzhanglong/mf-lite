export interface MicroAppConfig {
  name: string;
  url: string;
}

export const MICRO_APPS: MicroAppConfig[] = [
  {
    name: 'micro-app',
    url: 'http://localhost:10000/',
  },
];

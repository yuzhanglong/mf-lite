export interface MicroAppConfig {
  name: string;
  url: string;
}

export const MICRO_APPS: MicroAppConfig[] = [
  {
    name: 'micro-app-one',
    url: 'http://localhost:10000/',
  },
  {
    name: 'micro-app-two',
    url: 'http://localhost:10001/',
  },
];

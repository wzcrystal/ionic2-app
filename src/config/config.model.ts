
export interface Config {
  debug: boolean;
  pageSize: string;
  appEnvironment: string;
  api: string;
  client_id: string,
  client_secret: string,
  loginPath: string,
  interfacePath: string,
  version: {
    currentVersion: string,
    currentversionName: string,
    currentSubVersion: string,
    currentSubVersionName: string
  }
}

import {Config} from './config.model';

export const ENV: Config = {
  debug: true,
  pageSize: '10',
  appEnvironment: 'development',
  client_id: "d6c53d59-bc16-c0ef-810e-a67a46b54840",
  client_secret: "fb89fed1-ef47-ce5a-3e83-4c427e941609",
  loginPath: "http://47.100.161.163/hmap-back/oauth/token",
  api: 'http://47.100.161.163/hmap-back',
  interfacePath: "http://47.100.161.163/hmap-back/api/hcsVote/",
  version: {
    currentVersion: "0.0.1",
    currentversionName: "此版本为开发版本0.0.1",
    currentSubVersion: "1",
    currentSubVersionName: "资源增量包1"
  }
}

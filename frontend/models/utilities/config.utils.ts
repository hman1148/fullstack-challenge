export type Config = {
  apiUrl: string;
  appName: string;
  version: string;
};

export const devConfig: Config = {
  apiUrl: "http://localhost:3000/api",
  appName: "MyApp",
  version: "1.0.0",
};

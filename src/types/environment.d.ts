export { AppConfiguration };

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Record<keyof AppConfiguration, string> {
      NODE_ENV: "production" | "development";
    }
  }
}

interface AppConfiguration {
  ROOT_DIR: string;
  PORT: number;
}

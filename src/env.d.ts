declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Vite injects development on 'yarn dev' and production on 'yarn build && yarn preview'.
       * 'development' | 'production'
       */
      NODE_ENV: string;

      // https://example.com/api
      API_URL: string;

      // 'true' | 'false'
      MAINTENANCE_MODE: string;
    }
  }
}

export {};

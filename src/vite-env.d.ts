/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GH_REPO_API_URL: string;
  readonly VITE_THROTTLE_LIMIT_SECONDS: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

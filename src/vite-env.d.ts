/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALLOWED_HOSTS: string;
  // add more env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
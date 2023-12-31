/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_APP_TITLE: string,
  VITE_APP_BASE_URL: string,
}


interface ImportMeta {
  readonly env: ImportMetaEnv
}
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MONGODB_USERNAME: string
    readonly VITE_MONGODB_PASSWORD: string
    readonly VITE_MONGODB_CLUSTER_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
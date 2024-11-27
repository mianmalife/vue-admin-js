/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/stores/multiTabs' {
  export const useMultiTabsStore: () => any
}

declare module '@/stores/topmenu' {
  export const useActiveStore: () => {
    allRoutes: any[],
    setKey: (s: any) => void
  }
}

declare module '@/stores/sidemenu' {
  export const useSideMenuStore: () => any
}

declare module '@/stores/themeColor' {
  export const useThemeColor: () => {
    color: string,
    setThemeColor: (val: string) => void
  }
}
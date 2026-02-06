import '@tanstack/react-router'

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    hideHeader?: boolean
    hideFooter?: boolean
  }
}

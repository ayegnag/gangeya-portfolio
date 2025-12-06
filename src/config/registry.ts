export const registryConfig = {
  /**
   * Registry namespace identifier for shadcn CLI
   * @see https://ui.shadcn.com/docs/registry/namespace#overview
   */
  namespace: process.env.REGISTRY_NAMESPACE,
  /**
   * URL pattern for resolving namespaced components
   * The {name} placeholder will be replaced with the component name
   * This tells shadcn CLI where to fetch component definitions when installing with namespace prefix
   * @see https://ui.shadcn.com/docs/registry/namespace#url-pattern-system
   */
  namespaceUrl:
    process.env.REGISTRY_NAMESPACE_URL,
};

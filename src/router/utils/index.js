/**
 * @param  {object} options
 * @param  {Array} routes
 * @return {Array}
 */
export default function mapRoutes(options, routes) {
  return routes.map(route => ({ ...route, meta: { ...route.meta, ...options } }));
}

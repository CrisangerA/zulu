const API_ROUTES = {
  root: process.env.API_ROUTE,
  products: {
    all: '/products',
    detail: (id: string) => `/products/${id}`,
  }
}
export default API_ROUTES;

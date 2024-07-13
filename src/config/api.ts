const endpoint = import.meta.env.MODE === 'production' ? "" : "http://localhost:3333"

export const api = {
  endpoint
}
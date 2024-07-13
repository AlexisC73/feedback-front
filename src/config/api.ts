const endpoint = import.meta.env.MODE === 'production' ? "/api" : "http://localhost:3333/api"

export const api = {
  endpoint
}
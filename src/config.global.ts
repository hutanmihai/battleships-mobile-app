export const BACKEND_URL = 'https://malamute-enabled-yak.ngrok-free.app'

export const apiConfig = {
  auth: {
    login: `${BACKEND_URL}/auth/login`,
    register: `${BACKEND_URL}/auth/register`,
  },
  user: {
    me: `${BACKEND_URL}/user/details/me`,
  },
  game: {
    list: `${BACKEND_URL}/game`,
    create: `${BACKEND_URL}/game`,
    get: (id: number) => `${BACKEND_URL}/game/${id}`,
    join: (id: number) => `${BACKEND_URL}/game/join/${id}`,
    strike: (id: number) => `${BACKEND_URL}/game/${id}/strike`,
    sendMap: (id: number) => `${BACKEND_URL}/game/${id}`,
  },
}

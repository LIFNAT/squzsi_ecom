// Use env var when available, otherwise default to localhost backend
export const post = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';
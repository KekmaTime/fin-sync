interface Env {
  apiKey: string
}

export const env: Env = {
  apiKey: import.meta.env.VITE_API_KEY
}

const requiredEnvVars: (keyof Env)[] = ['apiKey']

requiredEnvVars.forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}) 
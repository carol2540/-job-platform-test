import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_URL: z.string().url().default('http://localhost:3000'),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url().default('http://localhost:3000'),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  DATABASE_URL: z.string().optional(),
})

type Env = z.infer<typeof envSchema>

let _env: Env | null = null

export const getEnv = (): Env => {
  if (!_env) {
    try {
      _env = envSchema.parse(process.env)
    } catch (err) {
      if (err instanceof z.ZodError) {
        const missing = err.issues.map((i) => i.path.join('.')).join(', ')
        throw new Error(`Missing/invalid env vars: ${missing}`)
      }
      throw err
    }
  }
  return _env
}

const __env = (() => {
  try {
    return envSchema.parse(process.env)
  } catch {
    // Return defaults for build time — runtime will validate
    return {
      NEXT_PUBLIC_SUPABASE_URL: '',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: '',
      NEXT_PUBLIC_URL: 'http://localhost:3000',
      NEXTAUTH_SECRET: 'placeholder',
      NEXTAUTH_URL: 'http://localhost:3000',
      DATABASE_URL: '',
    } as Env
  }
})()

export const env = {
  supabase: {
    url: __env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: __env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  nextAuth: {
    secret: __env.NEXTAUTH_SECRET,
    url: __env.NEXTAUTH_URL,
    googleClientId: __env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: __env.GOOGLE_CLIENT_SECRET || '',
  },
  app: {
    url: __env.NEXT_PUBLIC_URL,
  },
}

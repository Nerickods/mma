import Link from 'next/link'
import { LoginForm } from '@/features/auth/components'

export default function LoginPage() {
    return (
        <div className="space-y-8 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
                <p className="mt-2 text-white/60">Inicia sesión en tu cuenta</p>
            </div>

            <LoginForm />

            <p className="text-center text-sm text-white/60">
                ¿No tienes cuenta?{' '}
                <Link href="/signup" className="text-amber-400 hover:text-amber-300 hover:underline">
                    Crear cuenta
                </Link>
            </p>
        </div>
    )
}

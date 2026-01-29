import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

// Test login endpoint - POST email and password to test auth
export async function POST(request: NextRequest) {
    const { email, password } = await request.json()

    const supabase = await createClient()

    // Try to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return NextResponse.json({
            status: 'login_failed',
            error: error.message,
            code: error.code,
            fixes: {
                'Invalid login credentials': 'El email o contraseña son incorrectos. ¿Creaste la cuenta correctamente?',
                'Email not confirmed': 'El email no está confirmado. Ejecuta: UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = \'' + email + '\';',
                'User not found': 'El usuario no existe. Registrate primero en /signup',
            }
        }, { status: 401 })
    }

    return NextResponse.json({
        status: 'ok',
        message: 'Login exitoso',
        user: {
            id: data.user?.id,
            email: data.user?.email,
            email_confirmed_at: data.user?.email_confirmed_at,
        },
        session: {
            access_token_prefix: data.session?.access_token?.substring(0, 20) + '...',
            expires_at: data.session?.expires_at,
        },
        nextStep: 'Ahora ve a /api/debug-auth para verificar que la sesión persiste'
    })
}

export async function GET() {
    return NextResponse.json({
        usage: 'POST con { "email": "tu@email.com", "password": "tu-password" }',
        example: 'curl -X POST http://localhost:3000/api/test-login -H "Content-Type: application/json" -d \'{"email":"nerickods@gmail.com","password":"testing"}\''
    })
}

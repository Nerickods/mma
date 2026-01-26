import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

// Create user endpoint for testing - creates user with email confirmation bypassed
export async function POST(request: NextRequest) {
    const { email, password } = await request.json()

    const supabase = await createClient()

    // Try to sign up
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // Skip email confirmation for local development
            emailRedirectTo: undefined,
        }
    })

    if (error) {
        return NextResponse.json({
            status: 'signup_failed',
            error: error.message,
            code: error.code,
        }, { status: 400 })
    }

    if (!data.user) {
        return NextResponse.json({
            status: 'no_user',
            message: 'No se creó el usuario',
        }, { status: 400 })
    }

    return NextResponse.json({
        status: 'ok',
        message: 'Usuario creado exitosamente',
        user: {
            id: data.user.id,
            email: data.user.email,
            email_confirmed_at: data.user.email_confirmed_at,
        },
        nextSteps: [
            'Si email_confirmed_at es null, ejecuta en Supabase SQL Editor:',
            'UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = \'' + email + '\';',
            '',
            'Para hacerlo admin, ejecuta:',
            'UPDATE profiles SET role = \'admin\' WHERE email = \'' + email + '\';',
            '',
            'Si los profiles no se crearon automáticamente:',
            'INSERT INTO profiles (id, email, role) VALUES (\'' + data.user.id + '\', \'' + email + '\', \'admin\');',
            '',
            'Después prueba login en /api/test-login'
        ]
    })
}

export async function GET() {
    return NextResponse.json({
        usage: 'POST con { "email": "tu@email.com", "password": "tu-password" }',
        example: 'curl -X POST http://localhost:3000/api/create-user -H "Content-Type: application/json" -d \'{"email":"nerickods@gmail.com","password":"testing"}\''
    })
}

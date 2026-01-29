import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

// Debug endpoint to check auth status and profiles
export async function GET() {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) {
        return NextResponse.json({
            status: 'error',
            step: 'getUser',
            error: userError.message,
            fix: 'No hay sesión activa. Ve a /login primero.'
        })
    }

    if (!user) {
        return NextResponse.json({
            status: 'not_authenticated',
            fix: 'Por favor inicia sesión en /login'
        })
    }

    // Check if profile exists
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (profileError) {
        return NextResponse.json({
            status: 'profile_error',
            user: {
                id: user.id,
                email: user.email,
                email_confirmed_at: user.email_confirmed_at,
            },
            error: profileError.message,
            fix: profileError.code === 'PGRST116'
                ? 'El perfil no existe. Ejecuta: INSERT INTO profiles (id, email, role) VALUES (\'' + user.id + '\', \'' + user.email + '\', \'admin\');'
                : 'Error de RLS o tabla. Verifica que la tabla profiles existe y tiene RLS configurado correctamente.'
        })
    }

    return NextResponse.json({
        status: 'ok',
        user: {
            id: user.id,
            email: user.email,
            email_confirmed_at: user.email_confirmed_at,
        },
        profile: profile,
        isAdmin: profile?.role === 'admin',
        canAccessAdmin: profile?.role === 'admin',
        nextStep: profile?.role === 'admin'
            ? '¡Listo! Puedes acceder a /admin'
            : 'Ejecuta: UPDATE profiles SET role = \'admin\' WHERE id = \'' + user.id + '\';'
    })
}

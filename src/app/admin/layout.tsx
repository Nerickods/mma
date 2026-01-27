import { redirect } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/server'
import Link from 'next/link'
import { signout } from '@/actions/auth'

async function getAdminUser() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('role, email, full_name')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') return null

    return { ...user, ...profile }
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getAdminUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-neutral-950">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-neutral-900/50 border-r border-white/10 backdrop-blur-xl">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                    <p className="text-xs text-white/50 mt-1">{user.email}</p>
                </div>

                <nav className="px-4 space-y-1">
                    <NavLink href="/admin" icon="home">
                        Dashboard
                    </NavLink>
                    <NavLink href="/admin/plans" icon="list">
                        Planes
                    </NavLink>
                    <NavLink href="/admin/promotions" icon="tag">
                        Promociones
                    </NavLink>
                    <NavLink href="/admin/conversations" icon="chat">
                        Conversaciones
                    </NavLink>
                    <NavLink href="/admin/analytics" icon="chart">
                        Analíticas
                    </NavLink>
                    <NavLink href="/admin/settings" icon="settings">
                        Configuración
                    </NavLink>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver a la landing
                    </Link>
                    <form action={signout}>
                        <button
                            type="submit"
                            className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-sm transition-colors w-full"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Cerrar Sesión
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main content */}
            <main className="ml-64 min-h-screen">
                {children}
            </main>
        </div>
    )
}

function NavLink({
    href,
    icon,
    children,
}: {
    href: string
    icon: 'home' | 'chat' | 'chart' | 'settings' | 'list' | 'tag'
    children: React.ReactNode
}) {
    const icons = {
        home: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        ),
        chat: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        ),
        chart: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        ),
        settings: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        ),
        list: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        ),
        tag: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        ),
    }

    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icons[icon]}
            </svg>
            {children}
        </Link>
    )
}

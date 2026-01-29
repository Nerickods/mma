import { redirect } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/server'
import { AdminSidebar } from './components/AdminSidebar'

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
        <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden selection:bg-amber-400/30 dark:selection:bg-red-500/30 transition-colors duration-300">
            {/* Base Aurora Background - Dark (New Branding: Red/Amber dominant with deep accents) */}
            <div className="fixed inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/20 rounded-full blur-[128px] animate-float-bg" />
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-amber-900/20 rounded-full blur-[128px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-red-950/30 rounded-full blur-[128px] animate-float-bg" style={{ animationDelay: '2s' }} />
            </div>

            {/* Base Aurora Background - Light (New Branding: Amber/Red soft) */}
            <div className="fixed inset-0 z-0 opacity-100 dark:opacity-0 transition-opacity duration-500">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-200/20 rounded-full blur-[128px] animate-float-bg" />
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-red-200/20 rounded-full blur-[128px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-orange-100/30 rounded-full blur-[128px] animate-float-bg" style={{ animationDelay: '2s' }} />
            </div>

            {/* Sidebar */}
            <AdminSidebar user={user} />

            {/* Main content Area */}
            <main className="pl-80 pr-4 py-4 min-h-screen relative z-10">
                <div className="min-h-[calc(100vh-2rem)] bg-white/50 dark:bg-black/40 backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/5 overflow-hidden shadow-2xl transition-all duration-300">
                    {children}
                </div>
            </main>
        </div>
    )
}

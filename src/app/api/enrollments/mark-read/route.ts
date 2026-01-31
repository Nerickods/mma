import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

export async function POST() {
    const supabase = await createClient()

    try {
        const { data, error, count } = await supabase
            .from('enrollments')
            .update({ status: 'reviewed' })
            .eq('status', 'new')
            .select('*', { count: 'exact' })

        if (error) throw error

        return NextResponse.json({
            success: true,
            message: 'All new enrollments marked as reviewed',
            count
        })
    } catch (error: any) {
        console.error('Error marking enrollments as read:', error)
        return NextResponse.json(
            { error: 'Failed to update enrollments' },
            { status: 500 }
        )
    }
}

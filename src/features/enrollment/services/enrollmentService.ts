import { supabase } from '@/shared/lib/supabase';
import { EnrollmentData, EnrollmentResponse } from '../types';

export const enrollmentService = {
    /**
     * Generic enrollment submission (Forms, etc)
     */
    async submitEnrollment(data: EnrollmentData): Promise<EnrollmentResponse> {
        console.log('📝 Processing Enrollment:', data);

        const results = await Promise.allSettled([
            // 1. Primary: Enrollments
            supabase.from('enrollments').insert([{
                name: data.name,
                email: data.email,
                preferred_schedule: data.visit_date,
                source: data.source || 'default',
                status: 'pending',
            }]),

            // 2. Secondary: Leads (Backup)
            supabase.from('leads').insert([{
                name: data.name,
                email: data.email,
                visit_date: data.visit_date,
                source: data.source || 'default',
                status: 'new'
            }])
        ]);

        const enrollmentResult = results[0];
        if (enrollmentResult.status === 'rejected' || enrollmentResult.value.error) {
            return {
                success: false,
                error: enrollmentResult.status === 'rejected' ? enrollmentResult.reason : enrollmentResult.value.error?.message
            };
        }

        return { success: true };
    },

    /**
     * Checks if an email is already registered in enrollments or leads.
     */
    async isEmailRegistered(email: string): Promise<{ exists: boolean }> {
        // Check both tables in parallel
        const [enrollmentCheck, leadCheck] = await Promise.all([
            supabase.from('enrollments').select('id', { count: 'exact', head: true }).eq('email', email),
            supabase.from('leads').select('id', { count: 'exact', head: true }).eq('email', email)
        ]);

        const totalCount = (enrollmentCheck.count || 0) + (leadCheck.count || 0);

        return { exists: totalCount > 0 };
    },

    /**
     * Registers a user specifically from the Chatbot.
     */
    async registerFromChat(data: { name: string; email: string; visit_date: string; }) {
        return this.submitEnrollment({
            ...data,
            source: 'chat_ai'
        });
    }
};


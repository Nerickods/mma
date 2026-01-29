import { createClient } from '@/shared/lib/supabase/client';
import { EnrollmentData } from '../types';

export const enrollmentService = {
    async submitEnrollment(data: EnrollmentData) {
        const supabase = createClient();

        try {
            const { error } = await supabase
                .from('enrollments')
                .insert([{
                    name: data.name,
                    email: data.email,
                    preferred_schedule: data.visit_date,
                    source: data.source || 'web_form',
                    status: 'new'
                }]);

            if (error) throw error;

            return { success: true };
        } catch (error: any) {
            console.error('Error submitting enrollment:', error);
            return { success: false, error: error.message };
        }
    }
};

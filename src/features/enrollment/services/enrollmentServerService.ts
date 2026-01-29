import { createClient } from '@/shared/lib/supabase/server';

export interface EnrollmentData {
    name: string;
    email: string;
    visit_date?: string;
    conversation_id?: string;
}

export interface SavedEnrollment extends EnrollmentData {
    id: string;
    status: string;
    source: string;
    created_at: string;
}

export const enrollmentService = {
    /**
     * Save a new enrollment captured via chat
     * @param data Enrollment information from the AI assistant
     * @returns The saved enrollment record
     */
    async registerFromChat(data: EnrollmentData): Promise<SavedEnrollment> {
        const supabase = await createClient();

        const { data: enrollment, error } = await supabase
            .from('enrollments')
            .insert([{
                name: data.name,
                email: data.email,
                preferred_schedule: data.visit_date || null,
                metadata: { conversation_id: data.conversation_id },
                source: 'chat_agent',
                status: 'new'
            }])
            .select()
            .single();

        if (error) {
            console.error('❌ Error saving enrollment:', error);
            throw error;
        }

        console.log('✅ Enrollment saved successfully');
        return enrollment as SavedEnrollment;
    },

    /**
     * Check if email already exists as enrollment
     */
    async isEmailRegistered(email: string): Promise<boolean> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('enrollments')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (error) {
            console.error('Error checking existing enrollment:', error);
            return false;
        }

        return !!data;
    }
};
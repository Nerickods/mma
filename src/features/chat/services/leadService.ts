import { supabase } from '@/shared/lib/supabase';

export interface LeadData {
    name: string;
    email: string;
    visit_date?: string;
    conversation_id?: string;
}

export interface SavedLead extends LeadData {
    id: string;
    status: string;
    source: string;
    created_at: string;
}

export const leadService = {
    /**
     * Save a new lead captured via chat
     * @param data Lead information from the AI assistant
     * @returns The saved lead record
     */
    async saveLead(data: LeadData): Promise<SavedLead> {
        const { data: lead, error } = await supabase
            .from('leads')
            .insert([{
                name: data.name,
                email: data.email,
                visit_date: data.visit_date || null,
                conversation_id: data.conversation_id || null,
                source: 'chat_widget',
                status: 'new'
            }]);
        // .select() removed to avoid RLS read violation for anon role


        if (error) {
            console.error('❌ Error saving lead:', error);
            throw error;
        }

        console.log('✅ Lead saved successfully (Blind Insert)');
        // Return a mock object or minimal data since we can't read back the ID without RLS SELECT permissions
        return {
            id: 'generated-server-side',
            name: data.name,
            email: data.email,
            status: 'new',
            source: 'chat_widget',
            created_at: new Date().toISOString()
        } as SavedLead;
    },

    /**
     * Check if email already exists as lead
     */
    async checkExistingLead(email: string): Promise<boolean> {
        const { data, error } = await supabase
            .from('leads')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (error) {
            console.error('Error checking existing lead:', error);
            return false;
        }

        return !!data;
    }
};

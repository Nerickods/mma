
import { createClient } from '@/shared/lib/supabase/client';
import { Plan, Promotion } from '../types/plan';

// --- Helpers for Mapping ---

function mapPlanFromDB(dbPlan: any): Plan {
    return {
        id: dbPlan.id,
        key: dbPlan.key,
        name: dbPlan.name,
        price: dbPlan.price,
        period: dbPlan.period,
        description: dbPlan.description,
        features: dbPlan.features || [],
        isPopular: dbPlan.is_popular,
        savings: dbPlan.savings,
        highlight: dbPlan.highlight,
        displayOrder: dbPlan.display_order,
        isActive: dbPlan.is_active,
        backgroundImage: dbPlan.background_image
    };
}

function mapPlanToDB(plan: Partial<Plan>) {
    const dbPlan: any = { ...plan };

    // Map camelCase to snake_case
    if (plan.isPopular !== undefined) dbPlan.is_popular = plan.isPopular;
    if (plan.displayOrder !== undefined) dbPlan.display_order = plan.displayOrder;
    if (plan.isActive !== undefined) dbPlan.is_active = plan.isActive;
    if (plan.backgroundImage !== undefined) dbPlan.background_image = plan.backgroundImage;

    // Remove camelCase keys
    delete dbPlan.isPopular;
    delete dbPlan.displayOrder;
    delete dbPlan.isActive;
    delete dbPlan.backgroundImage;

    return dbPlan;
}

function mapPromoFromDB(dbPromo: any): Promotion {
    return {
        id: dbPromo.id,
        title: dbPromo.title,
        description: dbPromo.description,
        discount: dbPromo.discount,
        features: dbPromo.features || [],
        gradient: dbPromo.gradient,
        backgroundImage: dbPromo.background_image,
        displayOrder: dbPromo.display_order,
        isActive: dbPromo.is_active,
        validUntil: dbPromo.valid_until
    };
}

function mapPromoToDB(promo: Partial<Promotion>) {
    const dbPromo: any = { ...promo };

    if (promo.backgroundImage !== undefined) dbPromo.background_image = promo.backgroundImage;
    if (promo.displayOrder !== undefined) dbPromo.display_order = promo.displayOrder;
    if (promo.isActive !== undefined) dbPromo.is_active = promo.isActive;
    if (promo.validUntil !== undefined) dbPromo.valid_until = promo.validUntil;

    delete dbPromo.backgroundImage;
    delete dbPromo.displayOrder;
    delete dbPromo.isActive;
    delete dbPromo.validUntil;

    return dbPromo;
}

export const plansService = {
    // --- PLANS ---
    async getPlans(): Promise<Plan[]> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('plans')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error fetching plans:', error);
            return [];
        }
        return (data || []).map(mapPlanFromDB);
    },

    async getAllPlansAdmin(): Promise<Plan[]> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('plans')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) throw error;
        return (data || []).map(mapPlanFromDB);
    },

    async createPlan(plan: Partial<Plan>) {
        const supabase = createClient();
        const dbPayload = mapPlanToDB(plan);
        const { data, error } = await supabase.from('plans').insert(dbPayload).select().single();
        if (error) throw error;
        return mapPlanFromDB(data);
    },

    async updatePlan(id: string, updates: Partial<Plan>) {
        const supabase = createClient();
        const dbPayload = mapPlanToDB(updates);
        const { data, error } = await supabase.from('plans').update(dbPayload).eq('id', id).select().single();
        if (error) throw error;
        return mapPlanFromDB(data);
    },

    async deletePlan(id: string) {
        const supabase = createClient();
        const { error } = await supabase.from('plans').delete().eq('id', id);
        if (error) throw error;
    },

    // --- PROMOTIONS ---
    async getPromotions(): Promise<Promotion[]> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('promotions')
            .select('*')
            .order('display_order', { ascending: true }); // Removed .eq('is_active', true) for generally better fetching, filter in frontend if needed or use separate method

        if (error) {
            console.error('Error fetching promotions:', error);
            return [];
        }
        return (data || []).map(mapPromoFromDB);
    },

    async updatePromotion(id: string, updates: Partial<Promotion>) {
        const supabase = createClient();
        const dbPayload = mapPromoToDB(updates);
        const { data, error } = await supabase.from('promotions').update(dbPayload).eq('id', id).select().single();
        if (error) throw error;
        return mapPromoFromDB(data);
    }
};


export interface PlanFeature {
    text: string;
    included: boolean;
}

export interface Plan {
    id: string;
    name: string;
    price: number;
    period: string; // 'semana' | 'mes' | 'semestre' | 'año' | 'visita'
    description: string;
    features: string[];
    isPopular?: boolean;
    savings?: string; // "Ahorra $1200"
    highlight?: boolean;
    backgroundImage?: string;
}

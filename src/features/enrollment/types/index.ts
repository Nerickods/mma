export interface EnrollmentData {
    name: string;
    email: string;
    visit_date: string;
    source?: string;
}

export interface EnrollmentResponse {
    success: boolean;
    data?: any;
    error?: string;
}

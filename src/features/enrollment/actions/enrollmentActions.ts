'use server';

import { enrollmentService, EnrollmentData } from '../services/enrollmentServerService';
import { revalidatePath } from 'next/cache';

export async function submitEnrollmentAction(data: EnrollmentData) {
    try {
        // Force source to be standard
        const cleanData = {
            ...data,
            source: 'landing_form'
        };

        const result = await enrollmentService.registerFromWeb(cleanData);

        revalidatePath('/admin/enrollments');
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Submit Enrollment Action Error:', error);
        return { success: false, error: error.message };
    }
}

export async function getNewEnrollmentsCountAction() {
    try {
        const enrollments = await enrollmentService.getAllEnrollments();
        const newCount = enrollments.filter(e => e.status === 'new').length;
        return newCount;
    } catch (error) {
        console.error('Error getting new enrollments count:', error);
        return 0;
    }
}

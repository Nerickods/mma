import LandingPageContent from "@/features/landing/components/LandingPageContent";
import { scheduleService } from "@/features/training/services/scheduleServerService";

export const dynamic = 'force-dynamic';

export default async function Home() {
    const schedule = await scheduleService.getAllClasses();

    return <LandingPageContent schedule={schedule} />;
}

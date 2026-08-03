import DriverPortalDashboard from '@/components/driver-portal/DriverPortalDashboard';

export default async function DriverPortalPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;
    return <DriverPortalDashboard token={token} />;
}

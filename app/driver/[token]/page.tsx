import DriverExpenseForm from '@/components/driver-portal/DriverExpenseForm';

export default async function DriverPortalPage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;
    return <DriverExpenseForm token={token} />;
}

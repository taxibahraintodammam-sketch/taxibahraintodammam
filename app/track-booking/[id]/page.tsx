import TrackBookingView from '@/components/track-booking/TrackBookingView';

export default async function TrackBookingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <TrackBookingView bookingId={id} />;
}

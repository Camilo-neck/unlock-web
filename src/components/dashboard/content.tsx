import EventInformation from "./eventInformation";
import EventStats from "./eventStats";
import EventAssistants from "./eventAssistants";
import getEvent from "@/services/queries/getEvent.service";
import getBookingsByEvent from "@/services/queries/getBookingsByEvent.service";
import BookingsProvider from "@/hooks/bookingsProvider";
import Greetings from "./greetings";

interface ContentProps {
    event: string
}

const Content = async ({
    event
}: ContentProps) => {
    const eventData = await getEvent(event as string);
	const bookings = await getBookingsByEvent(event as string);
    return (
        <div className="w-full mx-auto space-y-6 overflow-x-hidden">
            <BookingsProvider initialBookings={bookings}>
                <Greetings />
                <EventInformation
                    description={eventData.description}
                    name={eventData.name}
                    location={eventData.location}
                    start_time={eventData.start_time}
                    end_time={eventData.end_time}
                    capacity={eventData.capacity}
                />    
                {/* Stats section */}
                <EventStats />
                {/* Table section */}
                <EventAssistants eventId={eventData.id} />
            </BookingsProvider>
        </div>
    );
};

export default Content;

import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import Image from "next/image";
import BookEvents from "./BookEvents";
import EventCard from "./EventCard";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label.charAt(0).toUpperCase() + label.slice(1)}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <div key={tag} className="pill">
          {tag}
        </div>
      ))}
    </div>
  );
};

export async function EventDetails({ params }: { params: Promise<string> }) {
  "use cache";
  cacheLife("hours");

  const slug = await params;

  const request = await fetch(`${BASE_URL}/api/events/${slug}`);

  const {
    event: {
      _id,
      description,
      overview,
      date,
      image,
      time,
      location,
      mode,
      audience,
      agenda,
      organizer,
      tags,
    },
  } = await request.json();

  const bookings = 10;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  if (!description) return notFound();

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />

            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />

            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />

            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />

            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>

            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spots!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvents eventId={_id} slug={slug} />
          </div>
        </aside>
      </div>

      <div className="flex flex-col gap-4 pt-20 w-full">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard key={similarEvent.title} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
}

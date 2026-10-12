"use client";

import Image from "next/image";
import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

function InputWithIcon({
  id,
  name,
  placeholder,
  icon,
  iconAlt,
  type = "text",
  value,
  onChange,
}: {
  id: string;
  name: string;
  placeholder: string;
  icon: string;
  iconAlt: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative flex items-center">
      <Image
        src={icon}
        alt={iconAlt}
        width={20}
        height={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
      />
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12"
      />
    </div>
  );
}

export default function CreateEvents() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    mode: "",
    image: null as File | null,
    tags: "",
    description: "",
    overview: "",
    location: "",
    audience: "",
    organizer: "",
    agenda: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: fileInput.files?.[0] ?? null,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const payload = new FormData(e.currentTarget);

      payload.set("overview", formData.overview || formData.description);
      payload.set("audience", formData.audience || "Developers");
      payload.set(
        "tags",
        JSON.stringify(formData.tags.split(",").map((tag) => tag.trim())),
      );
      payload.set(
        "agenda",
        JSON.stringify(formData.agenda.split(",").map((item) => item.trim())),
      );

      const response = await fetch(`${BASE_URL}/api/events`, {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        return alert(result.error);
      }

      setSubmitted(true);
    } catch {
      console.error("Failed to create event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-card">
      {isLoading ? (
        <p className="text-sm text-center">Loading...</p>
      ) : submitted ? (
        <p className="text-sm text-center">Your event has been created!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Event Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label htmlFor="date">Event Date</label>

            <InputWithIcon
              id="date"
              name="date"
              icon="/icons/calendar_green.svg"
              iconAlt="calendar"
              placeholder="Enter event date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="time">Event Time</label>

            <InputWithIcon
              id="time"
              name="time"
              icon="/icons/clock_green.svg"
              iconAlt="clock"
              placeholder="Enter event time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="location">Event Location</label>

            <InputWithIcon
              id="location"
              name="location"
              icon="/icons/pin_green.svg"
              iconAlt="pin"
              placeholder="Enter event location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="event-type">Event Type</label>

            <div className="relative">
              <select
                id="event-type"
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="appearance-none"
              >
                <option value="">Select event type</option>
                <option value="online">Online</option>
                <option value="offline">Offline (In-person)</option>
                <option value="hybrid">Hybrid</option>
              </select>

              <Image
                src="/icons/chevron-down.svg"
                alt="chevron-down"
                width={20}
                height={20}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <div>
            <label htmlFor="event-image">Event Image / Banner</label>

            <label className="upload-image">
              <input
                id="event-image"
                name="image"
                type="file"
                accept="image/*"
                hidden
                onChange={handleChange}
              />
              <Image
                src="/icons/upload-cloud.svg"
                alt="upload"
                width={20}
                height={20}
              />

              {formData.image ? (
                <p>{formData.image.name}</p>
              ) : (
                <p>Upload event image or banner</p>
              )}
            </label>
          </div>

          <div>
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Add tags such as react, next, js"
            />
          </div>

          <div>
            <label htmlFor="agenda">Agenda</label>
            <textarea
              id="agenda"
              name="agenda"
              rows={5}
              value={formData.agenda}
              onChange={handleChange}
              placeholder="Briefly describe or outline the event agenda"
            />
          </div>

          <div>
            <label htmlFor="organizer">Organizer Details</label>
            <input
              id="organizer"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              placeholder="Enter organizer details"
            />
          </div>

          <div>
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe the event"
            />
          </div>

          <button type="submit" className="button-submit">
            Save Event
          </button>
        </form>
      )}
    </div>
  );
}

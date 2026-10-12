"use client";

import Image from "next/image";
import { posthogLogger } from "@/lib/posthogLogger";
import posthog from "posthog-js";

export default function ExploreBtn() {
  return (
    <button
      type="button"
      id="explore-btn"
      className="mx-auto mt-7"
      onClick={() => {
        posthog.capture("explore_events_clicked");
        posthogLogger.info("event catalogue exploration requested", {
          interaction: "explore_button",
        });
      }}
    >
      <a href="#events">
        Explore Events
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
}

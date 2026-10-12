export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  description: string;
  category: string;
  venue: string;
  organizer: string;
  tags: string[];
  agenda: string[];
};

export const events: EventItem[] = [
  {
    title: "React Summit",
    date: "2026-11-18",
    location: "Amsterdam, NL",
    image: "/images/event1.png",
    slug: "react-summit-2026",
    time: "09:00 AM",
    description:
      "A global gathering for React engineers, frontend architects, and design-system teams.",
    category: "Conference",
    venue: "RAI Amsterdam",
    organizer: "React Summit Team",
    tags: ["React", "Frontend", "JavaScript", "UX"],
    agenda: [
      "08:30 AM - 09:30 AM | Keynote: Building the Next Generation of React Apps",
      "09:45 AM - 11:00 AM | Deep Dives: Server Components, Performance, and DX",
      "11:15 AM - 12:30 PM | Product Demos & Design System Workshops",
      "12:30 PM - 01:30 PM | Lunch & Networking",
      "01:30 PM - 03:00 PM | Workshops: Scalable Frontend Architecture",
      "03:15 PM - 04:30 PM | Fireside Chat: The Future of UI Engineering",
    ],
  },
  {
    title: "JSConf EU",
    date: "2026-11-12",
    location: "Berlin, DE",
    image: "/images/event2.png",
    slug: "jsconf-eu-2026",
    time: "10:00 AM",
    description:
      "Community-driven JavaScript talks covering tooling, performance, and modern web runtimes.",
    category: "Conference",
    venue: "Berlin Congress Center",
    organizer: "JSConf EU",
    tags: ["JavaScript", "Frontend", "Web", "Open Source"],
    agenda: [
      "09:00 AM - 10:00 AM | Opening Keynote: JavaScript at Scale",
      "10:15 AM - 11:30 AM | Talks: Web Performance and Runtimes",
      "11:45 AM - 12:45 PM | Community Sessions & Lightning Talks",
      "12:45 PM - 01:45 PM | Lunch",
      "02:00 PM - 03:30 PM | Workshops: Modern JS Patterns and Testing",
      "03:45 PM - 05:00 PM | Closing Panel: The Future of the Web",
    ],
  },
  {
    title: "DevOpsDays London",
    date: "2026-11-04",
    location: "London, UK",
    image: "/images/event3.png",
    slug: "devopsdays-london-2026",
    time: "11:00 AM",
    description:
      "Hands-on DevOps sessions focused on release engineering, cloud operations, and platform reliability.",
    category: "Conference",
    venue: "The Crystal Maze",
    organizer: "DevOpsDays London Team",
    tags: ["DevOps", "Cloud", "Infrastructure", "SRE"],
    agenda: [
      "08:00 AM - 09:00 AM | Registration & Coffee",
      "09:15 AM - 10:15 AM | Keynote: Reliability Engineering in Practice",
      "10:30 AM - 11:45 AM | Sessions: Kubernetes and Delivery",
      "12:00 PM - 01:00 PM | Lunch & Community Roundtables",
      "01:15 PM - 02:45 PM | Hands-On Labs: GitOps and Cloud Automation",
      "03:00 PM - 04:30 PM | Panel: Platform Engineering for High-Trust Teams",
    ],
  },
  {
    title: "Frontend Monthly Meetup",
    date: "2026-10-28",
    location: "Remote & New York, NY, USA",
    image: "/images/event4.png",
    slug: "frontend-monthly-2026",
    time: "6:00 PM",
    description:
      "A networking meetup featuring product-focused frontend talks, design systems, and shipping demos.",
    category: "Meetup",
    venue: "Remote + Midtown NYC",
    organizer: "Frontend Collective",
    tags: ["Frontend", "JavaScript", "React", "Product", "UX"],
    agenda: [
      "06:00 PM - 06:30 PM | Check-in & Networking",
      "06:30 PM - 07:00 PM | Opening Remarks & Product Updates",
      "07:00 PM - 08:00 PM | Talks: Design Systems and Shipping",
      "08:00 PM - 08:30 PM | Lightning Demos",
      "08:30 PM - 09:00 PM | Q&A & Community Mixer",
    ],
  },
  {
    title: "Open Source Summit",
    date: "2026-12-05",
    location: "Dublin, IE & Virtual",
    image: "/images/event5.png",
    slug: "open-source-summit-2026",
    time: "1:00 PM",
    description:
      "An open-source community event exploring maintainership, contributor experience, and cloud-native tooling.",
    category: "Conference",
    venue: "Convention Centre Dublin",
    organizer: "Linux Foundation",
    tags: ["Open Source", "Community", "Cloud", "DevOps"],
    agenda: [
      "09:00 AM - 10:00 AM | Welcome & Maintainer Stories",
      "10:15 AM - 11:30 AM | Community Tracks: Contributor Experience & Governance",
      "11:45 AM - 12:45 PM | Open Source Product Demos",
      "12:45 PM - 01:45 PM | Lunch",
      "02:00 PM - 03:30 PM | Workshops: Building Healthy OSS Projects",
      "03:45 PM - 05:00 PM | Closing Keynote: The Future of Open Collaboration",
    ],
  },
  {
    title: "CityHack 48hr",
    date: "2027-01-22",
    location: "Toronto, CA (Hybrid)",
    image: "/images/event6.png",
    slug: "cityhack-48-2027",
    time: "3:00 PM",
    description:
      "A 48-hour civic-tech hackathon building prototypes for public impact, data, and AI-powered services.",
    category: "Hackathon",
    venue: "Toronto Innovation Hub",
    organizer: "Toronto Civic Lab",
    tags: ["Hackathon", "AI", "Product", "Full Stack", "UX"],
    agenda: [
      "03:00 PM - 04:00 PM | Kickoff Briefing & Team Formation",
      "04:15 PM - 05:30 PM | Problem Framing & Mentor Check-ins",
      "06:00 PM - 07:00 PM | Dinner & Networking",
      "07:00 PM - 11:00 PM | Build Sprint Round 1",
      "Next Day 09:00 AM - 10:00 AM | Breakfast & Project Check-ins",
      "Next Day 12:00 PM - 02:00 PM | Demo Prep & Final Judging",
    ],
  },
];

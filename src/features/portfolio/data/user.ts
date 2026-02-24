import type { User } from "@/features/portfolio/types/user";

export const USER: User = {
  firstName: "Gangeya",
  lastName: "Upadhyaya",
  displayName: "Gangeya Upadhyaya",
  username: "ayegnag",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "Full-Stack Developer",
    "Generalist",
    "Design Thinker",
    "Maker at Heart",
  ],
  address: "Jaipur, Rajasthan, India",
  phoneNumber: "KzkxIDkwMDA3IDg1MTUz", // E.164 format, base64 encoded
  email: "Z2FuZ2V5YS51QGdtYWlsLmNvbQ==", // base64 encoded
  website: "https://gangeya.com",
  jobTitle: "Specialist Senior",
  jobs: [
    {
      title: "Specialist Senior and Tech Lead",
      company: "Deloitte",
      website: "https://www.deloittedigital.com/us/en.html",
    },
    // {
    //   title: "Founder",
    //   company: "realprint",
    //   website: "https://realprint.com",
    // },
  ],
  
  //   `,
  about:`
- **Senior Full-Stack Engineer building scalable platforms and AI-powered systems with 12+ years of experience**, delivering modern web, backend, and cloud solutions for enterprise and product teams.
- Strong command of **Node.js, TypeScript, Angular/React, AWS, Azure, and system design**, with hands-on experience integrating **LLM-driven features and AI-enhanced workflows** into production systems.
- Recognized for **design-led engineering**, combining backend rigor with refined UI/UX execution to craft **AI-driven product experiences** that are intuitive, responsive, and user-centric.
- Proven ability to operate in **remote-first, distributed teams**, leading architecture discussions and embedding intelligent automation and AI capabilities into evolving product ecosystems.
- Focused on **scalable architecture, performance, observability, and developer experience**, ensuring platforms remain resilient, adaptable, and ready to incorporate emerging AI capabilities.
   `,

  // avatar: "/images/profilePic_painted.jpg",
  avatar: "/images/profilePic_photo.png",
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-light.png?t=1764345394",
  namePronunciationUrl: "/audio/gangeya_name.mp3",
  timeZone: "Asia/Kolkata",
  keywords: [
    "Gangeya",
    "Upadhyaya",
    "GangeyaUpadhyaya",
    "GU",
    "ayegnag",
    "Gangeya_dev",
    "gangeya.dev",
    "gangeya-upadhyaya"
  ],
  dateCreated: "2025-12-20", // YYYY-MM-DD
};

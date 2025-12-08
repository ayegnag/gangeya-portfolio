import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "consulting",
    companyName: "Deloitte Digital",
    companyLogo: "/images/companies/deloitte.svg",
    positions: [
      {
        id: "techlead-001",
        title: "Technical Lead",
        employmentPeriod: {
          start: "04.2021",
          end: "Present",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Lead architecture and delivery of enterprise-scale platforms across distributed teams.
- Spearhead modernization of core backend services, improving reliability and long-term maintainability.
- Oversee system design reviews, coding standards, deployment strategy, and CI/CD adoption.
- Coordinate cross-functional development with product, UX, and business stakeholders in remote-first settings.
- Improve API performance and data integrity through asynchronous patterns, caching, DB indexing, and access optimization.
- Mentor engineers, establish technical direction, and support onboarding across global engineering footprint.
- Drive engineering accountability and delivery predictability through documentation, planning, and stable release cadence.`,
        skills: [
          "Node.js",
          "TypeScript",
          "Vue.js",
          "AWS",
          "Microservices",
          "API Architecture",
          "System Design",
          "CI/CD",
          "Docker",
          "Performance Optimization",
          "Remote Collaboration",
          "Technical Leadership",
          "Architecture Governance",
        ],
        isExpanded: true,
      },
      {
        id: "fullstack-001",
        title: "Full Stack Developer",
        employmentPeriod: {
          start: "06.2018",
          end: "Present",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Develop and maintain production-grade modules across frontend, backend, and integration layers.
- Contribute to platform scalability through service boundaries, clean API contracts, and domain-driven approach.
- Enhance frontend UX performance and consistency using component-level optimization and accessibility patterns.
- Build secure data flows and multi-environment deployment pipelines tied to automated testing.
- Collaborate asynchronously with fully remote teams, ensuring clarity of handoff, backlog readiness, and delivery timelines.`,
        skills: [
          "Node.js",
          "Vue.js",
          "JavaScript",
          "REST",
          "GraphQL",
          "SQL/NoSQL",
          "S3/CloudFront",
          "AWS Lambda",
          "Design Systems",
          "Testing & QA",
          "UX Collaboration",
        ],
        isExpanded: true
      },
      {
        id: "frontend-001",
        title: "Front-End Engineer",
        employmentPeriod: {
          start: "04.2018",
          end: "07.2018",
        },
        employmentType: "Full-time",
        icon: "design",
        description: `- Delivered frontend modules aligned with evolving business requirements and user experience priorities.
- Built UI components using modern templating and state management approaches.
- Improved client-side rendering and asset loading to boost first meaningful paint and interaction responsiveness.`,
        skills: [
          "Vue.js",
          "HTML5",
          "CSS3",
          "Responsive Layout",
          "User Flow Design",
        ],
        isExpanded: true
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "3dprint",
    companyName: "realprint",
    companyLogo: "/images/companies/realprint.svg",
    positions: [
      {
        id: "founder-001",
        title: "Co-Founder",
        employmentPeriod: {
          start: "2017",
          end: "2018",
        },
        employmentType: "Full-time",
        icon: "idea",
        description: `- Co-built a digital B2B 3D-printing service platform with ordering, pricing, and post-processing workflows.
- Managed product development timelines, customer relationships, and vendor integration.
- Established operational feedback loops to validate material, tolerance, and post-finishing iterations.`,
        skills: [
          "Business Strategy",
          "Operations",
          "Vendor Coordination",
          "Field Testing",
          "Customer Success",
        ],
        isExpanded: true
      },
    ],
  },
  {
    id: "webdev",
    companyName: "Securifi Embedded Systems (India) PL",
    companyLogo: "/images/companies/securifi.svg",
    positions: [
      {
        id: "webapp-001",
        title: "Web Application Developer",
        employmentPeriod: {
          start: "2013",
          end: "2017",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Built and maintained full-stack modules using Node.js, HTML5, and UI-first development priorities.
- Implemented real-time logic for data-driven interfaces backed by efficient server execution paths.
- Delivered layout, navigation, and content experience improvements with UX parity for web and mobile devices.`,
        skills: [
          "Node.js",
          "HTML5",
          "JavaScript",
          "UX Implementation",
          "Responsive Design",
        ],
        isExpanded: true
      },
      {
        id: "mts-001",
        title: "Member of Technical Staff",
        employmentPeriod: {
          start: "2013",
          end: "2017",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Designed UI layouts and data-driven flows for enterprise applications.
- Integrated multi-source backend services and ensured client stability and data coherence.
- Maintained product availability, scale, and onboarding efficiency through iterative release practices.`,
        skills: [
          "Systems Integration",
          "UI Layouts",
          "Backend Connectivity",
          "Documentation",
          "Feature Rollout",
        ],
        isExpanded: true
      },
    ],
  },
  {
    id: "embedded",
    companyName: "Securifi Embedded Systems (India) PL",
    companyLogo: "/images/companies/securifi.svg",
    positions: [
      {
        id: "embedded-001",
        title: "Embedded Software Developer",
        employmentPeriod: {
          start: "2013",
        },
        employmentType: "Full-time",
        icon: "hardware",
        description: `- Developed embedded firmware for device-level LCD interfaces and operational logic.
- Assisted in field diagnostics, firmware stability improvements, and unit-level test protocols.`,
        skills: [
          "Embedded C",
          "LCD UI",
          "Firmware Debugging",
          "Device Logic",
        ],
        isExpanded: true
      },
    ],
  },
];

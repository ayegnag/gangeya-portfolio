import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "consulting",
    companyName: "Deloitte Digital",
    companyLogo: "/images/companies/deloitte",
    logoTheme: true,
    positions: [
      {
        id: "techlead-001",
        title: "Technical Lead",
        location: [
          {
            city: "Jaipur",
            country: "India",
            status: "Remote",
          }
        ],
        employmentPeriod: {
          start: "04.2021",
          end: "Present",
        },
        employmentType: "Full-time",
        icon: "code",
//         description: `- Lead architecture and delivery of enterprise-scale platforms across distributed teams.
// - Spearhead modernization of core backend services, improving reliability and long-term maintainability.
// - Oversee system design reviews, coding standards, deployment strategy, and CI/CD adoption.
// - Coordinate cross-functional development with product, UX, and business stakeholders in remote-first settings.
// - Improve API performance and data integrity through asynchronous patterns, caching, DB indexing, and access optimization.
// - Mentor engineers, establish technical direction, and support onboarding across global engineering footprint.
// - Drive engineering accountability and delivery predictability through documentation, planning, and stable release cadence.`,
        description: `- Led architecture and delivery of a utility service portal serving 10–16K daily visits and 1M+ customer records across multiple US states, supporting residential and large commercial billing workflows.
- Drove end-to-end modernisation initiatives including Angular 5 → 10 migration, Azure AD B2C UI refactor from monolithic jQuery to MVC + TypeScript, and re-architecture of a legacy notification settings page into a modular Angular SPA - designed to serve 3 sub-companies from a single codebase with smart data handling.
- Improved Google Lighthouse performance scores from 75 to 98–99 on a brownfield application through targeted rendering, asset, and interaction optimisations.
- Reduced a critical registration endpoint response time from 30s to 10s by refactoring database queries and introducing async queues for parallel downstream service calls.
- Identified and resolved security vulnerabilities on anonymous and authenticated endpoints during active development - proposed and implemented fixes that were adopted over the SecOps team's own recommendations after review.
- Oversaw system design reviews, coding standards, deployment strategy, and CI/CD adoption across teams - maintaining technical direction without becoming a bottleneck to delivery.
- Drove cross-functional delivery across 15+ stakeholders - developers, QA, UX, analytics, product, and business leads - in a fully remote enterprise engagement; sole technical decision-maker day-to-day with architect engaged for approvals only.
- Mentored and managed teams of 3–5 junior engineers across enterprise projects - maintained near-zero production defect record across bi-monthly release cadences through code standards, CI/CD adoption, and rigorous handoff documentation.
- Challenged design proposals before development - flagged a UX decision that was overruled at demo stage by business leadership three months later, validating early pushback as a standard practice.
- Drove engineering accountability through planning rigour, stable release cadence, and clear communication of technical tradeoffs to non-technical stakeholders.
- Built internal tooling to reduce team friction - including a QA test utility that eliminated 25-minute manual timeout waits, environment-switching scripts for dev and test teams, and an authentication configuration visualiser.
        `,
        skills: [
          "Node.js",
          "TypeScript",
          "Vue.js",
          "AWS",
          "Azure",
          "Redis",
          "PostgreSQL",
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
        location: [
          {
            city: "Bangalore",
            country: "India",
            status: "On-site",
          }
        ],
        employmentPeriod: {
          start: "06.2018",
          end: "03.2021",
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
          "React.js",
          "Angular",
          "Vue.js",
          "JavaScript",
          "TypeScript",
          "REST",
          "GraphQL",
          "SQL/NoSQL",
          "S3/CloudFront",
          "AWS Lambda",
          "CI/CD",
          "Performance Optimization",
          "Docker",
          "Design Systems",
          "Testing & QA",
          "UX Collaboration",
        ],
        isExpanded: true
      },
      {
        id: "frontend-001",
        title: "Front-End Engineer",
        location: [
          {
            city: "Bangalore",
            country: "India",
            status: "On-site",
          }
        ],
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
          "React.js",
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
    companyLogo: "/images/companies/realprint",
    positions: [
      {
        id: "founder-001",
        title: "Co-Founder",
        location: [
          {
            city: "Hyderabad",
            country: "India",
            status: "On-site",
          }, {
            city: "Gurgaon",
            country: "India",
            status: "On-site",
          }
        ],
        employmentPeriod: {
          start: "2017",
          end: "2018",
        },
        employmentType: "Full-time",
        icon: "idea",
        description: `- Designed and built the entire customer-facing platform solo from scratch - an end-to-end ordering system where customers could upload STL files, preview 3D models in the browser with material visualization, configure post-processing options, and check out.
- Implemented real-time 3D model rendering using Three.js - first time working in 3D space - navigating coordinate systems, point scaling, and material shading from scratch without prior experience in WebGL/3D rendering pipelines.
- Built backend file handling, order tracking, and automated customer communication on Node.js, making deliberate technology choices (Node + jQuery) to maximize shipping speed over architectural elegance - launched in under 8 months.
- Operated in a zero-salary, high-pressure environment for 6+ months, shipping a production system while learning that time-to-field matters more than stack cleanliness - a principle that still informs technical decision-making.
- Secured and delivered B2B contracts, including a precision helical connector piece iterated across 7 prototypes in 2 weeks for a manufacturing client - a turnaround conventionally impossible without costly tooling changes.`,
//         description: `- Co-built a digital B2B 3D-printing service platform with ordering, pricing, and post-processing workflows.
// - Managed product development timelines, customer relationships, and vendor integration.
// - Established operational feedback loops to validate material, tolerance, and post-finishing iterations.`,
        skills: [
          "End-to-End Product Build",
          "Full-Stack Architecture",
          "3D Printing | Rapid Prototyping",
          "3D Model Rendering",
          "STL File Handling",
          "B2B",
          "jQuery",
          "Three.js",
          "Node.js",
        ],
        isExpanded: true
      },
    ],
  },
  {
    id: "webdev",
    companyName: "Securifi Embedded Systems (India) PL",
    companyLogo: "/images/companies/securifi",
    positions: [
      {
        id: "webapp-001",
        title: "Web Application Developer",
        location: [
          {
            city: "Hyderabad",
            country: "India",
            status: "On-site",
          }
        ],
        employmentPeriod: {
          start: "2013",
          end: "2017",
        },
        employmentType: "Full-time",
        icon: "code",
//         description: `- Built and maintained full-stack modules using Node.js, HTML5, and UI-first development priorities.
// - Implemented real-time logic for data-driven interfaces backed by efficient server execution paths.
// - Delivered layout, navigation, and content experience improvements with UX parity for web and mobile devices.`,
        description: `- Delivered frontend modules aligned with evolving business requirements and user experience priorities.
- Built UI components using modern templating and state management approaches.
- Improved client-side rendering and asset loading to reduce first meaningful paint and boost interaction responsiveness.`,
        skills: [
          "Node.js",
          "HTML5",
          "Real-time Data",
          "REST APIs",
          "MySQL",
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
//         description: `- Designed UI layouts and data-driven flows for enterprise applications.
// - Integrated multi-source backend services and ensured client stability and data coherence.
// - Maintained product availability, scale, and onboarding efficiency through iterative release practices.`,
        description: `- Sole frontend engineer responsible for the complete IoT device management dashboard on a smart home Wi-Fi router - including a visual rules engine (if-this-then-that style logic builder) accessible via local admin configuration.
- Designed and built real-time data-driven interfaces backed by efficient server execution, delivering UX parity across web and mobile for consumers in the USA, UK, France, and Germany.
- Operated with full autonomy across the product - went beyond the frontend brief to collaborate with firmware, backend, cloud, and design teams, using cross-functional insight to make better UX decisions than would have been possible in a siloed role.
- Engaged directly with design and product on UI decisions - questioned assumptions, proposed alternatives grounded in technical and user flow understanding, and contributed to a product that shipped quarterly updates to international markets.
- Integrated multi-source backend services, maintained data coherence across enterprise application layers, and supported product availability through iterative release practices.
        `,
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
    companyLogo: "/images/companies/securifi",
    positions: [
      {
        id: "embedded-001",
        title: "Embedded Software Developer",
        employmentPeriod: {
          start: "2013",
          end: "2015",
        },
        employmentType: "Full-time",
        icon: "hardware",
//         description: `- Developed embedded firmware for device-level LCD interfaces and operational logic.
// - Assisted in field diagnostics, firmware stability improvements, and unit-level test protocols.`,
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

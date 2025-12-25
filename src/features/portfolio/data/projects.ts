import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
    {
        id: "go_game",
        title: "Go - Real-Time Multiplayer",
        period: {
            start: "08.2019",
            end: "09.2019"
        },
        link: "https://github.com/ayegnag/go_game",
        skills: [
            "React",
            "TypeScript",
            "Node.js",
            "WebSockets",
            "Real-Time Systems",
            "Game UX",
            "Socket Architecture",
            "Testing"
        ],
        description: `A polished, full-stack implementation of the classic board game “Go” with a responsive frontend and a real-time multiplayer backend.
- 🎯 Intuitive, responsive React UI for smooth board interactions and accessibility
- 🔁 Low-latency multiplayer with chats using WebSockets and a lightweight Node.js game server
- 🧭 Robust game state management with reconnection handling and move validation
- 🛠 Designed for modularity: client (go_game) and server (go_server) packaged for easy deployment`,
        logo: "/images/project-logos/go_game.png",
        isExpanded: false
    },

    {
        id: "b2cvisualizer",
        title: "Azure B2C Policy Visualizer",
        period: {
            start: "05.2025",
            end: "07.2025"
        },
        link: "https://github.com/ayegnag/b2cvisualizer",
        skills: [
            "React",
            "TypeScript",
            "Graph Visualization",
            "UI/UX",
            "Electron (optional)",
            "Developer Tools"
        ],
        description: `Interactive toolkit that visualizes Azure AD B2C custom policy flows and orchestration steps, making complex auth logic immediately understandable.
- 🔍 Converts XML policy files into readable graphs with collapsible nodes
- 🧭 Highlights orchestration steps, technical profiles, and claim flows for easier debugging
- ⚙️ Built for extensibility - supports loading base/extension policies and recursive resolution`,
        logo: "/images/project-logos/b2cvisualizer.svg",
        isExpanded: false
    },

    {
        id: "vyay",
        title: "Vyay - Private Expense Manager",
        period: {
            start: "08.2024",
        },
        link: "https://github.com/ayegnag/vyay",
        skills: [
            "Kotlin",
            "Android",
            "Jetpack",
            "Room",
            "Coroutines",
            "Transactions Parsing",
            "Privacy-first Design",
            "Local-first Storage",
            "UI/UX"
        ],
        description: `Vyay (Sanskrit: "expense") is a privacy-first expense management Android app built for modern phones. No data leaves the device - all analysis and summaries are computed locally. Vyay parses transaction SMS/notifications to extract amounts, dates, and merchant info, while also supporting manual entries, custom categorization, and insightful spending summaries.
- 🔒 Privacy-first: all processing & storage remain on the user's phone
- 🔍 SMS transaction parsing with robust pattern matching and categorization
- 📈 Local summaries and reports, with manual edit and tagging support
- ⚡ Kotlin + modern Android architecture (coroutines, Room, Jetpack components)`,
        logo: "/images/project-logos/vyay.png",
        isExpanded: true
    },

    {
        id: "pangaea_game",
        title: "Pangaea - World Building Game Prototype",
        period: {
            start: "02.2023",
            end: "04.2023"
        },
        link: "https://github.com/ayegnag/pangaea_game",
        skills: [
            "Unity",
            "C#",
            "Procedural Generation",
            "Game Design",
            "Shaders",
            "AI"
        ],
        description: `A strategic world-building prototype exploring emergent civilizations, procedural terrain, and player-driven narratives.
- 🌍 Procedural terrain + biome systems with dynamic resource simulation
- 🤖 Autonomous agent behaviours and simple AI for NPC civilizations
- ✨ Focus on prototyping gameplay loops, polish, and a playable vertical slice`,
        logo: "/images/project-logos/pangaea_game.png",
        isExpanded: false
    },

    {
        id: "pyAsciiArt",
        title: "pyAsciiArt",
        period: {
            start: "07.2022",
            end: "07.2022"
        },
        link: "https://github.com/ayegnag/pyAsciiArt",
        skills: [
            "Python",
            "Pillow",
            "Image Processing",
            "CLI Tools",
            "Scripting",
            "ASCII Art"
        ],
        description: `Lightweight Python utility that converts images to expressive ASCII art - ideal for terminals, playful demos, and retro visuals.
- 🖼 Multiple brightness mapping modes and character sets for fine control
- ⚙️ CLI friendly with flags for width, contrast, and output format
- ♻️ Minimal dependencies and extensible codebase for custom renderers`,
        logo: "/images/project-logos/pyAsciiArt.svg",
        isExpanded: false
    },

    {
        id: "screen-time-widget",
        title: "MacOS - Screen Time Widget",
        period: {
            start: "10.2025",
        },
        link: "https://github.com/ayegnag/screen-time-widget",
        skills: [
            "Swift",
            "WidgetKit",
            "macOS",
            "User-Centred Design",
            "Performance Optimization"
        ],
        description: `A minimal, high-signal macOS widget surfaced with WidgetKit to display screen-on time and session patterns at a glance.
- 📊 Compact visualizations optimized for glanceability and dark/light modes
- ⚡ Built natively for efficient background updates and small memory footprint
- 🔧 Designed for seamless integration into macOS widget stacks`,
        logo: "/images/project-logos/screen-time-widget.svg",
        isExpanded: false
    }
];

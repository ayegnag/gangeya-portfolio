import { USER } from "@/features/portfolio/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://gangeya.com",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  // {
  //   title: "Components",
  //   href: "/components",
  // },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Blackboard",
    href: "/blackboard",
  },
  // {
  //   title: "Sponsors",
  //   href: "/sponsors",
  // },
  {
    title: "More",
    children: [
      {
        title: "Hobbies",
        href: "/hobbies",
      },
    ],
  },
];

export const MAIN_NAV_MOB: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Blackboard",
    href: "/blackboard",
  },
  {
    title: "Hobbies",
    href: "/hobbies",
  },
];

export const GITHUB_USERNAME = "ayegnag";
export const SOURCE_CODE_GITHUB_REPO = "ayegnag/gangeya-portfolio";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/ayegnag/gangeya-portfolio";

export const SPONSORSHIP_URL = "";

export const UTM_PARAMS = {
  utm_source: "gangeya.com",
  utm_medium: "referral",
  utm_campaign: "portfolio",
};

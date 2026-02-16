type NavLeaf = {
  title: string;
  href: string;
  children?: never;
};

type NavParent = {
  title: string;
  href?: string;
  children: NavLeaf[];
};

export type NavItem = NavLeaf | NavParent;
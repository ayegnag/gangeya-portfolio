import { TriangleDashedIcon, TypeIcon } from "lucide-react";
import { Link } from '@tanstack/react-router'
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { copyText } from "@/utils/copy";

import { GangeyaMark, getMarkSVG } from "./gangeya-mark";
import { getWordmarkSVG } from "./gangeya-wordmark";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

export default function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuItem
          onClick={() => {
            const svg = getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff");
            copyText(svg);
            toast.success("Copied Mark as SVG");
          }}
        >
          <GangeyaMark />
          Copy Mark as SVG
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => {
            const svg = getWordmarkSVG(
              resolvedTheme === "light" ? "#000" : "#fff"
            );
            copyText(svg);
            toast.success("Copied Logotype as SVG");
          }}
        >
          <TypeIcon />
          Copy Logotype as SVG
        </ContextMenuItem>

        <ContextMenuItem asChild>
          {/* <Link to="/blog/chanhdai-brand"> */}
          <Link to="/">
            <TriangleDashedIcon />
            Brand Guidelines
          </Link>
        </ContextMenuItem>

        {/* <ContextMenuItem asChild>
          <a href="https://assets.chanhdai.com/chanhdai-brand.zip" download>
            <DownloadIcon />
            Download Brand Assets
          </a>
        </ContextMenuItem> */}
      </ContextMenuContent>
    </ContextMenu>
  );
}

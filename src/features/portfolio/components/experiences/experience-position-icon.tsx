import type { LucideProps } from "lucide-react";
import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  DraftingCompassIcon,
  GraduationCapIcon,
  LightbulbIcon,
  Cpu,
} from "lucide-react";

import type { ExperiencePositionIcon } from "../../types/experiences";

const iconMap: Record<
  ExperiencePositionIcon,
  React.ComponentType<LucideProps>
> = {
  code: CodeXmlIcon,
  design: DraftingCompassIcon,
  education: GraduationCapIcon,
  business: BriefcaseBusinessIcon,
  hardware: Cpu,
  idea: LightbulbIcon,
};

export function ExperienceIcon({
  icon,
  ...props
}: {
  icon: ExperiencePositionIcon | undefined;
} & LucideProps) {
  const IconComponent = icon ? iconMap[icon] : BriefcaseBusinessIcon;
  return <IconComponent {...props} />;
}

import { CollapsibleList } from "@/components/collapsible-list";

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";
import { EDUCATION } from "../../data/education";
import { EducationItem } from "./education-item";

export function Education() {
  return (
    <Panel id="education">
      <PanelHeader>
        <PanelTitle>
          Education
          <PanelTitleSup>({EDUCATION.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={EDUCATION}
        max={8}
        renderItem={(item) => <EducationItem education={item} />}
      />
    </Panel>
  );
}

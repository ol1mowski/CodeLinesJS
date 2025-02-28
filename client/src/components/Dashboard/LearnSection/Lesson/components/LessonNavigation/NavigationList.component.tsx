import { memo } from "react";
import { NavigationItem } from "./NavigationItem.component";
import type { LessonSection } from "../../../types/lesson.types";

type NavigationListProps = {
  sections: LessonSection[];
  activeSection: number;
  onSectionChange: (index: number) => void;
}

export const NavigationList = memo(({ 
  sections, 
  activeSection, 
  onSectionChange 
}: NavigationListProps) => (
  <div className="space-y-2">
    {sections.map((section, index) => (
      <NavigationItem
        key={index}
        title={section.title}
        index={index}
        isActive={activeSection === index}
        onClick={() => onSectionChange(index)}
      />
    ))}
  </div>
));

NavigationList.displayName = "NavigationList"; 
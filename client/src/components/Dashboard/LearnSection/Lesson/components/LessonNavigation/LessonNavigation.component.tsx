import { memo } from "react";
import { NavigationHeader } from "./NavigationHeader.component";
import { NavigationList } from "./NavigationList.component";
import type { LessonSection } from "../../../types/lesson.types";

type LessonNavigationProps = {
  sections: LessonSection[];
  activeSection: number;
  onSectionChange: (index: number) => void;
}

export const LessonNavigation = memo(({ 
  sections, 
  activeSection, 
  onSectionChange 
}: LessonNavigationProps) => (
  <nav className="sticky top-4 space-y-2">
    <NavigationHeader />
    <NavigationList 
      sections={sections}
      activeSection={activeSection}
      onSectionChange={onSectionChange}
    />
  </nav>
));

LessonNavigation.displayName = "LessonNavigation"; 
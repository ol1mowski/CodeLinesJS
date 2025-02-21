import { memo } from 'react';
import { type LessonSection } from '../../types/lesson.types';
import { LessonNavigation } from './LessonNavigation.component';

type LessonSidebarProps = {
  sections: LessonSection[];
  activeSection: number;
  onSectionChange: (index: number) => void;
};

export const LessonSidebar = memo(({ sections, activeSection, onSectionChange }: LessonSidebarProps) => (
  <div className="hidden lg:block col-span-3">
    <div className="sticky top-8">
      <LessonNavigation
        sections={sections}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />
    </div>
  </div>
));

LessonSidebar.displayName = "LessonSidebar"; 
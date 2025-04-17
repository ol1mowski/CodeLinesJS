import { memo } from 'react';
import { SectionTitle } from '../../UI/SectionTitle/SectionTitle.component';

export const Header = memo(() => (
  <SectionTitle
    title="Ścieżka Rozwoju JS"
    subtitle="Od podstaw do zaawansowanych konceptów"
    className="text-center px-4"
    titleClassName="text-[#f7df1e] drop-shadow-lg"
    subtitleClassName="text-gray-400"
  />
));

Header.displayName = 'Header';

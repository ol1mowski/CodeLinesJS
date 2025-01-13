import { ReactNode } from 'react';

export type NavigationItem = {
  id: string;
  label: string;
  icon: ReactNode;
  section: "main" | "game" | "social";
  path?: string;
};

export type NavigationSectionProps = {
  title: string;
  items: NavigationItem[];
  isExpanded: boolean;
  activeItem: string;
  onItemClick: (item: NavigationItem) => void;
  index: number;
  isLastSection: boolean;
};

export type NavigationButtonProps = {
  icon: ReactNode;
  label?: string;
  isActive?: boolean;
  isExpanded: boolean;
  onClick: () => void;
  variant?: "default" | "danger";
}; 
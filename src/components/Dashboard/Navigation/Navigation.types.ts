export type NavigationItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  section: "main" | "game" | "social";
  path?: string;
}; 
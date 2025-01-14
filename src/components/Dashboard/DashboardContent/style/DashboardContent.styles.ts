export const dashboardContentStyles = {
  text: {
    heading: "font-bold text-js"
  },
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  card: {
    base: "bg-dark/50 backdrop-blur-sm border border-js/10 shadow-xl",
    community: `
      col-span-1 md:col-span-2 lg:col-span-1
      order-2 lg:order-1
    `,
    game: `
      col-span-1 md:col-span-2 lg:col-span-1
      order-1 lg:order-2
    `,
    stats: `
      col-span-1 md:col-span-2 lg:col-span-1
      order-3
    `
  }
} as const; 
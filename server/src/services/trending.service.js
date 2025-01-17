const topics = [
  { id: 1, name: "React", count: 234 },
  { id: 2, name: "TypeScript", count: 156 },
  { id: 3, name: "JavaScript", count: 142 },
  { id: 4, name: "NextJS", count: 98 }
];

const tags = [
  { name: "react", count: 234 },
  { name: "typescript", count: 156 },
  { name: "javascript", count: 142 },
  { name: "frontend", count: 98 },
  { name: "webdev", count: 76 }
];

export const getTopics = async () => {
  return topics;
};

export const getTags = async () => {
  return tags;
}; 
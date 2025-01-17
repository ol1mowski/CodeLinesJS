const groups = [
  {
    id: '1',
    name: 'React Masters',
    description: 'Grupa dla zaawansowanych programistów React',
    image: 'https://i.pravatar.cc/150?u=react_masters',
    membersCount: 1250,
    postsCount: 450,
    lastActive: new Date('2024-03-10T15:00:00'),
    isJoined: false,
    tags: ['react', 'javascript', 'frontend']
  }
];

export const getGroups = async () => {
  return groups;
};

export const joinGroup = async (groupId) => {
  const group = groups.find(g => g.id === groupId);
  if (group) {
    group.isJoined = !group.isJoined;
    group.membersCount += group.isJoined ? 1 : -1;
  }
}; 
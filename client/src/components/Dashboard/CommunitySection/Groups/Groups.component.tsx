import { memo, useState } from 'react';

interface Group {
  id: number;
  name: string;
  description: string;
  members: number;
  imageUrl: string | null;
  tags: string[];
}

export const Groups = memo(() => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Przykładowe dane grup
  const groups: Group[] = [
    {
      id: 1,
      name: 'Frontend Masters',
      description: 'Grupa dla pasjonatów technologii frontendowych - React, Vue, Angular i nie tylko.',
      members: 487,
      imageUrl: null,
      tags: ['React', 'JavaScript', 'CSS', 'HTML5']
    },
    {
      id: 2,
      name: 'Backend Developers',
      description: 'Rozwijaj swoje umiejętności backendowe. Dyskusje o Node.js, Express, serverless i bazach danych.',
      members: 325,
      imageUrl: null,
      tags: ['Node.js', 'Express', 'MongoDB', 'API']
    },
    {
      id: 3,
      name: 'JavaScript Learners',
      description: 'Dla osób uczących się JavaScriptu od podstaw. Pomoc, wsparcie, materiały edukacyjne.',
      members: 732,
      imageUrl: null,
      tags: ['JavaScript', 'Podstawy', 'ES6', 'Algorytmy']
    },
    {
      id: 4,
      name: 'TypeScript Community',
      description: 'Dyskusje, porady i dobre praktyki w TypeScript. Dla początkujących i zaawansowanych.',
      members: 246,
      imageUrl: null,
      tags: ['TypeScript', 'Static Typing', 'Interfaces']
    },
  ];

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="bg-dark/20 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-js mb-4">Grupy</h2>
        <p className="text-gray-300 mb-4">
          Dołącz do grup tematycznych, aby dyskutować i uczyć się z innymi programistami.
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="Szukaj grup..."
            className="w-full p-3 pl-10 bg-dark/50 border border-js/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-js/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-3 text-gray-400">
            🔍
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGroups.length > 0 ? (
          filteredGroups.map(group => (
            <div key={group.id} className="bg-dark/30 p-5 rounded-lg border border-js/10 hover:border-js/30 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-js/30 flex items-center justify-center text-dark text-xl font-bold mr-4">
                  {group.imageUrl || group.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{group.name}</h3>
                  <p className="text-xs text-gray-400">{group.members} członków</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 line-clamp-2">{group.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {group.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-js/10 text-js text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-js text-dark font-medium rounded-lg hover:bg-js/80 transition-colors">
                  Dołącz
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-400 text-lg">Nie znaleziono grup pasujących do zapytania.</p>
          </div>
        )}
      </div>
    </div>
  );
});

Groups.displayName = 'Groups'; 
import { useMemo } from 'react';
import { FaFileAlt, FaCode, FaPalette, FaLightbulb } from 'react-icons/fa';
import type { CVTip, CVExample, CVStats } from '../types/cv.types';

export const useCVSections = (tips: CVTip[], examples: CVExample[], stats: CVStats | null) => {
  const cvPreparationSections = useMemo(() => [
    {
      id: 'content-tips',
      title: 'Treść i zawartość',
      description: 'Jak napisać CV które sprzeda Twoje umiejętności',
      icon: FaFileAlt,
      stats: {
        items: tips.filter(tip => tip.category === 'content').length,
        completed: stats?.userProgress?.completedSections || 0
      },
      isAvailable: true,
    },
    {
      id: 'technical-tips',
      title: 'Umiejętności techniczne',
      description: 'Jak prezentować projekty i technologie',
      icon: FaCode,
      stats: {
        items: tips.filter(tip => ['skills', 'projects'].includes(tip.category)).length,
        completed: stats?.userProgress?.completedSections || 0
      },
      isAvailable: true,
    },
    {
      id: 'design-tips',
      title: 'Formatowanie i design',
      description: 'Jak sprawić żeby CV wyglądało profesjonalnie',
      icon: FaPalette,
      stats: {
        items: tips.filter(tip => tip.category === 'design').length,
        completed: stats?.userProgress?.completedSections || 0
      },
      isAvailable: true,
    },
    {
      id: 'examples',
      title: 'Przykłady opisów',
      description: 'Gotowe opisy projektów i doświadczenia',
      icon: FaLightbulb,
      stats: {
        items: examples.length,
        completed: stats?.userProgress?.completedSections || 0
      },
      isAvailable: true,
    }
  ], [tips, examples, stats]);

  return { cvPreparationSections };
};

export const getCategoryMapping = () => ({
  'content-tips': ['content'],
  'technical-tips': ['skills', 'projects'],
  'design-tips': ['design']
});

export const getViewConfig = () => ({
  'content-tips': {
    title: 'Treść i zawartość',
    description: 'Jak napisać CV które sprzeda Twoje umiejętności'
  },
  'technical-tips': {
    title: 'Umiejętności techniczne',
    description: 'Jak prezentować projekty i technologie'
  },
  'design-tips': {
    title: 'Formatowanie i design',
    description: 'Jak sprawić żeby CV wyglądało profesjonalnie'
  },
  'examples': {
    title: 'Przykłady opisów',
    description: 'Gotowe opisy projektów i doświadczenia'
  }
}); 
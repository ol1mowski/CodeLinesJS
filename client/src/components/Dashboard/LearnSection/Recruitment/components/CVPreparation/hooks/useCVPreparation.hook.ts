import { useMemo, useState } from 'react';
import { cvPreparationSections, cvTemplates, cvTips, cvExamples } from '../data/cvData.data';
import type { CVView } from '../types/cv.types';
import type { AnimationVariants } from '../../../types/recruitment.types';

export const useCVPreparation = () => {
  const [currentView, setCurrentView] = useState<CVView>('main');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const containerVariants: AnimationVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants: AnimationVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      },
    }),
    []
  );

  const cardVariants: AnimationVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: 'easeOut',
        },
      },
    }),
    []
  );

  const filteredTemplates = useMemo(() => {
    return cvTemplates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const filteredTips = useMemo(() => {
    return cvTips.filter(tip => {
      const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tip.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const filteredExamples = useMemo(() => {
    return cvExamples.filter(example => {
      const matchesSearch = example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           example.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || example.field === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSectionClick = (sectionId: string) => {
    setCurrentView(sectionId as CVView);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery.trim() !== '') count++;
    if (selectedCategory !== 'all') count++;
    return count;
  };

  return {
    currentView,
    selectedTemplate,
    searchQuery,
    selectedCategory,

    cvPreparationSections,
    filteredTemplates,
    filteredTips,
    filteredExamples,

    containerVariants,
    itemVariants,
    cardVariants,

    setCurrentView,
    setSearchQuery,
    setSelectedCategory,
    handleSectionClick,
    handleBackToMain,
    handleTemplateSelect,
    resetFilters,
    getActiveFiltersCount,
  };
}; 
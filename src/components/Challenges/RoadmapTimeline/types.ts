import { IconType } from 'react-icons';

export type RoadmapStep = {
    title: string;
    description: string;
    duration: string;
    icon: IconType;
    skills: string[];
};

export type TimelineStepProps = RoadmapStep & {
    index: number;
};


export type TimelineContentProps = {
    title: string;
    description: string;
    duration: string;
    skills: string[];
};
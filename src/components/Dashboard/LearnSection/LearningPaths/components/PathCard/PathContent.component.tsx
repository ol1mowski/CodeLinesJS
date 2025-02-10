import { memo } from 'react';

type PathContentProps = {
  description: string;
  outcomes: string[];
  requirements: string[];
}


export const PathContent = memo(({ description, outcomes, requirements }: PathContentProps) => (
  <div className="space-y-4">
    <p className="text-gray-400 text-sm">{description}</p>
    
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-js">Czego się nauczysz:</h4>
      <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
        {outcomes.map((outcome, index) => (
          <li key={index}>{outcome}</li>
        ))}
      </ul>
    </div>

    {requirements.length > 0 && (
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-js">Wymagania:</h4>
        <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
          {requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
));

PathContent.displayName = "PathContent"; 
import { memo } from 'react';

type TestDetail = {
  title: string;
  description: string;
};

type TestInfoSectionProps = {
  details: TestDetail[];
};

export const TestInfoSection = memo(({ details }: TestInfoSectionProps) => {
  return (
    <div className="bg-dark-700/30 border border-js/10 rounded-xl p-6 space-y-3">
      <h4 className="text-js font-semibold text-center">Informacje o teście</h4>
      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
        {details.map((detail, index) => (
          <div key={index} className="text-center">
            <div className="font-medium text-white">{detail.title}</div>
            <div>{detail.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

TestInfoSection.displayName = 'TestInfoSection'; 
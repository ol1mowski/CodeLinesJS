import { FeaturesList } from './FeaturesList/FeaturesList.component';
import { PhonePreview } from '../../../UI/PhonePreview/PhonePreview.component';
import { CallToAction } from '../../../UI/CallToAction/CallToAction.component';

export const TheoryContent = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="relative pt-16 md:pt-24 lg:pt-20">
        <PhonePreview 
          position="right"
          title="Teoria JavaScript"
          className="absolute -right-4 top-0 md:top-[-20px] md:right-0 lg:right-10 xl:right-20 z-10 hidden md:block"
        />

        <div className="md:max-w-[60%] lg:max-w-[55%] space-y-6 py-6">
          <PhonePreview 
            title="Teoria JavaScript"
            className="flex justify-center mb-8 md:hidden"
            showFrame={true}
            isAbsolute={false}
          />

          <FeaturesList />

          <CallToAction 
            href="#practice"
            text="Przejdź do Praktyki"
            description="Gotowy na wyzwania? Sprawdź swoje umiejętności w praktyce!"
          />
        </div>
      </div>
    </div>
  );
}; 
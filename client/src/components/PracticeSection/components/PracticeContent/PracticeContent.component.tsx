import { FeaturesList } from './FeaturesList/FeaturesList.component';
import { PhonePreview } from '../../../UI/PhonePreview/PhonePreview.component';
import { CallToAction } from '../../../UI/CallToAction/CallToAction.component';

export const PracticeContent = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="relative pt-16 md:pt-24 lg:pt-20">
        <PhonePreview
          position="left"
          image="https://res.cloudinary.com/dbbuav0rj/image/upload/v1742282966/CodeLinesJs/game_cljs_snynmf.png"
          title="Praktyka JavaScript"
          className="absolute -left-4 top-0 md:top-[-20px] md:left-0 lg:left-10 xl:left-20 z-10 hidden md:block"
        />

        <div className="md:ml-auto md:max-w-[60%] lg:max-w-[55%] space-y-6 py-6">
          <PhonePreview
            title="Praktyka JavaScript"
            className="flex justify-center mb-8 md:hidden"
            showFrame={true}
            isAbsolute={false}
          />

          <FeaturesList />

          <CallToAction
            href="#challenges"
            text="Rozpocznij Wyzwania"
            description="Gotowy do działania? Sprawdź swoje umiejętności w praktycznych wyzwaniach!"
          />
        </div>
      </div>
    </div>
  );
};

import { CodeLine } from '../types';
import { LineNumber } from './LineNumber.component';
import { CodeContent } from './CodeContent.component';
import { BlinkingCursor } from './BlinkingCursor.component';
import { MobileWrapper } from '../../../../UI/MobileWrapper/MobileWrapper.component';
import { useMobileDetect } from '../../../../../hooks/useMobileDetect';

type AnimatedCodeLineProps = {
  lineNumber: number;
  code: CodeLine;
  showCursor: boolean;
};

export const AnimatedCodeLine = ({ lineNumber, code, showCursor }: AnimatedCodeLineProps) => {
  const isMobile = useMobileDetect();
  
  return (
    <MobileWrapper
      className="whitespace-pre relative"
      motionProps={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 }
      }}
    >
      <LineNumber number={lineNumber} />
      <CodeContent code={code} />
      {showCursor && !isMobile && <BlinkingCursor />}
    </MobileWrapper>
  );
}; 
import { TokenErrorDisplay } from '../../components/TokenErrorDisplay/TokenErrorDisplay.component';

type TokenErrorMessageProps = {
  errorMessage: string | null;
};

export const TokenErrorMessage = ({ errorMessage }: TokenErrorMessageProps) => {
  return <TokenErrorDisplay errorMessage={errorMessage} />;
};

import { Link } from 'react-router-dom';
import { SuccessAlert } from '../../../UI/Alerts/SuccessAlert.component';

type SuccessMessageProps = {
  message: string | null;
};

export const SuccessMessage = ({ message }: SuccessMessageProps) => {
  if (!message) return null;

  return (
    <>
      <SuccessAlert message={message} title="Hasło zostało zmienione" />
      <div className="text-center mt-4">
        <p className="text-gray-400 mb-2">
          Za chwilę zostaniesz przekierowany do strony logowania.
        </p>
        <Link to="/logowanie" className="text-js hover:underline">
          Przejdź do logowania
        </Link>
      </div>
    </>
  );
};

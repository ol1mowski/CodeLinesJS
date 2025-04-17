import { Link } from 'react-router-dom';
import { Button } from '../../../UI/Button/Button.component';

export const LoginButton = () => (
  <Link to="/logowanie">
    <Button className="hidden xl:flex text-sm px-5 py-2.5">Zaloguj się</Button>
  </Link>
);

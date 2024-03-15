import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// get the location from uselocation, verify whether the user is logged in or not, if not direct them to login page and set the return url as the checkout page
export default function AuthRoute({ children }) {
  const location = useLocation();
  const { user } = useAuth();
  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}
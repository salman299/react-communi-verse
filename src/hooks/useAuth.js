import { useSelector, useDispatch } from 'react-redux';
import { login, logout, register } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    ...auth,
    login: (credentials) => dispatch(login(credentials)),
    logout: () => dispatch(logout()),
    register: (userData) => dispatch(register(userData))
  };
};

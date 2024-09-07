import { useSelector, useDispatch } from 'react-redux';
import { login, logout, register } from '../store/authSlice';
import { fetchUser } from '../store/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    ...auth,
    login: (credentials) => dispatch(login(credentials)),
    logout: () => dispatch(logout()),
    register: (userData) => dispatch(register(userData)),
    fetchUser: () => dispatch(fetchUser())
  };
};

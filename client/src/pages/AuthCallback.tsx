import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useTranslate';
import { setTokenFromGoogle, getMe } from '../store/authSlice';

function AuthCallback() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (error) {
      navigate('/login?error=google_failed');
      return;
    }

    if (token) {
      dispatch(setTokenFromGoogle(token));
      dispatch(getMe()).then(() => {
        navigate('/');
      });
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-lg text-gray-600">Logging you in...</p>
      </div>
    </div>
  );
}

export default AuthCallback;
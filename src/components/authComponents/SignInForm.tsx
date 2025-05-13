import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { signIn, signUp } from '../../utils/auth.ts';
import { authActions } from '../../store/slices/authSlice.ts';
import Input from '../../UI/Input';
import { useEffect, useRef, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';

const SignInForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.auth);
  const formRef = useRef<HTMLFormElement | null>(null);

  let isLogin = false;
  if (searchParams.get('mode')) {
    isLogin = searchParams.get('mode') === 'login';
  }

  // Store the current mode to detect changes
  const prevModeRef = useRef<boolean>(isLogin);

  // Clear form and error when component mounts, unmounts, or mode changes
  useEffect(() => {
    // Clear error when component mounts
    dispatch(authActions.clearError());
    const form = formRef.current;

    // Check if mode has changed (switching between login and signup)
    if (prevModeRef.current !== isLogin) {
      // Mode has changed, reset form and clear error
      if (form) {
        form.reset();
      }
      dispatch(authActions.clearError());

      // Update the previous mode reference
      prevModeRef.current = isLogin;
    }

    // Return cleanup function to run when component unmounts
    return () => {
      dispatch(authActions.clearError());
      if (form) {
        form.reset();
      }
    };
  }, [isLogin, dispatch, location.pathname]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authActions.setError(''));
    dispatch(authActions.setIsLoading(true));

    const data = new FormData(event.currentTarget);
    const authData = Object.fromEntries(data);

    const result = isLogin
      ? await signIn(authData.email as string, authData.password as string)
      : await signUp(authData.email as string, authData.password as string);

    const user = result?.user || null;
    const authError = result?.error || null;

    if (authError) {
      dispatch(authActions.setError(authError));
      dispatch(authActions.setIsLoading(false));
      return;
    }

    if (user) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: user.email,
          uid: user.uid,
        })
      );
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem('expiration', expiration.toISOString());
      dispatch(authActions.setIsLoading(false));
      dispatch(authActions.setError(''));
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-200">
            {isLogin ? 'Login' : 'Create an account'}
          </h2>
          <Link
            to="/home"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          {!isLogin && (
            <Input
              isTextArea={false}
              isLabel={false}
              id="username"
              name="username"
              placeholder="Username"
              type="text"
              required
            />
          )}
          <Input
            isTextArea={false}
            isLabel={false}
            id="email"
            name="email"
            placeholder="Email address"
            type="email"
            required
          />
          <Input
            isTextArea={false}
            isLabel={false}
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            required
            minLength={6}
          />
          <div className="flex items-center justify-between flex-wrap">
            <p className="text-white mt-4">
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
              <Link
                to={`/auth?mode=${isLogin ? 'signup' : 'login'}`}
                className="text-sm text-blue-500 hover:underline mt-4"
              >
                {isLogin ? 'Signup' : 'Login'}
              </Link>
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

import { LoginForm } from "../components/authComponents/LoginForm/LoginForm";
import { SignupForm } from "../components/authComponents/SignupForm/SignupForm";
import { useAuthForm } from "../hooks/useAuthForm";
export const Auth = () => {
  const { isLogin, isLoading, renderError, handleAuth } = useAuthForm();
  return (
    <div className="flex flex-col items-center justify-center h-screen dark bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
      {isLogin ? (
        <LoginForm
          onSubmit={handleAuth}
          renderError={renderError}
          isLoading={isLoading}
          isLogin={isLogin}
        />
      ) : (
        <SignupForm
          onSubmit={handleAuth}
          renderError={renderError}
          isLoading={isLoading}
          isLogin={isLogin}
        />
      )}
    </div>
  );
};

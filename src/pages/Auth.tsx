import { LoginForm } from "../components/authComponents/LoginForm";
import { SignupForm } from "../components/authComponents/SignupForm";
import { useAuthForm } from "../hooks/useAuthForm";
export const Auth = () => {
  const { isLogin, isLoading, renderError, handleAuth } = useAuthForm();
  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
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

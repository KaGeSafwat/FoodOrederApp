import { useSearchParams, useNavigate } from "react-router-dom";
import { signIn, signUp } from "../utils/auth";
import { authActions } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { AuthFormData } from "../types/auth";
import { useEffect, useCallback } from "react";
import { HiOutlineExclamation } from "react-icons/hi";

export const useAuthForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.auth);

  const isLogin = searchParams.get("mode") === "login";

  useEffect(() => {
    dispatch(authActions.setError(""));
  }, [isLogin, dispatch]);

  const handleAuth = async (formData: AuthFormData) => {
    dispatch(authActions.setError(""));
    dispatch(authActions.setIsLoading(true));

    const result = isLogin
      ? await signIn(formData.email, formData.password)
      : await signUp(formData.email, formData.password);

    // if (!result) return;

    if (result?.error) {
      dispatch(authActions.setError(result.error));
      dispatch(authActions.setIsLoading(false));
      return;
    }

    if (result?.user) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: result.user.email,
          uid: result.user.uid,
        })
      );
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());

      dispatch(authActions.setIsLoading(false));
      dispatch(authActions.setError(""));
      navigate("/dashboard");
    }
  };

  const renderError = useCallback(() => {
    if (!error) return null;

    return (
      <div className="bg-red-500/10 border border-red-500 text-red-300 px-4 py-3 rounded mb-4 flex items-center gap-2">
        <HiOutlineExclamation className="w-5 h-5" />
        {error}
      </div>
    );
  }, [error]);

  return {
    handleAuth,
    isLoading,
    isLogin,
    renderError,
  };
};

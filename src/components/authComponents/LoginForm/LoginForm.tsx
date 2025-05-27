import { Link } from "react-router-dom";
import type { AuthFormProps } from "../../../types/auth";
import { type FormEvent } from "react";
import { FormContent } from "../FormContent/FormContent";

export const LoginForm = ({
  onSubmit,
  renderError,
  isLoading,
  isLogin = true, // Default to true for LoginForm
}: AuthFormProps) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await onSubmit({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
  };

  return (
    <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-200">Login</h1>
        <Link
          to="/home"
          className="text-gray-400 hover:text-white transition-colors duration-200 underline"
        >
          ← Back to Home
        </Link>
      </div>
      {renderError && renderError()}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <FormContent isLoading={isLoading} isLogin={isLogin} />
      </form>
    </div>
  );
};

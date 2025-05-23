import { Link } from "react-router-dom";
import Input from "../../UI/Input";
import { Button } from "../../UI/Button";

export const FormContent = ({
  isLoading,
  isLogin,
}: {
  isLoading: boolean;
  isLogin: boolean;
}) => {
  return (
    <>
      {!isLogin && (
        <Input
          istextarea="false"
          islabel="false"
          id="username"
          name="username"
          placeholder="Username"
          type="text"
          required
        />
      )}
      <Input
        istextarea="false"
        islabel="false"
        id="email"
        name="email"
        placeholder="Email address"
        type="email"
        required
      />
      <Input
        istextarea="false"
        islabel="false"
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        required
        minLength={6}
      />
      <div className="flex items-center justify-between flex-wrap">
        <p className="text-white mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            to={isLogin ? "/auth?mode=signup" : "/auth?mode=login"}
            className="text-sm text-blue-500 hover:underline mt-4"
          >
            {isLogin ? "Signup" : "Login"}
          </Link>
        </p>
      </div>
      <Button
        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : isLogin ? "Login" : "Signup"}
      </Button>
    </>
  );
};

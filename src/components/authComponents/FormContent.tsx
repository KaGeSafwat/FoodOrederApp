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
          islabel="true"
          id="User Name"
          name="username"
          placeholder="AbdElrahman Safwat"
          type="text"
          required
        />
      )}
      <Input
        istextarea="false"
        islabel="true"
        id="Email Address"
        name="email"
        placeholder="example@gmail.com"
        type="email"
        required
      />
      <Input
        istextarea="false"
        islabel="true"
        id="Password"
        name="password"
        placeholder="************"
        type="password"
        required
        minLength={6}
      />
      <div className="flex items-center justify-between flex-wrap">
        <p className="text-white mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            to={isLogin ? "/auth?mode=signup" : "/auth?mode=login"}
            className="text-sm text-blue-300 underline mt-4"
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

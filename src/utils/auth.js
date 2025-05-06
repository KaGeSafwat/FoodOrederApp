import { redirect } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

// Sign up function using Firebase
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Sign in function with email and password using Firebase
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export function getAuthUser() {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }

  const expiration = getTokenDuration();
  if (expiration < 0) {
    return "expired";
  }

  return JSON.parse(user);
}

export function isAuthenticated() {
  const user = getAuthUser();

  if (!user) {
    return redirect("/auth?mode=login");
  }

  return null;
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("expiration");
  return redirect("/home");
}

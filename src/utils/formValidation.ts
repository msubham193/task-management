// src/utils/formValidation.ts
import toast from 'react-hot-toast';

export const validateSignIn = (email: string, password: string) => {
  if (!email || !password) {
    toast.error("Both email and password are required.");
    return false;
  }
  
  if (!/\S+@\S+\.\S+/.test(email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }
  
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return false;
  }

  return true;
};

export const validateSignUp = (firstname: string, lastname: string, email: string, password: string) => {
  if (!firstname || !lastname || !email || !password) {
    toast.error("All fields are required.");
    return false;
  }
  
  if (!/\S+@\S+\.\S+/.test(email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }
  
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return false;
  }

  return true;
};

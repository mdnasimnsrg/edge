import { Metadata } from "next";
import { SignInForm } from "./SignInForm";

export const metadata: Metadata = {
  title: "Login",
};
export default function LoginForm() {
  return <SignInForm />;
}

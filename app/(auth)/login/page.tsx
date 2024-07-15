import LoginForm from "../../../components/auth/login-form";

export default async function Login() {
  return (
    <div className="flex w-full flex-col gap-8">
      <LoginForm />
    </div>
  );
}

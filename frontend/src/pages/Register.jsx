import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormInvalid =
  !name.trim() ||
  !email.trim() ||
  !password.trim() ||
  !confirmPassword.trim() ||
  password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();


    setError("");

    const emailRegex = /\S+@\S+\.\S+/;

if (!emailRegex.test(email)) {
  setError("Please enter a valid email address");
  return;
}

if (password.length < 6) {
  setError("Password must be at least 6 characters long");
  return;
}

    if (!confirmPassword) {
  setError("Please confirm your password");
  return;
}

    if (password !== confirmPassword) {
  setError("Passwords do not match");
  return;
}

    setLoading(true);
    

    try {
      await register(
  name,
  email,
  password
);

navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create Account"
          subtitle="Start organizing your notes today"
        />

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-300">
              {error}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Full Name
            </label>

            <AuthInput
  type="text"
  placeholder="John Doe"
  value={name}
  required
  autoFocus
  autoComplete="name"
  onChange={(e) => {
    setName(e.target.value);
    if (error) setError("");
  }}
/>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Email
            </label>

            <AuthInput
  type="email"
  placeholder="you@example.com"
  value={email}
  required
  onChange={(e) => {
    setEmail(e.target.value);
    if (error) setError("");
  }}
/>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Password
            </label>

            <AuthInput
              type="password"
              placeholder="Create a password"
              value={password}
              required
              minLength={6}
              autoComplete="new-password"
             onChange={(e) => {
  setPassword(e.target.value);
  if (error) setError("");
}}

            />
            <p className="mt-1 text-xs text-white/50">
  Must be at least 6 characters
</p>
          </div>

          <div>
  <label className="mb-2 block text-sm font-medium text-white/80">
    Confirm Password
  </label>

  <AuthInput
    type="password"
    placeholder="Confirm your password"
    value={confirmPassword}
    required
    minLength={6}
    autoComplete="new-password"
    onChange={(e) => {
  setConfirmPassword(e.target.value);
  if (error) setError("");
}}
  />
</div>

{confirmPassword && (
  <p
    className={`text-sm ${
      password === confirmPassword
        ? "text-green-400"
        : "text-red-400"
    }`}
  >
    {password === confirmPassword
      ? "Passwords match"
      : "Passwords do not match"}
  </p>
)}

          <AuthButton
  type="submit"
  loading={loading}
  disabled={isFormInvalid}
  loadingText="Creating Account..."
>
  Create Account
</AuthButton>

          <p className="text-center text-sm text-white/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Sign In
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default Register;
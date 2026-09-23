import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import AuthContext from "../context/AuthContext";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();



  setError("");

  try {
    await login(email, password);
    navigate("/");
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
  
/>

        {error && (
  <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
    <p className="text-sm text-red-300">
      {error}
    </p>
  </div>
)}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
  Email
</label>
            
<AuthInput
  type="email"
  placeholder="you@example.com"
  autoComplete="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          </div>

          <div>
 <div className="mb-2 flex items-center justify-between">
  <label className="text-sm font-medium text-white/80">
    Password
  </label>

  <button
    type="button"
    className="text-sm text-indigo-400 transition hover:text-indigo-300"
  >
    Forgot Password?
  </button>
</div>
  
<AuthInput
  type="password"
  placeholder="Enter your password"
  autoComplete="current-password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
</div>
          <AuthButton
  type="submit"
  
>
  Sign In
</AuthButton>

  <p className="text-center text-sm text-white/60">
    Don't have an account?{" "}
    <Link
      to="/register"
      className="text-indigo-400 hover:text-indigo-300"
    >
      Create one
    </Link>
  </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;
import logo from "../../assets/logo.png";

export default function AuthHeader({
  title = "Sign In to Your Account",
  subtitle,
}) {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <img src={logo} alt="JotDown" className="mb-4 h-24 w-auto" />

      <h1 className="text-5xl font-semibold tracking-tight text-white">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-3 text-base text-white/60">{subtitle}</p>
      )}
    </div>
  );
}
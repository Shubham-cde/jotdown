export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4">

      {/* Left Glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]" />

      {/* Right Glow */}
      <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />

      {/* Background vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050816_80%)]" />

      {children}
    </div>
  );
}
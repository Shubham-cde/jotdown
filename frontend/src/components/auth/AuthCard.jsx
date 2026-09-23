export default function AuthCard({ children }) {
  return (
    <div
      className="
        relative z-10
        w-full
        max-w-[560px]
        rounded-[32px]
        border border-white/10
        bg-white/[0.04]
        px-12
        py-14
        backdrop-blur-2xl
        shadow-[0_0_60px_rgba(109,40,217,0.15)]
      "
    >
      {children}
    </div>
  );
}
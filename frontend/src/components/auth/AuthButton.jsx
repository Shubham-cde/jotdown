export default function AuthButton({
  children,
  type = "button",
  loading = false,
  loadingText = "Loading...",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading}
      {...props}
      className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-indigo-500 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? loadingText : children}
    </button>
  );
}
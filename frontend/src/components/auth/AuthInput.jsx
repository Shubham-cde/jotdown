export default function AuthInput(props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-indigo-400 focus:outline-none
focus:ring-2
focus:ring-indigo-400
focus:border-indigo-400 placeholder:text-white/40"
    />
  );
}
import logo from "../../assets/logo.png";

export default function AuthHeader() {
  return (
    <div className="mb-10 flex flex-col items-center text-center">

      <img
        src={logo}
        alt="JotDown"
        className="mb-4 h-24 w-auto"
      />

      <h1 className="text-5xl font-semibold tracking-tight text-white">
        Sign In to Your Account
      </h1>

    </div>
  );
}
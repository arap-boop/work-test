import React from "react";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-bl from-[#1F4247] to-[#0D1D23]">
      <div>
        <h1 className="text-center text-3xl font-bold text-white">
          Welcome to Our App
        </h1>
        <p className="pt-5 text-sm text-white">
          Already have an account? or you can sign up
        </p>
        <div className="flex justify-center gap-10 pt-5">
          <button
            onClick={() => router.push("/auth/login")}
            className="text-white underline focus:outline-none"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/auth/sign-up")}
            className="text-white underline focus:outline-none"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

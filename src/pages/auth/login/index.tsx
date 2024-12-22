import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import Content from "@/components/layouts/Content";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { validationSchema } from "@/pages/api/login";
import { LoginProps } from "@/types";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: { email: "", password: "", username: "" },
    onSubmit: async (values: LoginProps) => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (data.code !== 200) {
          data?.message?.message && toast.error(data.message.message);
          data?.error && toast.error(data.error);
        } else {
          return router.push("/welcome");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed!");
      }
    },
  });
  return (
    <>
      <div className="flex w-full flex-col p-8">
        <button
          onClick={() => router.push("/")}
          className="flex gap-2 text-white hover:text-white focus:outline-none"
        >
          <ChevronLeft size={27} />
          Back
        </button>
        <div className="ml-9 mt-24 justify-center">
          <h2 className="ml-3 text-3xl font-bold text-white">Login</h2>
          <form
            className="mt-5 flex flex-col gap-2"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <input
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                placeholder="Enter Username/Email"
                className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 text-white shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <input
                name="username"
                id="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                type="username"
                placeholder="Enter Username/Email"
                className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 text-white shadow-sm sm:text-sm"
              />
            </div>
            <div className="relative">
              <input
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 pr-10 text-white shadow-sm sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-[#F3EDA6]"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-[#62CDCB] to-[#4599DB] px-4 py-2 text-white"
              onClick={() => router.push("/profile")}
              // disabled={isSubmitting}
            >
              Login
              {/* {isSubmitting ? "Logging in..." : "Login"} */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
Login.getLayout = function getLayout(page: any) {
  return (
    <DashboardLayout>
      <Content>{page}</Content>
    </DashboardLayout>
  );
};

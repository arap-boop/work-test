import React from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import Content from "@/components/layouts/Content";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import useRegisterFormStore from "@/hooks/useRegister";

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState(false);
  const { email, username, setEmail, setUsername, password, setPassword } =
    useRegisterFormStore();

  React.useEffect(() => {
    fetch("http://techtest.youapp.ai/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          if (data) {
            router.push("/profile");
          } else {
            router.push("/login");
          }
        }
      })
      .catch((err) => {
        toast.error("Refresh token expired", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      username: username,
      email: email,
      password: "",
    },
    onSubmit: async (values) => {
      const body = {
        username,
        email,
        password: values.password,
      };

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(body),
        });

        const data = await response.json();
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Registration failed. Please try again.");
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
          <h2 className="ml-3 text-3xl font-bold text-white">Register</h2>
          <form
            className="mt-5 flex flex-col gap-2"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <input
                type="email"
                id="email"
                name="email"
                color={formik.errors.email ? "danger" : "primary"}
                placeholder="Enter your email"
                onChange={(e) => {
                  formik.handleChange(e);
                  setEmail(e.target.value);
                }}
                value={formik.values.email}
                className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 text-white shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <input
                type="username"
                id="username"
                name="username"
                color={formik.errors.username ? "danger" : "primary"}
                placeholder="Enter your username"
                onChange={(e) => {
                  formik.handleChange(e);
                  setUsername(e.target.value);
                }}
                value={formik.values.username}
                className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 text-white shadow-sm sm:text-sm"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                color={formik.errors.password ? "danger" : "primary"}
                placeholder="Enter your password"
                onChange={(e) => {
                  formik.handleChange(e);
                  setPassword(e.target.value);
                }}
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
            <div className="relative">
              <input
                name="confirmPassword"
                type={confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 pr-10 text-white shadow-sm sm:text-sm"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-[#F3EDA6]"
              >
                {confirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              className="mt-10 w-full rounded-md bg-gradient-to-r from-[#62CDCB] to-[#4599DB] px-4 py-2 text-white"
              type="submit"
              color="danger"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
Signup.getLayout = function getLayout(page: any) {
  return (
    <DashboardLayout>
      <Content>{page}</Content>
    </DashboardLayout>
  );
};

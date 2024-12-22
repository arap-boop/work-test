import { serialize } from "cookie";
import * as Yup from "yup";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const response = await fetch("https://techtest.youapp.ai/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    const accessToken = data.access_token;
    if (accessToken) {
      res.setHeader(
        "Set-Cookie",
        serialize("access_token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        }),
      );

      return res.status(200).json({ message: "Login successful", data });
    } else {
      return res
        .status(500)
        .json({ error: "Missing access token in response" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

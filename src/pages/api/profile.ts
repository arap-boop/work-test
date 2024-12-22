import { parse } from "cookie";

export default async function handler(req: any, res: any) {
  try {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const accessToken = cookies.access_token;

    const response = await fetch("http://techtest.youapp.ai/api/getProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": accessToken,
      },
    });
    const profileData = await response.json();

    res.status(200).json(profileData);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

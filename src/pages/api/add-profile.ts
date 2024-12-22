import { parse } from "cookie";

export default async function handler(req: any, res: any) {
  try {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const accessToken = cookies.access_token;

    const response = await fetch(
      "https://techtest.youapp.ai/api/createProfile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify(req.body),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Error from backend: ${response.status} ${response.statusText}`,
      );
    }

    const profileData = await response.json();

    res.status(200).json(profileData);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

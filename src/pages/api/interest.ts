import { parse } from "cookie";

export default async function handler(req: any, res: any) {
  try {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const accessToken = cookies.access_token;

    const { interests, birthday } = req.body;

    if (!interests || interests.length === 0) {
      return res.status(400).json({ message: "Interest field is required." });
    }

    const response = await fetch(
      "https://techtest.youapp.ai/api/updateProfile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
        body: JSON.stringify({
          interests,
          birthday,
        }),
      },
    );

    const backendResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error from backend: ${response.status} ${response.statusText}`,
      );
    }

    res.status(200).json(backendResponse);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

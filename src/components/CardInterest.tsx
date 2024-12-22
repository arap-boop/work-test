import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Profile } from "@/pages/profile";

export function CardInterest() {
  const [profile, setProfile] = React.useState<Profile | null>(null);

  React.useEffect(() => {
    fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const router = useRouter();

  const interests = profile?.interests || [];
  return (
    <Card className="ml-5 w-[350px] border-none bg-[#0E191F]">
      <CardHeader className="text-white">
        <div
          onClick={() => router.push("/interest")}
          className="flex justify-between"
        >
          <h1 className="text-xl font-bold">Interest</h1>
          <Image src="/edit.svg" alt="Edit" width={20} height={20} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-white">
          {interests.length > 0 ? (
            <div className="flex gap-3">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="flex gap-2 rounded-xl bg-[#FFFFFF0F] px-4 py-2"
                >
                  <p className="flex font-bold">{interest}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/50">
              <p>Add in your interest to find a better match</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

import * as React from "react";
import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useProfileStore } from "@/stores/data";

import About from "./containers/About";

export function CardAbout() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profileData, setProfileData] = React.useState<any>(null);

  const {
    gender,
    name,
    birthday,
    height,
    weight,
    image,
    horoscope,
    zodiac,
    setGender,
    setImage,
    setHoroscope,
    setName,
    setBirthday,
    setHeight,
    setWeight,
    setZodiac,
  } = useProfileStore();
  React.useEffect(() => {
    fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data, "DATA");

          setProfileData(data);
          setName(data.data.name || "");
          setBirthday(data.data.birthday || "");
          setHeight(data.data.height || 0);
          setWeight(data.data.weight || 0);
          setHoroscope(data.data.horoscope || "");
          setZodiac(data.data.zodiac || "");
        }
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  const handleSubmit = () => {
    // setName(name);
    fetch("/api/add-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        birthday,
        height: Number(height),
        weight: Number(weight),
        gender,
        interests: [],
        // image,
        // horoscope,
        // zodiac,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Profile successfully saved:", response);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving profile data:", error);
      });
  };

  const calculateAge = (birthday: string): number | null => {
    if (!birthday) return null;
    const birthYear = new Date(birthday).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  return (
    <Card className="ml-5 w-[350px] border-none bg-[#0E191F]">
      <CardHeader className="text-white">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">About</h1>
          {isEditing ? (
            <span
              onClick={() => {
                handleSubmit();
                setIsEditing(false);
              }}
              className="cursor-pointer bg-gradient-to-r from-[#F3EDA6] via-[#F8FAE5] to-[#FFE2BE] bg-clip-text text-transparent"
            >
              Save & Update
            </span>
          ) : (
            <Image
              onClick={() => setIsEditing(true)}
              src="/Edit.svg"
              alt="Edit"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <About onSubmit={handleSubmit} />
        ) : profileData ? (
          <div className="text-white">
            <div className="flex gap-2">
              <p className="text-white/30">Birthday:</p>
              {birthday || "N/A"}
              {birthday && <span>({calculateAge(birthday)} years old)</span>}
            </div>
            <div className="flex gap-2">
              <p className="text-white/30">Horoscope:</p>
              {horoscope || "N/A"}
            </div>
            <div className="flex gap-2">
              <p className="text-white/30">Zodiac:</p>
              {zodiac || "N/A"}
            </div>

            <div className="flex gap-2">
              <p className="text-white/30">Height:</p>
              {height || "N/A"} cm
            </div>
            <div className="flex gap-2">
              <p className="text-white/30">Weight:</p>
              {weight || "N/A"} kg
            </div>
          </div>
        ) : (
          <div className="text-white/50">
            Add in your information to help others know you better
          </div>
        )}
      </CardContent>
    </Card>
  );
}

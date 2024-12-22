import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";

import { CardAbout } from "@/components/CardAbout";
import { CardInterest } from "@/components/CardInterest";
import { chineseZodiacSigns, zodiacSigns } from "@/data/zodiac";
import { useProfileStore } from "@/stores/data";

export interface Profile {
  name: string;
  profilePicture: string;
  birthday: string;
  height: number;
  weight: number;
  interests: string[];
  about: string;
  gender: string;
  horoscope: string;
  zodiac: string;
  zodiacImage: string;
  signImage: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const zodiacs = zodiacSigns.find((z) => z.name === profile?.horoscope);
  const sign = chineseZodiacSigns.find((z) => z.name === profile?.zodiac);
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
        setProfile(data.data);
        setGender(data.data.gender);
        setName(data.data.name);
        setBirthday(data.data.birthday);
        setHeight(data.data.height);
        setWeight(data.data.weight);
        setImage(data.data.profilePicture);
        setHoroscope(data.data.horoscope);
        setZodiac(data.data.zodiac);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);
  const calculateAge = (birthday: string): number | null => {
    if (!birthday) return null;
    const birthYear = new Date(birthday).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  if (!profile) {
    return (
      <div className="min-w-screen flex min-h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-w-screen min-h-screen bg-[#09141A] md:px-8">
      <div className="flex items-center gap-24 py-4 text-white md:justify-start md:gap-12">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 focus:outline-none"
        >
          <ChevronLeft size={24} />
          <span className="md:inline">Back</span>
        </button>
        <p className="flex text-sm md:text-base">@ {name}</p>
      </div>

      <div className="w-full text-white">
        <div className="w-full text-white">
          <div className="relative mx-auto h-40 w-[23rem] md:h-52 md:w-52">
            <Image
              src={image || "https://github.com/shadcn.png"}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="h-full rounded-lg object-cover"
            />
            <div className="absolute bottom-2 left-2 rounded px-2 py-1 text-lg md:text-base">
              @{name || "Unknown"},
              {profile?.birthday && (
                <span className="ml-1">{calculateAge(profile?.birthday)}</span>
              )}
              <div>{gender || profile?.gender}</div>
              <div className="flex w-full gap-4">
                <h1 className="flex items-center gap-2 rounded-lg bg-[#FFFFFF0F]/5 px-3 py-1 backdrop-blur-lg">
                  {zodiacs?.zodiacImage ? (
                    <Image
                      src={zodiacs.zodiacImage}
                      alt={`${profile.horoscope} Sign`}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                  {profile.horoscope}
                </h1>
                <p className="flex items-center gap-2 rounded-lg bg-[#FFFFFF0F]/5 px-3 py-1 backdrop-blur-lg">
                  {sign?.signImage ? (
                    <Image
                      src={sign.signImage}
                      alt={`${profile.zodiac} Sign`}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                  {profile?.zodiac}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:gap-6">
        <CardAbout />
        <CardInterest />
      </div>
    </div>
  );
};

export default ProfilePage;

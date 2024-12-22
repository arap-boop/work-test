import React, { useRef } from "react";
import Image from "next/image";

import { detectChineseZodiac, detectHoroscope } from "@/data/zodiac";
import { useProfileStore } from "@/stores/data";

interface AboutProps {
  onSubmit: (data: any) => void;
}

const About: React.FC<AboutProps> = ({ onSubmit }) => {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFormSubmit = () => {
    const profileData = {
      birthday,
      horoscope,
      zodiac,
      gender,
      image: previewImage,
    };

    onSubmit(profileData);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBirthdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBirthday(value);

    if (value) {
      const horoscopeSign = detectHoroscope(value);
      const zodiacSign = detectChineseZodiac(value);

      setHoroscope(horoscopeSign);
      setZodiac(zodiacSign);
    } else {
      setHoroscope("--");
      setZodiac("--");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-5">
        <div
          onClick={handleImageClick}
          className="flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-xl bg-white/10"
        >
          {image ? (
            <Image
              src={image}
              alt="Preview"
              width={50}
              height={50}
              className="h-[3rem] w-[3rem] rounded-xl object-cover"
            />
          ) : (
            <Image
              src={"/Plus.svg"}
              alt="Add Image"
              width={50}
              height={50}
              className="w-[1rem]"
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileImageChange}
            style={{ display: "none" }}
          />
        </div>
        <p className="flex items-center text-center text-white">Add Image</p>
      </div>
      <div className="ml-1 mt-10 flex flex-col gap-y-6 text-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
          className="space-y-6"
        >
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium">Display Name:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter Display Name"
              className="w-full rounded-lg border border-[#D9D9D90F] bg-white/10 px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-lg border border-[#D9D9D90F] bg-white/10 px-3 py-2 text-white/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option className="bg-white/10" value="" disabled selected>
                Select Gender
              </option>
              <option className="bg-white/10" value="male">
                Male
              </option>
              <option className="bg-white/10" value="female">
                Female
              </option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium">Birthday:</label>
            <input
              type="date"
              value={birthday}
              onChange={handleBirthdayChange}
              className="w-full rounded-lg border border-[#D9D9D90F] bg-white/10 px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium">Horoscope:</label>
            <input
              type="text"
              value={horoscope}
              readOnly
              placeholder="--"
              className="w-full rounded-lg border border-[#D9D9D90F] bg-white/10 px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium">Zodiac:</label>
            <input
              type="text"
              value={zodiac}
              readOnly
              placeholder="--"
              className="w-full rounded-lg border border-[#D9D9D90F] bg-white/10 px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium">Height:</label>
            <input
              type="number"
              value={height.toString()}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setHeight(value === "" ? 0 : parseInt(value, 10));
                }
              }}
              placeholder="Enter Height"
              className="w-full rounded-lg border border-[#D9D9D90F] bg-white/10 px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-sm font-medium">Weight:</label>
            <input
              type="number"
              value={weight.toString()}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setWeight(value === "" ? 0 : parseInt(value, 10)); // Convert to number or set to 0 if empty
                }
              }}
              placeholder="Enter Weight"
              className="w-full rounded-lg border border-[#D9D9D90F] bg-white/10 px-3 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default About;

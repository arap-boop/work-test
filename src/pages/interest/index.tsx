import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";

import { useProfileStore } from "@/stores/data";

import { Profile } from "../profile";

const Interest = () => {
  const [tags, setTags] = React.useState<string[]>([]);
  const router = useRouter();
  const inputRef = React.useRef<HTMLDivElement>(null);
  const { birthday, setInterests, setHoroscope } = useProfileStore();

  React.useEffect(() => {
    if (tags.length > 0) {
      setInterests(tags);
    }
  }, [tags, setInterests]);
  const handleSubmit = () => {
    if (tags.length === 0) {
      console.log("Please select at least one interest.");
      return;
    }

    setInterests(tags);

    fetch("/api/interest", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interests: tags,
        birthday,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Profile successfully saved:", response);
        if (response.horoscope) {
          setHoroscope(response.horoscope);
        }
      })
      .catch((error) => {
        console.error("Error saving profile data:", error);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();

      const text = inputRef.current?.innerText.trim();
      if (text) {
        setTags((prev) => [...prev, text]);
        if (inputRef.current) inputRef.current.innerText = "";
      }
    } else if (e.key === "Backspace" && !inputRef.current?.innerText.trim()) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen w-screen flex-col bg-gradient-to-bl from-[#1F4247] to-[#0D1D23] p-4">
      <div className="flex w-full justify-between p-3">
        <button
          onClick={() => router.push("/profile")}
          className="flex gap-2 text-white hover:text-white focus:outline-none"
        >
          <ChevronLeft size={27} />
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex bg-gradient-to-r from-[#ABFFFD] via-[#4599DB] to-[#AADAFF] bg-clip-text text-transparent"
        >
          Save
        </button>
      </div>
      <div className="mt-28 flex flex-col p-10">
        <h1 className="bg-gradient-to-r from-[#F3EDA6] via-[#F8FAE5] to-[#FFE2BE] bg-clip-text text-xl text-transparent">
          Tell everyone about yourself
        </h1>
        <p className="text-3xl font-bold text-white">What interests you?</p>

        <div className="relative mt-5 w-full rounded-lg border-none bg-[#D9D9D90F]/10 p-2 text-sm text-white">
          <div className="flex flex-wrap gap-2" style={{ minHeight: "40px" }}>
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center rounded-lg bg-white/10 px-3 py-1 text-center text-sm font-bold text-white"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2 focus:outline-none"
                >
                  <X size={20} />
                </button>
              </div>
            ))}

            <div
              ref={inputRef}
              className="inline-block min-w-[50px] flex-1 cursor-text text-white outline-none"
              contentEditable
              role="textbox"
              aria-multiline="true"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interest;

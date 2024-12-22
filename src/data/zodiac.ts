export const zodiacSigns = [
  {
    name: "Capricorn",
    start: "01-01",
    end: "01-19",
    zodiacImage: "/zodiac/capricorn.png",
  },
  {
    name: "Aquarius",
    start: "01-20",
    end: "02-18",
    zodiacImage: "/zodiac/aquarius.jpg",
  },
  {
    name: "Pisces",
    start: "02-19",
    end: "03-20",
    zodiacImage: "/zodiac/piscess.png",
  },
  {
    name: "Aries",
    start: "03-21",
    end: "04-19",
    zodiacImage: "/zodiac/aries.png",
  },
  {
    name: "Taurus",
    start: "04-20",
    end: "05-20",
    zodiacImage: "/zodiac/taurus.png",
  },
  {
    name: "Gemini",
    start: "05-21",
    end: "06-20",
    zodiacImage: "/zodiac/gemini.png",
  },
  {
    name: "Cancer",
    start: "06-21",
    end: "07-22",
    zodiacImage: "/zodiac/cancer.jpg",
  },
  {
    name: "Leo",
    start: "07-23",
    end: "08-22",
    zodiacImage: "/zodiac/leo.png",
  },
  {
    name: "Virgo",
    start: "08-23",
    end: "09-22",
    zodiacImage: "/zodiac/virgo.png",
  },
  {
    name: "Libra",
    start: "09-23",
    end: "10-22",
    zodiacImage: "/zodiac/libra.png",
  },
  {
    name: "Scorpio",
    start: "10-23",
    end: "11-21",
    zodiacImage: "/zodiac/scorpio.png",
  },
  {
    name: "Sagittarius",
    start: "11-22",
    end: "12-21",
    zodiacImage: "/zodiac/sagittarius.png",
  },
];

export const chineseZodiacSigns = [
  { name: "Rat", signImage: "/chineseSign/rat.jpg" },
  { name: "Ox", signImage: "/chineseSign/ox.png" },
  { name: "Tiger", signImage: "/chineseSign/tiger.jpg" },
  { name: "Rabbit", signImage: "/chineseSign/rabbit.jpg" },
  { name: "Dragon", signImage: "/chineseSign/dragon.jpg" },
  { name: "Snake", signImage: "/chineseSign/snake.png" },
  { name: "Horse", signImage: "/chineseSign/horse.jpg" },
  { name: "Goat", signImage: "/chineseSign/goat.jpg" },
  { name: "Monkey", signImage: "/chineseSign/monkey.jpg" },
  { name: "Rooster", signImage: "/chineseSign/rooster.jpg" },
  { name: "Dog", signImage: "/chineseSign/dog.jpg" },
  { name: "Pig", signImage: "/chineseSign/pig.jpg" },
];

export function detectHoroscope(date: string): string {
  const inputDate = new Date(date);
  const month = inputDate.getMonth() + 1;
  const day = inputDate.getDate();
  const formattedDate = `${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  for (const zodiac of zodiacSigns) {
    if (formattedDate >= zodiac.start && formattedDate <= zodiac.end) {
      return zodiac.name;
    }
  }

  return "Unknown";
}

export function detectChineseZodiac(date: string): string {
  const inputDate = new Date(date);
  const year = inputDate.getFullYear();
  const zodiacIndex = (year - 4) % 12;
  return chineseZodiacSigns[zodiacIndex].name;
}

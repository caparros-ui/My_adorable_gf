import { Chapter, LoveNote, MemoryStat } from '../types/story';

export const DEFAULT_CHAPTERS: Chapter[] = [
  {
    id: 1,
    number: "CHAPTER 01",
    title: "The First Spark",
    subtitle: "When two worlds collided in a single instant",
    date: "The Day It All Began",
    location: "Cozy Corner Cafe",
    image: "",
    fallbackImage: "",
    quote: "I looked into your eyes and suddenly found the piece of my heart I didn't know was missing.",
    story: [
      "It started like any ordinary day, but turned into the beginning of my favorite life story.",
      "The warm lights of the cafe, the soft chatter in the background, and the moment you walked in—everything else seemed to blur away.",
      "We talked for hours without noticing how fast time was flying, laughing at silly little things as if we had known each other forever."
    ],
    highlights: ["First Smile", "3-Hour Conversation", "Unforgettable Warmth"],
    tag: "Firsts",
    accentColor: "from-pink-500 to-purple-600"
  },
  {
    id: 2,
    number: "CHAPTER 02",
    title: "Late Night Whispers",
    subtitle: "Losing track of time beneath fairy lights and moonbeams",
    date: "Midnight Conversations",
    location: "Under Starlit Skies",
    image: "",
    fallbackImage: "",
    quote: "In the quiet hours of the night, your voice became my favorite melody.",
    story: [
      "Countless nights spent talking until 3 AM, sharing secrets, dreams, and quiet thoughts we'd never told anyone else.",
      "Even when the rest of the world was fast asleep, our little universe was glowing with laughter, soft whispers, and endless warmth.",
      "I realized then that falling for you wasn't a single moment—it was a feeling that grew deeper with every passing second."
    ],
    highlights: ["3 AM Phone Calls", "Shared Secrets", "Infinite Laughter"],
    tag: "Cozy",
    accentColor: "from-purple-600 to-fuchsia-500"
  },
  {
    id: 3,
    number: "CHAPTER 03",
    title: "Rainy Day Magic",
    subtitle: "Finding sunshine in the middle of a downpour",
    date: "A Cozy Afternoon",
    location: "Rain-Swept Streets",
    image: "",
    fallbackImage: "",
    quote: "With you, even the grayest skies look like a masterpiece of warm pinks and purples.",
    story: [
      "Remember when it suddenly started pouring rain and we only had one small umbrella?",
      "Instead of running for cover, we just walked slowly, holding hands, splashing through puddles, and laughing until our cheeks hurt.",
      "You smiled with drops of rain on your face, and I knew right there that I wanted to walk through every storm with you."
    ],
    highlights: ["Shared Umbrella", "Raindrops & Smiles", "Unplanned Joy"],
    tag: "Cozy",
    accentColor: "from-fuchsia-500 to-pink-500"
  },
  {
    id: 4,
    number: "CHAPTER 04",
    title: "Our First Road Trip",
    subtitle: "Chasing horizons and singing our favorite songs on repeat",
    date: "Weekend Getaway",
    location: "The Open Highway",
    image: "",
    fallbackImage: "",
    quote: "It didn't matter where the road led, as long as your hand was in mine.",
    story: [
      "Windows rolled down, wind in our hair, and our favorite playlist blasting through the speakers.",
      "We took wrong turns on purpose just to see where the road would take us, stopping at scenic lookouts to watch golden hour set over purple clouds.",
      "Every mile traveled with you felt like unlocking a brand new core memory."
    ],
    highlights: ["Sunset Views", "Roadtrip Playlist", "Hand in Hand"],
    tag: "Adventures",
    accentColor: "from-pink-600 to-violet-600"
  },
  {
    id: 5,
    number: "CHAPTER 05",
    title: "Whispering Stars",
    subtitle: "Counting constellations and making silent promises",
    date: "A Clear Night Away",
    location: "Mountain Viewpoint",
    image: "",
    fallbackImage: "",
    quote: "Out of billions of stars in the galaxy, you shine the brightest in my universe.",
    story: [
      "Wrapped together in a thick blanket on top of a hill, staring up at thousands of shimmering stars.",
      "The night air was crisp, but being close to you made everything feel perfectly warm.",
      "When a shooting star streaked across the dark sky, I didn't even have to make a wish—because everything I ever wanted was right beside me."
    ],
    highlights: ["Shooting Star", "Cozy Blanket", "Deep Serenity"],
    tag: "Adventures",
    accentColor: "from-purple-700 to-pink-500"
  },
  {
    id: 6,
    number: "CHAPTER 06",
    title: "Kitchen Disasters & Endless Laughs",
    subtitle: "Turning flour covered countertops into pure happiness",
    date: "Sunday Afternoon",
    location: "Our Kitchen",
    image: "",
    fallbackImage: "",
    quote: "Love isn't perfect, but cooking with you is the sweetest chaos in the world.",
    story: [
      "We decided to bake a gourmet dish from scratch, but ended up getting flour all over our shirts and smoke in the kitchen!",
      "Instead of being stressed, we ended up ordering pizza and eating on the floor while laughing hysterically.",
      "It taught me that even simple, messy moments become unforgettable when I get to spend them with you."
    ],
    highlights: ["Flour Fight", "Floor Picnic", "Silly Moments"],
    tag: "Cozy",
    accentColor: "from-pink-500 to-purple-500"
  },
  {
    id: 7,
    number: "CHAPTER 07",
    title: "Ocean Sunset Promenade",
    subtitle: "Barefoot steps along glowing purple waves",
    date: "Golden Hour Escape",
    location: "Sunset Beach",
    image: "",
    fallbackImage: "",
    quote: "Like the ocean meets the shore, my love for you is constant and boundless.",
    story: [
      "The sky painted itself in vibrant hues of magenta, violet, and deep rose gold as the sun slowly dipped below the horizon.",
      "We walked along the wet shoreline, feeling the cool water lap at our ankles while listening to the rhythm of the waves.",
      "You leaned against my shoulder, and for a moment, time completely stood still."
    ],
    highlights: ["Sunset Horizon", "Waves & Footprints", "Pure Peace"],
    tag: "Milestones",
    accentColor: "from-fuchsia-600 to-purple-700"
  },
  {
    id: 8,
    number: "CHAPTER 08",
    title: "Autumn Park Walk",
    subtitle: "Crisp air, golden leaves, and warm coffee in hand",
    date: "Seasonal Magic",
    location: "Central Gardens",
    image: "",
    fallbackImage: "",
    quote: "Every season with you is my new favorite time of the year.",
    story: [
      "Golden amber leaves falling like confetti around us as we strolled down the tree-lined path.",
      "Holding warm cups of spiced latte, wearing oversized cozy sweaters, and sharing dreams for our future.",
      "With every turn of the season, my affection for you only grows deeper and sweeter."
    ],
    highlights: ["Falling Leaves", "Hot Latte", "Warm Sweaters"],
    tag: "Cozy",
    accentColor: "from-purple-500 to-pink-600"
  },
  {
    id: 9,
    number: "CHAPTER 09",
    title: "The Rooftop Surprise",
    subtitle: "A candlelit dinner high above city lights",
    date: "Special Anniversary",
    location: "Skyline Terrace",
    image: "",
    fallbackImage: "",
    quote: "Surrounded by a million city lights, you were the only light I saw.",
    story: [
      "A hidden rooftop decorated with string lights, glowing candles, and your favorite flowers waiting under the evening sky.",
      "The sparkle of joy in your eyes when you realized this entire night was created just for you.",
      "We danced slowly under the stars to our special song, making memories that will shine forever."
    ],
    highlights: ["Candlelight Dinner", "Rooftop View", "Slow Dance"],
    tag: "Milestones",
    accentColor: "from-pink-600 to-fuchsia-600"
  },
  {
    id: 10,
    number: "CHAPTER 10",
    title: "To Forever & Beyond",
    subtitle: "Promising every sunrise and every tomorrow to you",
    date: "Our Unwritten Future",
    location: "Everywhere With You",
    image: "",
    fallbackImage: "",
    quote: "This isn't the end of our story—it's just the beginning of our infinite journey together.",
    story: [
      "Looking back at how far we've come, through every laugh, every adventure, every tear, and every victory.",
      "You aren't just my partner; you are my safe haven, my best friend, my greatest adventure, and my home.",
      "Here's to writing ten thousand more chapters together, holding your hand forever."
    ],
    highlights: ["Infinite Love", "Forever Promise", "Our Future"],
    tag: "Forever",
    accentColor: "from-fuchsia-500 via-pink-500 to-purple-600"
  }
];

export const INITIAL_LOVE_NOTES: LoveNote[] = [
  {
    id: "note-1",
    text: "You make my world brighter just by being yourself.",
    author: "Your Favorite Person",
    date: "Everyday"
  },
  {
    id: "note-2",
    text: "If I had a flower for every time I thought of you, I could walk through my garden forever.",
    author: "Me",
    date: "Always"
  },
  {
    id: "note-3",
    text: "Thank you for being my safe space, my biggest supporter, and my best friend.",
    author: "With All My Love",
    date: "Forever"
  },
  {
    id: "note-4",
    text: "My favorite spot in the whole wide world is right next to you.",
    author: "Yours Always",
    date: "Today & Everyday"
  },
  {
    id: "note-5",
    text: "No matter how long we've been together, my heart still skips a beat whenever you smile at me.",
    author: "Me",
    date: "Timeless"
  }
];

export const MEMORY_STATS: MemoryStat[] = [
  {
    label: "Days Together",
    value: "1,248+",
    iconName: "Calendar",
    description: "And counting every beautiful sunrise with you"
  },
  {
    label: "Coffee Cups Shared",
    value: "450+",
    iconName: "Coffee",
    description: "Warm mornings & cozy conversations"
  },
  {
    label: "Adventures & Roadtrips",
    value: "32",
    iconName: "Compass",
    description: "New places, endless smiles & core memories"
  },
  {
    label: "Infinite Smiles",
    value: "∞",
    iconName: "Heart",
    description: "Because loving you is the easiest thing in the world"
  }
];

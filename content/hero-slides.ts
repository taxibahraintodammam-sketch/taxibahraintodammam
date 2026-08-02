/**
 * Home hero background slider — 5 slides that rotate behind the booking hero.
 * `image: null` means the photo hasn't been generated/sourced yet; the
 * slider renders a branded gradient placeholder for that slide until a real
 * file is dropped at the given path. The prompts below are what generated
 * the two images that already exist under public/hero/, kept here so the
 * remaining three can be produced with the same brief.
 */

export type HeroSlide = {
  id: string;
  image: string | null;
  title: string;
  alt: string;
  /** AI image-generation prompt used (or to use) for this slide's photo. */
  prompt: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "causeway",
    image: "/hero/slide-causeway.webp",
    title: "King Fahd Causeway, Every Day",
    alt: "Sedan crossing the King Fahd Causeway between Bahrain and Saudi Arabia at golden hour",
    prompt:
      "A black premium sedan crossing a long causeway bridge over calm turquoise Gulf sea water, connecting two coastlines, shot from a low aerial drone angle at golden hour sunset, clear sky, minimal traffic, wide cinematic composition, photorealistic",
  },
  {
    id: "skyline",
    image: null,
    title: "Manama to Dammam, Door-to-Door",
    alt: "Manama coastal skyline at dusk with a highway leading toward the causeway",
    prompt:
      "Aerial dusk skyline of a modern Gulf coastal city with tall glass skyscrapers along a waterfront corniche, city lights beginning to glow, a highway curving along the water in the foreground, deep blue evening sky, photorealistic wide shot",
  },
  {
    id: "chauffeur",
    image: "/hero/slide-chauffeur.webp",
    title: "Licensed Drivers, Fixed Fares",
    alt: "Chauffeur loading luggage into a premium SUV outside a hotel entrance",
    prompt:
      "A chauffeur in a formal dark suit standing beside a black premium SUV, opening the rear passenger door, loading a suitcase into the trunk outside a modern hotel entrance in the evening, warm exterior lighting, photorealistic medium shot",
  },
  {
    id: "interior",
    image: null,
    title: "Sedans, SUVs & Vans",
    alt: "Premium SUV cabin interior with a navigation route on a mounted phone",
    prompt:
      "Interior of a clean modern luxury SUV back seat, leather upholstery, soft ambient cabin lighting, a smartphone mounted on the dashboard showing a navigation map route, shallow depth of field, photorealistic close shot",
  },
  {
    id: "whatsapp",
    image: null,
    title: "Book on WhatsApp, 24/7",
    alt: "Booking a taxi ride confirmed over a WhatsApp chat, car interior at night in the background",
    prompt:
      "Close-up of a hand holding a smartphone displaying a WhatsApp-style chat conversation confirming a taxi ride booking, softly blurred background of a car interior at night with warm dashboard lights, photorealistic macro shot",
  },
];

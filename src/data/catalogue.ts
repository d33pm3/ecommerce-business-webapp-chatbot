import R1001 from "@/assets/R1001.svg";
import R1002 from "@/assets/R1002.svg";
import N2001 from "@/assets/N2001.svg";
import N2002 from "@/assets/N2002.svg";
import E3001 from "@/assets/E3001.svg";
import E3002 from "@/assets/E3002.svg";
import B4001 from "@/assets/B4001.svg";
import B4002 from "@/assets/B4002.svg";
import P5001 from "@/assets/P5001.svg";
import P5002 from "@/assets/P5002.svg";

export type Stock = "Available" | "Out of Stock";

export interface Product {
  id: string;
  name: string;
  category: "Ring" | "Necklace" | "Earrings" | "Bracelet" | "Pendant";
  material: string;
  weight: string;
  price: number;
  stock: Stock;
  image: string;
}

export const CATALOGUE: Product[] = [
  {
    id: "R1001",
    name: "Aurora Halo Ring",
    category: "Ring",
    material: "18K Gold-tone + Synthetic Stone",
    weight: "4.6 g",
    price: 68000,
    stock: "Available",
    image: R1001,
  },
  {
    id: "R1002",
    name: "Garnet Solitaire Ring",
    category: "Ring",
    material: "22K Gold-tone + Synthetic Garnet",
    weight: "5.0 g",
    price: 74500,
    stock: "Out of Stock",
    image: R1002,
  },
  {
    id: "N2001",
    name: "Pearl-Style Necklace",
    category: "Necklace",
    material: "18K Gold-tone + Imitation Pearl",
    weight: "24.0 g",
    price: 112000,
    stock: "Available",
    image: N2001,
  },
  {
    id: "N2002",
    name: "Verdant Choker",
    category: "Necklace",
    material: "22K Gold-tone + Synthetic Stone",
    weight: "30.5 g",
    price: 158000,
    stock: "Available",
    image: N2002,
  },
  {
    id: "E3001",
    name: "Minimal Drop Earrings",
    category: "Earrings",
    material: "22K Gold-tone",
    weight: "6.8 g",
    price: 42000,
    stock: "Available",
    image: E3001,
  },
  {
    id: "E3002",
    name: "Crystal Stud Earrings",
    category: "Earrings",
    material: "18K Gold-tone + Synthetic Stone",
    weight: "5.8 g",
    price: 59000,
    stock: "Available",
    image: E3002,
  },
  {
    id: "B4001",
    name: "Classic Link Bracelet",
    category: "Bracelet",
    material: "22K Gold-tone",
    weight: "11.2 g",
    price: 71000,
    stock: "Available",
    image: B4001,
  },
  {
    id: "B4002",
    name: "Green Stone Cuff",
    category: "Bracelet",
    material: "18K Gold-tone + Synthetic Stone",
    weight: "14.6 g",
    price: 88000,
    stock: "Out of Stock",
    image: B4002,
  },
  {
    id: "P5001",
    name: "Botanical Pendant",
    category: "Pendant",
    material: "18K Gold-tone + Synthetic Stone",
    weight: "7.2 g",
    price: 46000,
    stock: "Available",
    image: P5001,
  },
  {
    id: "P5002",
    name: "Geometric Pendant",
    category: "Pendant",
    material: "22K Gold-tone",
    weight: "6.0 g",
    price: 39000,
    stock: "Available",
    image: P5002,
  },
];

export const CATEGORIES = ["Ring", "Necklace", "Earrings", "Bracelet", "Pendant"] as const;

export const byId = (id: string) => CATALOGUE.find((p) => p.id === id);

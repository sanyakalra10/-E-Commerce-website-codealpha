// backend/products.js

const products = [
  {
    id: 1,
    name: "OnePlus 12R 5G (8GB/128GB)",
    price: 33999, // OnePlus 12R starting price India
    image: "oneplus12r.jpg",
    description:
      "OnePlus 12R 5G with Snapdragon 8 Gen 2, 8GB RAM, 128GB storage and 120Hz AMOLED display. Perfect for gaming and heavy multitasking."
  },
  {
    id: 2,
    name: "Redmi Note 13 Pro 5G (8GB/128GB)",
    price: 17999, // Redmi Note 13 Pro 5G approx base price
    image: "redminote13pro.jpg",
    description:
      "Redmi Note 13 Pro 5G with 200MP camera, 1.5K AMOLED display and 5000mAh battery with fast charging."
  },
  {
    id: 3,
    name: "boAt Airdopes 141",
    price: 1299, // boAt Airdopes 141 typical sale price
    image: "boatairdopes141.jpg",
    description:
      "boAt Airdopes 141 true wireless earbuds with ENx noise cancellation, up to 42 hours playback and ASAP fast charge."
  },
  {
    id: 4,
    name: "HP Pavilion 14 Laptop (i5, 16GB/512GB)",
    price: 57990, // HP Pavilion 14 i5 range
    image: "hppavilion14.jpg",
    description:
      "HP Pavilion 14 with Intel Core i5, 16GB RAM, 512GB SSD and 14\" FHD display. Great for students and professionals."
  },
  {
    id: 5,
    name: "Noise ColorFit Smartwatch",
    price: 2499, // ColorFit series average price
    image: "noisecolorfit.jpg",
    description:
      "Noise ColorFit smartwatch with AMOLED display, SpO2 monitor, heart-rate tracking and multiple sports modes."
  },

  // ===== New 7 products =====

  {
    id: 6,
    name: "OnePlus Nord CE4 5G (8GB/128GB)",
    price: 24999,
    image: "oneplusnordce4.jpg",
    description:
      "OnePlus Nord CE4 5G with Snapdragon 7 Gen 3, 8GB RAM, 128GB storage and 100W SUPERVOOC fast charging."
  },
  {
    id: 7,
    name: "Redmi Buds 5 ANC",
    price: 2999,
    image: "redmibuds5.jpg",
    description:
      "Redmi Buds 5 with Active Noise Cancellation, dual-mic ENC and up to 38 hours total playback."
  },
  {
    id: 8,
    name: "boAt Airdopes 161",
    price: 1099,
    image: "boatairdopes161.jpg",
    description:
      "boAt Airdopes 161 with ASAP fast charge, 40 hours playback and IPX5 water resistance."
  },
  {
    id: 9,
    name: "HP Pavilion Gaming 15 (Ryzen 5/GTX 1650)",
    price: 69990,
    image: "hppaviliongaming15.jpg",
    description:
      "HP Pavilion Gaming 15 with AMD Ryzen 5, 8GB RAM, 512GB SSD and NVIDIA GTX 1650 for smooth gaming."
  },
  {
    id: 10,
    name: "Noise ColorFit Pro 5",
    price: 3499,
    image: "noisecolorfitpro5.jpg",
    description:
      "Noise ColorFit Pro 5 AMOLED smartwatch with BT calling, Always‑On display and 100+ sports modes."
  },
  {
    id: 11,
    name: "OnePlus Bullets Wireless Z2",
    price: 1999,
    image: "oneplusbulletsz2.jpg",
    description:
      "OnePlus Bullets Wireless Z2 neckband with fast charging and deep bass for daily music and calls."
  },
  {
    id: 12,
    name: "Redmi Power Bank 20000mAh",
    price: 1899,
    image: "redmipowerbank20000.jpg",
    description:
      "Redmi 20000mAh power bank with dual input, dual output and 18W fast charging support."
  }
];

module.exports = products;
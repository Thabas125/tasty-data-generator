
import { FoodItem } from "./types";

// Sample data for initial dataset
export const sampleFoodData: FoodItem[] = [
  {
    id: "1",
    name: "Apple",
    category: "Fruit",
    servingSize: "1 medium (182g)",
    calories: 95,
    protein: 0.5,
    fat: 0.3,
    carbohydrates: 25,
    fiber: 4.4,
    sugar: 19,
    sodium: 2,
    potassium: 195,
    calcium: 11,
    iron: 0.2,
    vitaminA: 98,
    vitaminC: 8.4,
    vitaminD: 0,
    preparationMethod: "Raw",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
  },
  {
    id: "2",
    name: "Chicken Breast",
    category: "Meat",
    servingSize: "100g",
    calories: 165,
    protein: 31,
    fat: 3.6,
    carbohydrates: 0,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    potassium: 256,
    calcium: 15,
    iron: 1.1,
    vitaminA: 20,
    vitaminC: 0,
    vitaminD: 5,
    preparationMethod: "Grilled",
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
  },
  {
    id: "3",
    name: "Whole Milk",
    category: "Dairy",
    servingSize: "1 cup (240ml)",
    calories: 146,
    protein: 7.7,
    fat: 7.9,
    carbohydrates: 11.7,
    fiber: 0,
    sugar: 11.7,
    sodium: 98,
    potassium: 349,
    calcium: 276,
    iron: 0.1,
    vitaminA: 112,
    vitaminC: 0,
    vitaminD: 124,
    brand: "Generic",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
  },
];

// Generate a random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Export dataset to CSV
export const exportToCSV = (data: FoodItem[]): string => {
  const headers = [
    "Name",
    "Category",
    "Serving Size",
    "Calories",
    "Protein (g)",
    "Fat (g)",
    "Carbs (g)",
    "Fiber (g)",
    "Sugar (g)",
    "Sodium (mg)",
    "Potassium (mg)",
    "Calcium (mg)",
    "Iron (mg)",
    "Vitamin A (IU)",
    "Vitamin C (mg)",
    "Vitamin D (IU)",
    "Brand",
    "Ingredients",
    "Allergens",
    "Preparation",
    "Glycemic Index"
  ].join(",");

  const rows = data.map(item => {
    return [
      `"${item.name || ''}"`,
      `"${item.category || ''}"`,
      `"${item.servingSize || ''}"`,
      item.calories || '',
      item.protein || '',
      item.fat || '',
      item.carbohydrates || '',
      item.fiber || '',
      item.sugar || '',
      item.sodium || '',
      item.potassium || '',
      item.calcium || '',
      item.iron || '',
      item.vitaminA || '',
      item.vitaminC || '',
      item.vitaminD || '',
      `"${item.brand || ''}"`,
      `"${item.ingredients || ''}"`,
      `"${item.allergens || ''}"`,
      `"${item.preparationMethod || ''}"`,
      item.glycemicIndex || ''
    ].join(",");
  });

  return [headers, ...rows].join("\n");
};

// Export dataset to JSON
export const exportToJSON = (data: FoodItem[]): string => {
  return JSON.stringify(data, null, 2);
};

// Create a download link
export const downloadFile = (content: string, fileName: string, contentType: string): void => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

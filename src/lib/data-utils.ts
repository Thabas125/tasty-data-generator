import { FoodItem } from "./types";

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const sampleFoodData: FoodItem[] = [
  {
    id: "1",
    name: "Classic Margherita Pizza",
    category: "Main Course",
    servingSize: "1 slice (1/8 of 12-inch pizza)",
    calories: 200,
    protein: 8,
    fat: 7,
    carbohydrates: 25,
    fiber: 1.5,
    sugar: 2,
    sodium: 450,
    preparationMethod: "Baked",
    imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    cookingTime: "20 minutes",
    difficulty: "Easy",
    instructions: [
      "Preheat oven to 450°F (230°C)",
      "Roll out pizza dough",
      "Spread tomato sauce",
      "Add fresh mozzarella",
      "Bake for 15-20 minutes",
      "Top with fresh basil"
    ],
    servings: 8,
    cuisineType: "Italian",
    dietaryInfo: ["Vegetarian"],
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    totalTime: "30 minutes",
    equipment: ["Pizza Stone", "Rolling Pin", "Oven"],
    ingredients: "Pizza dough, tomato sauce, fresh mozzarella, fresh basil, olive oil, salt",
    tips: "For the crispiest crust, preheat your pizza stone in the oven"
  },
  {
    id: "2",
    name: "Classic Caesar Salad",
    category: "Salad",
    servingSize: "2 cups",
    calories: 320,
    protein: 10,
    fat: 28,
    carbohydrates: 12,
    fiber: 4,
    sugar: 2,
    sodium: 610,
    preparationMethod: "Raw",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    cookingTime: "15 minutes",
    difficulty: "Easy",
    instructions: [
      "Wash and chop romaine lettuce",
      "Make caesar dressing",
      "Toast bread for croutons",
      "Toss ingredients together",
      "Add parmesan cheese"
    ],
    servings: 4,
    cuisineType: "American",
    dietaryInfo: ["Contains Dairy", "Contains Gluten"],
    prepTime: "15 minutes",
    totalTime: "15 minutes",
    equipment: ["Large Bowl", "Whisk", "Knife"],
    ingredients: "Romaine lettuce, parmesan cheese, croutons, caesar dressing, black pepper",
    tips: "For extra flavor, rub the salad bowl with a clove of garlic before adding ingredients"
  }
];

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

export const exportToJSON = (data: FoodItem[]): string => {
  return JSON.stringify(data, null, 2);
};

export const downloadFile = (content: string, fileName: string, contentType: string): void => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

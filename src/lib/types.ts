
export interface FoodItem {
  id: string;
  name: string;
  category: string;
  servingSize: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  sugar: number;
  sodium?: number;
  potassium?: number;
  calcium?: number;
  iron?: number;
  vitaminA?: number;
  vitaminC?: number;
  vitaminD?: number;
  brand?: string;
  ingredients?: string;
  allergens?: string;
  preparationMethod?: string;
  glycemicIndex?: number;
  imageUrl?: string;
}

export type FoodCategory = 
  | "Fruit" 
  | "Vegetable" 
  | "Meat" 
  | "Seafood" 
  | "Dairy" 
  | "Grain" 
  | "Beverage" 
  | "Snack"
  | "Dessert"
  | "Condiment"
  | "Other";

export type PreparationMethod =
  | "Raw"
  | "Baked"
  | "Boiled"
  | "Grilled"
  | "Fried"
  | "Steamed"
  | "Roasted"
  | "Sautéed"
  | "Smoked"
  | "Other";

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  servingSize: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  sugar: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  brand: string;
  ingredients: string;
  allergens: string;
  preparationMethod: PreparationMethod;
  glycemicIndex: number;
  imageUrl?: string;
  cookingTime?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  instructions?: string[];
  servings?: number;
  cuisineType?: string;
  dietaryInfo?: string[];
  totalTime?: string;
  prepTime?: string;
  cookTime?: string;
  equipment?: string[];
  tips?: string;
  nutritionScore?: number;
}

export type FoodCategory = 
  | "Appetizer"
  | "Main Course"
  | "Dessert"
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Snack"
  | "Beverage"
  | "Salad"
  | "Soup"
  | "Side Dish"
  | "Sauce"
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
  | "Slow Cooked"
  | "Pressure Cooked"
  | "Air Fried"
  | "Other";

export interface BasicFormData {
  name: string;
  category: string;
  servingSize: string;
  calories: number;
  imageUrl?: string;
}

export interface MacroFormData {
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  sugar: number;
}

export interface MicroFormData {
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
}

export interface OtherDetailsFormData {
  brand: string;
  ingredients: string;
  allergens: string;
  preparationMethod: PreparationMethod;
  glycemicIndex: number;
}

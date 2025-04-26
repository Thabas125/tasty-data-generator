
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUploader } from "../ImageUploader";
import { FoodCategory } from "@/lib/types";

interface BasicInfoTabProps {
  form: {
    name: string;
    category: string;
    servingSize: string;
    calories: number;
    imageUrl?: string;  // Make imageUrl optional
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleImageChange: (url: string) => void;
}

export function BasicInfoTab({ form, handleChange, handleSelectChange, handleImageChange }: BasicInfoTabProps) {
  const foodCategories: FoodCategory[] = [
    "Appetizer", "Main Course", "Dessert", "Breakfast", "Lunch", 
    "Dinner", "Snack", "Beverage", "Salad", "Soup", "Side Dish", 
    "Sauce", "Other"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="food-image">Food Image</Label>
        <ImageUploader 
          imageUrl={form.imageUrl} 
          onImageChange={handleImageChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Food Name *</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g., Granny Smith Apple"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select 
          value={form.category} 
          onValueChange={(value) => handleSelectChange("category", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {foodCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="servingSize">Serving Size *</Label>
        <Input
          id="servingSize"
          name="servingSize"
          value={form.servingSize}
          onChange={handleChange}
          placeholder="e.g., 100g, 1 piece, 1 cup"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="calories">Calories (kcal) *</Label>
        <Input
          id="calories"
          name="calories"
          type="number"
          value={form.calories}
          onChange={handleChange}
          placeholder="0"
          required
        />
      </div>
    </div>
  );
}

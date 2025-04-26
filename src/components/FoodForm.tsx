
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FoodItem, FoodCategory, PreparationMethod } from "@/lib/types";
import { ImageUploader } from "./ImageUploader";
import { useFoodData } from "@/lib/food-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FoodFormProps {
  foodItem?: FoodItem;
  onClose?: () => void;
}

export function FoodForm({ foodItem, onClose }: FoodFormProps) {
  const { addFoodItem, updateFoodItem } = useFoodData();
  const [activeTab, setActiveTab] = useState("basic");
  
  const [form, setForm] = useState<Omit<FoodItem, "id">>({
    name: foodItem?.name || "",
    category: foodItem?.category || "Other",
    servingSize: foodItem?.servingSize || "",
    calories: foodItem?.calories || 0,
    protein: foodItem?.protein || 0,
    fat: foodItem?.fat || 0,
    carbohydrates: foodItem?.carbohydrates || 0,
    fiber: foodItem?.fiber || 0,
    sugar: foodItem?.sugar || 0,
    sodium: foodItem?.sodium || 0,
    potassium: foodItem?.potassium || 0,
    calcium: foodItem?.calcium || 0,
    iron: foodItem?.iron || 0,
    vitaminA: foodItem?.vitaminA || 0,
    vitaminC: foodItem?.vitaminC || 0,
    vitaminD: foodItem?.vitaminD || 0,
    brand: foodItem?.brand || "",
    ingredients: foodItem?.ingredients || "",
    allergens: foodItem?.allergens || "",
    preparationMethod: foodItem?.preparationMethod || "Raw",
    glycemicIndex: foodItem?.glycemicIndex || 0,
    imageUrl: foodItem?.imageUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Convert numeric fields
    const numericFields = [
      "calories", "protein", "fat", "carbohydrates", "fiber", "sugar",
      "sodium", "potassium", "calcium", "iron", "vitaminA", "vitaminC", 
      "vitaminD", "glycemicIndex"
    ];
    
    if (numericFields.includes(name)) {
      setForm({
        ...form,
        [name]: value === "" ? "" : parseFloat(value) || 0
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleImageChange = (url: string) => {
    setForm({
      ...form,
      imageUrl: url
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (foodItem && foodItem.id) {
      updateFoodItem({ ...form, id: foodItem.id });
    } else {
      addFoodItem(form);
    }
    
    if (onClose) onClose();
  };

  const foodCategories: FoodCategory[] = [
    "Appetizer", "Main Course", "Dessert", "Breakfast", "Lunch", 
    "Dinner", "Snack", "Beverage", "Salad", "Soup", "Side Dish", 
    "Sauce", "Other"
  ];

  const preparationMethods: PreparationMethod[] = [
    "Raw", "Baked", "Boiled", "Grilled", "Fried", "Steamed", 
    "Roasted", "Sautéed", "Smoked", "Slow Cooked", "Pressure Cooked", 
    "Air Fried", "Other"
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{foodItem ? `Edit ${foodItem.name}` : "Add New Food Item"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="macros">Macronutrients</TabsTrigger>
              <TabsTrigger value="micros">Micronutrients</TabsTrigger>
              <TabsTrigger value="other">Other Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="macros" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    name="protein"
                    type="number"
                    step="0.1"
                    value={form.protein}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    name="fat"
                    type="number"
                    step="0.1"
                    value={form.fat}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carbohydrates">Carbohydrates (g)</Label>
                  <Input
                    id="carbohydrates"
                    name="carbohydrates"
                    type="number"
                    step="0.1"
                    value={form.carbohydrates}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fiber">Fiber (g)</Label>
                  <Input
                    id="fiber"
                    name="fiber"
                    type="number"
                    step="0.1"
                    value={form.fiber}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sugar">Sugar (g)</Label>
                <Input
                  id="sugar"
                  name="sugar"
                  type="number"
                  step="0.1"
                  value={form.sugar}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="micros" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sodium">Sodium (mg)</Label>
                  <Input
                    id="sodium"
                    name="sodium"
                    type="number"
                    step="1"
                    value={form.sodium}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium (mg)</Label>
                  <Input
                    id="potassium"
                    name="potassium"
                    type="number"
                    step="1"
                    value={form.potassium}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calcium">Calcium (mg)</Label>
                  <Input
                    id="calcium"
                    name="calcium"
                    type="number"
                    step="0.1"
                    value={form.calcium}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="iron">Iron (mg)</Label>
                  <Input
                    id="iron"
                    name="iron"
                    type="number"
                    step="0.1"
                    value={form.iron}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vitaminA">Vitamin A (IU)</Label>
                  <Input
                    id="vitaminA"
                    name="vitaminA"
                    type="number"
                    step="0.1"
                    value={form.vitaminA}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vitaminC">Vitamin C (mg)</Label>
                  <Input
                    id="vitaminC"
                    name="vitaminC"
                    type="number"
                    step="0.1"
                    value={form.vitaminC}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vitaminD">Vitamin D (IU)</Label>
                  <Input
                    id="vitaminD"
                    name="vitaminD"
                    type="number"
                    step="0.1"
                    value={form.vitaminD}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="other" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="e.g., Nestlé, Generic"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea
                  id="ingredients"
                  name="ingredients"
                  value={form.ingredients}
                  onChange={handleChange}
                  placeholder="List of ingredients separated by commas"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allergens">Allergens</Label>
                <Input
                  id="allergens"
                  name="allergens"
                  value={form.allergens}
                  onChange={handleChange}
                  placeholder="e.g., Contains nuts, dairy"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preparationMethod">Preparation Method</Label>
                <Select 
                  value={form.preparationMethod} 
                  onValueChange={(value) => handleSelectChange("preparationMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preparation method" />
                  </SelectTrigger>
                  <SelectContent>
                    {preparationMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="glycemicIndex">Glycemic Index (0-100)</Label>
                <Input
                  id="glycemicIndex"
                  name="glycemicIndex"
                  type="number"
                  min="0"
                  max="100"
                  value={form.glycemicIndex}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{foodItem ? "Update" : "Add"} Food Item</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

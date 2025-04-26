
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodItem } from "@/lib/types";
import { useFoodData } from "@/lib/food-context";
import { BasicInfoTab } from "./forms/BasicInfoTab";
import { MacronutrientsTab } from "./forms/MacronutrientsTab";
import { MicronutrientsTab } from "./forms/MicronutrientsTab";
import { OtherDetailsTab } from "./forms/OtherDetailsTab";

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
            
            <TabsContent value="basic">
              <BasicInfoTab 
                form={form} 
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleImageChange={handleImageChange}
              />
            </TabsContent>
            
            <TabsContent value="macros">
              <MacronutrientsTab form={form} handleChange={handleChange} />
            </TabsContent>
            
            <TabsContent value="micros">
              <MicronutrientsTab form={form} handleChange={handleChange} />
            </TabsContent>
            
            <TabsContent value="other">
              <OtherDetailsTab 
                form={form}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
              />
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

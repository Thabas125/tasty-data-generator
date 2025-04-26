
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { FoodItem } from "./types";
import { generateId, sampleFoodData } from "./data-utils";
import { toast } from "@/components/ui/use-toast";

interface FoodContextType {
  foodItems: FoodItem[];
  addFoodItem: (food: Omit<FoodItem, "id">) => void;
  updateFoodItem: (food: FoodItem) => void;
  deleteFoodItem: (id: string) => void;
  clearAllItems: () => void;
  importData: (data: FoodItem[]) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function FoodProvider({ children }: { children: ReactNode }) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("foodDataset");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFoodItems(parsed);
      } catch (e) {
        console.error("Error parsing saved food data", e);
        setFoodItems(sampleFoodData);
      }
    } else {
      // Use sample data if no saved data exists
      setFoodItems(sampleFoodData);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("foodDataset", JSON.stringify(foodItems));
  }, [foodItems]);

  const addFoodItem = (food: Omit<FoodItem, "id">) => {
    const newFood = {
      id: generateId(),
      ...food
    };
    setFoodItems(prev => [...prev, newFood]);
    toast({
      title: "Food Item Added",
      description: `${newFood.name} has been added to the dataset.`,
    });
  };

  const updateFoodItem = (food: FoodItem) => {
    setFoodItems(prev => 
      prev.map(item => item.id === food.id ? food : item)
    );
    toast({
      title: "Food Item Updated",
      description: `${food.name} has been updated in the dataset.`,
    });
  };

  const deleteFoodItem = (id: string) => {
    const itemName = foodItems.find(item => item.id === id)?.name;
    setFoodItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Food Item Deleted",
      description: `${itemName || 'Item'} has been removed from the dataset.`,
      variant: "destructive"
    });
  };

  const clearAllItems = () => {
    setFoodItems([]);
    toast({
      title: "Dataset Cleared",
      description: "All food items have been removed from the dataset.",
      variant: "destructive"
    });
  };

  const importData = (data: FoodItem[]) => {
    setFoodItems(data);
    toast({
      title: "Data Imported",
      description: `${data.length} food items have been imported.`
    });
  };

  return (
    <FoodContext.Provider value={{ 
      foodItems, 
      addFoodItem, 
      updateFoodItem, 
      deleteFoodItem,
      clearAllItems,
      importData
    }}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFoodData() {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error("useFoodData must be used within a FoodProvider");
  }
  return context;
}


import { AppHeader } from "@/components/AppHeader";
import { FoodDataTable } from "@/components/FoodDataTable";
import { FoodProvider } from "@/lib/food-context";
import { Chef } from "lucide-react";

const Index = () => {
  return (
    <FoodProvider>
      <div className="min-h-screen container py-6">
        <AppHeader />
        <main>
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Chef className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">Recipe Dataset Generator</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create and manage your recipe dataset with detailed nutritional information, 
              cooking instructions, and beautiful images. Perfect for recipe apps, 
              meal planners, and food analysis.
            </p>
          </div>

          <section className="mb-8">
            <FoodDataTable />
          </section>

          <footer className="text-center text-sm text-muted-foreground py-4">
            <p>Recipe Dataset Generator - Create your culinary database with comprehensive nutritional information</p>
          </footer>
        </main>
      </div>
    </FoodProvider>
  );
};

export default Index;

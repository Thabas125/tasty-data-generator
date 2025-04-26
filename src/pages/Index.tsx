
import { AppHeader } from "@/components/AppHeader";
import { FoodDataTable } from "@/components/FoodDataTable";
import { FoodProvider } from "@/lib/food-context";

const Index = () => {
  return (
    <FoodProvider>
      <div className="min-h-screen container py-6">
        <AppHeader />
        <main>
          <section className="mb-8">
            <FoodDataTable />
          </section>

          <footer className="text-center text-sm text-muted-foreground py-4">
            <p>Tasty Data Generator - Create your nutritional food dataset with images</p>
          </footer>
        </main>
      </div>
    </FoodProvider>
  );
};

export default Index;

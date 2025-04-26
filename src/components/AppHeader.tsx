
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FoodForm } from "./FoodForm";
import { DataImportExport } from "./DataImportExport";
import { useFoodData } from "@/lib/food-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Cherry, Plus, Trash2 } from "lucide-react";

export function AppHeader() {
  const { clearAllItems, foodItems } = useFoodData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);

  return (
    <header className="flex flex-col gap-4 mb-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center">
          <Cherry className="h-8 w-8 text-apple-red mr-2" />
          <h1 className="text-3xl font-bold tracking-tight text-leaf-green">
            Tasty Data Generator
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Food
          </Button>
          {foodItems.length > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setIsConfirmClearOpen(true)}
              className="flex items-center text-destructive"
            >
              <Trash2 className="mr-1 h-4 w-4" /> Clear All
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-muted-foreground">
          {foodItems.length} item{foodItems.length !== 1 ? 's' : ''} in dataset
        </p>
        <DataImportExport />
      </div>
      
      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogContent className="md:max-w-2xl">
          <FoodForm onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <AlertDialog 
        open={isConfirmClearOpen}
        onOpenChange={setIsConfirmClearOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Data</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all food items? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearAllItems();
                setIsConfirmClearOpen(false);
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}

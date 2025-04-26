
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FoodItem } from "@/lib/types";
import { useFoodData } from "@/lib/food-context";
import { Pencil, Trash2, Search, SortAsc, SortDesc } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FoodForm } from "./FoodForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function FoodDataTable() {
  const { foodItems, deleteFoodItem } = useFoodData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortField, setSortField] = useState<keyof FoodItem>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [editItem, setEditItem] = useState<FoodItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  // Get unique categories from data
  const categories = ["All", ...new Set(foodItems.map((item) => item.category))];

  // Filter and sort data
  const filteredData = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortField] === undefined || b[sortField] === undefined) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  // Handle sort column click
  const handleSort = (field: keyof FoodItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Render sort indicator
  const renderSortIndicator = (field: keyof FoodItem) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <SortAsc className="inline h-4 w-4" />
    ) : (
      <SortDesc className="inline h-4 w-4" />
    );
  };

  const handleEdit = (item: FoodItem) => {
    setEditItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteItemId(id);
  };

  const confirmDelete = () => {
    if (deleteItemId) {
      deleteFoodItem(deleteItemId);
      setDeleteItemId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead 
                  onClick={() => handleSort("name")}
                  className="cursor-pointer"
                >
                  Name {renderSortIndicator("name")}
                </TableHead>
                <TableHead 
                  onClick={() => handleSort("category")}
                  className="cursor-pointer"
                >
                  Category {renderSortIndicator("category")}
                </TableHead>
                <TableHead 
                  onClick={() => handleSort("servingSize")}
                  className="cursor-pointer"
                >
                  Serving {renderSortIndicator("servingSize")}
                </TableHead>
                <TableHead 
                  onClick={() => handleSort("calories")}
                  className="cursor-pointer text-right"
                >
                  Calories {renderSortIndicator("calories")}
                </TableHead>
                <TableHead 
                  onClick={() => handleSort("protein")}
                  className="cursor-pointer text-right"
                >
                  Protein {renderSortIndicator("protein")}
                </TableHead>
                <TableHead 
                  onClick={() => handleSort("fat")}
                  className="cursor-pointer text-right"
                >
                  Fat {renderSortIndicator("fat")}
                </TableHead>
                <TableHead 
                  onClick={() => handleSort("carbohydrates")}
                  className="cursor-pointer text-right"
                >
                  Carbs {renderSortIndicator("carbohydrates")}
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.servingSize}</TableCell>
                    <TableCell className="text-right">{item.calories}</TableCell>
                    <TableCell className="text-right">{item.protein}g</TableCell>
                    <TableCell className="text-right">{item.fat}g</TableCell>
                    <TableCell className="text-right">{item.carbohydrates}g</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditItem(null);
        }}
      >
        <DialogContent className="md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Food Item</DialogTitle>
          </DialogHeader>
          {editItem && (
            <FoodForm
              foodItem={editItem}
              onClose={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteItemId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteItemId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Food Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

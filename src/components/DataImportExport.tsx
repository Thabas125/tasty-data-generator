
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  exportToCSV, 
  exportToJSON, 
  downloadFile 
} from "@/lib/data-utils";
import { useFoodData } from "@/lib/food-context";
import { toast } from "@/components/ui/use-toast";
import { Download, Upload } from "lucide-react";

export function DataImportExport() {
  const { foodItems, importData } = useFoodData();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

  const handleExportCSV = () => {
    const csvContent = exportToCSV(foodItems);
    downloadFile(csvContent, "food-dataset.csv", "text/csv;charset=utf-8;");
    toast({
      title: "Export Successful",
      description: `Exported ${foodItems.length} food items to CSV.`
    });
  };

  const handleExportJSON = () => {
    const jsonContent = exportToJSON(foodItems);
    downloadFile(jsonContent, "food-dataset.json", "application/json");
    toast({
      title: "Export Successful",
      description: `Exported ${foodItems.length} food items to JSON.`
    });
  };

  const handleImport = () => {
    if (!importText.trim()) {
      setImportError("Please enter JSON data");
      return;
    }

    try {
      const data = JSON.parse(importText);
      
      if (!Array.isArray(data)) {
        setImportError("Invalid format: Data must be an array");
        return;
      }

      // Validate basic structure of imported data
      const validData = data.filter(item => {
        return typeof item === 'object' && 
              item !== null && 
              typeof item.name === 'string' && 
              item.name.trim() !== '';
      });

      // Add missing IDs if needed
      const dataWithIds = validData.map(item => {
        if (!item.id) {
          item.id = Math.random().toString(36).substring(2, 15);
        }
        return item;
      });

      importData(dataWithIds);
      setIsImportDialogOpen(false);
      setImportText("");
      setImportError("");
    } catch (error) {
      setImportError("Invalid JSON format");
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleExportCSV} className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button variant="outline" onClick={handleExportJSON} className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Export JSON
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setIsImportDialogOpen(true)}
          className="flex items-center"
        >
          <Upload className="mr-2 h-4 w-4" />
          Import JSON
        </Button>
      </div>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Food Dataset</DialogTitle>
            <DialogDescription>
              Paste your JSON data below. It should be an array of food items.
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            value={importText}
            onChange={(e) => {
              setImportText(e.target.value);
              setImportError("");
            }}
            rows={10}
            placeholder='[{"name": "Apple", "category": "Fruit", "calories": 95, ...}]'
          />
          
          {importError && (
            <p className="text-destructive text-sm">{importError}</p>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsImportDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleImport}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

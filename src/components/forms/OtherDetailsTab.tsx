
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PreparationMethod } from "@/lib/types";

interface OtherDetailsTabProps {
  form: {
    brand: string;
    ingredients: string;
    allergens: string;
    preparationMethod: PreparationMethod;
    glycemicIndex: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export function OtherDetailsTab({ form, handleChange, handleSelectChange }: OtherDetailsTabProps) {
  const preparationMethods: PreparationMethod[] = [
    "Raw", "Baked", "Boiled", "Grilled", "Fried", "Steamed", 
    "Roasted", "Sautéed", "Smoked", "Slow Cooked", "Pressure Cooked", 
    "Air Fried", "Other"
  ];

  return (
    <div className="space-y-4">
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
    </div>
  );
}

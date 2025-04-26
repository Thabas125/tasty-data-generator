
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MacronutrientsTabProps {
  form: {
    protein: number;
    fat: number;
    carbohydrates: number;
    fiber: number;
    sugar: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MacronutrientsTab({ form, handleChange }: MacronutrientsTabProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}

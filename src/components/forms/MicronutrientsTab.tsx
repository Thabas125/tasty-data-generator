
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MicronutrientsTabProps {
  form: {
    sodium: number;
    potassium: number;
    calcium: number;
    iron: number;
    vitaminA: number;
    vitaminC: number;
    vitaminD: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MicronutrientsTab({ form, handleChange }: MicronutrientsTabProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}

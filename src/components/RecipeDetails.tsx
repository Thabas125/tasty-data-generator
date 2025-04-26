
import { FoodItem } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

interface RecipeDetailsProps {
  recipe: FoodItem;
}

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        {recipe.imageUrl && (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
        )}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{recipe.name}</h2>
          <div className="flex gap-4 text-sm text-muted-foreground">
            {recipe.cookingTime && (
              <div>Cooking Time: {recipe.cookingTime}</div>
            )}
            {recipe.difficulty && (
              <div>Difficulty: {recipe.difficulty}</div>
            )}
            {recipe.servings && (
              <div>Servings: {recipe.servings}</div>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {recipe.ingredients && (
        <div className="space-y-2">
          <h3 className="font-semibold">Ingredients</h3>
          <p className="text-sm text-muted-foreground">{recipe.ingredients}</p>
        </div>
      )}

      {recipe.instructions && recipe.instructions.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Instructions</h3>
          <ol className="list-decimal list-inside space-y-1">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="text-sm text-muted-foreground">{step}</li>
            ))}
          </ol>
        </div>
      )}

      {recipe.equipment && recipe.equipment.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Equipment Needed</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {recipe.equipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.tips && (
        <div className="space-y-2">
          <h3 className="font-semibold">Tips</h3>
          <p className="text-sm text-muted-foreground">{recipe.tips}</p>
        </div>
      )}

      <div className="rounded-lg bg-muted p-4 space-y-2">
        <h3 className="font-semibold">Nutrition Information (per serving)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>Calories: {recipe.calories} kcal</div>
          <div>Protein: {recipe.protein}g</div>
          <div>Fat: {recipe.fat}g</div>
          <div>Carbs: {recipe.carbohydrates}g</div>
          {recipe.fiber && <div>Fiber: {recipe.fiber}g</div>}
          {recipe.sugar && <div>Sugar: {recipe.sugar}g</div>}
        </div>
      </div>
    </div>
  );
}

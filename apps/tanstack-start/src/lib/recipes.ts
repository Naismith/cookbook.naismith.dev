import { z } from "zod/v4";
import slugify from "slugify";
const recipeData = import.meta.glob("./recipe-data/*.json", { eager: true });

const recipeSchema = z
  .object({
    title: z.string(),
    // description: z.string(),
    directions: z.array(z.string()),
    ingredients: z.array(z.string()),
    images: z.array(z.string()),
    ingredientsV2: z
      .array(
        z.union([
          z.object({
            name: z.string(),
            amount: z.number(),
            unit: z.string(),
          }),
          z.object({
            name: z.string(),
            range: z.array(z.number()),
            unit: z.string(),
          }),
        ]),
      )
      .optional(),
    meta: z
      .object({
        prep: z.string().optional(),
        cook: z.string().optional(),
        ready_in: z.string().optional(),
      })
      .optional(),
    stars: z.number().or(z.null()),
    source: z.string().optional(),
    categories: z.array(z.string()),
  })
  .transform((recipe) => ({
    ...recipe,
    description: "", // to come
    slug: slugify(recipe.title, { lower: true }),
  }));

export type Recipe = z.infer<typeof recipeSchema>;

export const recipes = Object.entries(recipeData).map(([path, recipe]) => {
  return recipeSchema.parse(recipe);
});

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === id);
}

export function searchRecipes(query: string): Recipe[] {
  const lowercaseQuery = query.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.categories.some((category) =>
        category.toLowerCase().includes(lowercaseQuery),
      ),
  );
}

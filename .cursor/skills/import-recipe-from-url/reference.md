# Recipe schema reference

Source of truth: `apps/tanstack-start/src/lib/recipes.ts`

## On-disk JSON shape

Written to `recipe-data/*.json` (no `slug`, no `description`):

```typescript
{
  title: string;
  directions: string[];
  ingredients: string[];
  images: string[];           // relative paths, e.g. "../images/recipes/foo.jpg"
  stars: number | null;
  categories: string[];
  source?: string;            // original URL
  meta?: {
    prep?: string;
    cook?: string;
    ready_in?: string;
  };
  ingredientsV2?: Array<
    | { name: string; amount: number; unit: string }
    | { name: string; range: number[]; unit: string }
  >;
}
```

At load time, `recipeSchema` adds:

- `slug` — `slugify(title, { lower: true })`
- `description` — `""` (placeholder)

Recipe URLs use the slug: `/recipe/$recipeId` where `recipeId === slug`.

## Example: simple import

```json
{
  "title": "Crepes",
  "categories": ["breakfast", "sweet"],
  "meta": {
    "prep": "5 m",
    "cook": "2 m",
    "ready_in": "10 m"
  },
  "images": ["../images/recipes/crepes.jpg"],
  "stars": 4.5,
  "ingredients": ["1 cup flour", "1 1/2 cups milk", "2 eggs"],
  "directions": [
    "Combine flour, milk, eggs, and oil.",
    "Heat a lightly greased skillet."
  ],
  "source": "https://www.food.com/recipe/crepes-18410"
}
```

## Example: ingredientsV2 (optional)

Use when amounts are unambiguous. Keep `ingredients` as human-readable strings too.

```json
{
  "name": "Chocolate chips",
  "range": [0.5, 0.67],
  "unit": "cup"
}
```

## JSON-LD → cookbook mapping

Common JSON-LD Recipe fields:

```json
{
  "@type": "Recipe",
  "name": "Title here",
  "recipeIngredient": ["1 cup flour", "2 eggs"],
  "recipeInstructions": [
    { "@type": "HowToStep", "text": "Mix dry ingredients." },
    "Bake for 20 minutes."
  ],
  "image": "https://example.com/photo.jpg",
  "prepTime": "PT10M",
  "cookTime": "PT25M",
  "totalTime": "PT35M"
}
```

**recipeInstructions** variants:

- Array of strings → use directly
- Array of `{ text: "..." }` → map to `text`
- Single string → split on newlines or periods into steps

**image** variants:

- `"https://..."` → use as-is for download
- `{ "url": "https://..." }` → use `url`
- `["https://...", "..."]` → prefer first entry or largest dimensions

## Category conventions

Existing recipes use lowercase tags like `"breakfast"`, `"dinner"`, `"baking"`, `"chicken"`, `"hellofresh"`. Use 1–3 relevant tags; empty array is valid.

## Filename conventions

| Pattern          | When               |
| ---------------- | ------------------ |
| `{slug}.json`    | Default            |
| `hf-{slug}.json` | HelloFresh imports |
| `{slug}-2.json`  | Slug collision     |

Filename does not have to match slug, but **should** — the app routes by slugified title, not filename.

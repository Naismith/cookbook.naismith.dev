---
name: import-recipe-from-url
description: Fetches a recipe from a URL, extracts structured data (JSON-LD Recipe), maps it to the cookbook schema, and saves a new JSON file under apps/tanstack-start/src/lib/recipe-data. Use when adding recipes from the web, importing recipe URLs, or populating recipe-data.
---

# Import Recipe from URL

## Paths

| What                              | Path                                                   |
| --------------------------------- | ------------------------------------------------------ |
| Recipe JSON files                 | `apps/tanstack-start/src/lib/recipe-data/`             |
| Schema + loader                   | `apps/tanstack-start/src/lib/recipes.ts`               |
| Reference URL flow                | `apps/tanstack-start/src/routes/(auth)/add-recipe.tsx` |
| Image assets (relative from JSON) | `apps/tanstack-start/src/lib/images/recipes/`          |

Recipes are loaded at build time via `import.meta.glob("./recipe-data/*.json")`. A new file appears in the app immediately after save (restart dev server if already running).

## Workflow

Copy this checklist and track progress:

```
- [ ] Step 1: Fetch URL and extract JSON-LD Recipe
- [ ] Step 2: Map to cookbook schema
- [ ] Step 3: Choose filename (slug)
- [ ] Step 4: Download hero image (optional)
- [ ] Step 5: Write JSON file
- [ ] Step 6: Validate
```

### Step 1: Fetch URL and extract JSON-LD Recipe

Run the helper script from the tanstack-start workspace (uses project `jsdom`):

```bash
cd apps/tanstack-start
node ../../.cursor/skills/import-recipe-from-url/scripts/fetch-recipe-jsonld.mjs "<url>"
```

If JSON-LD extraction fails:

1. Retry with the page's canonical URL (strip tracking params).
2. View page source manually and look for `application/ld+json` blocks containing `"Recipe"`.
3. Fall back to pasted recipe text — normalize by hand using the schema in [reference.md](reference.md).

The script handles `@graph`, arrays, and nested `@type` values. It does **not** scrape arbitrary HTML; JSON-LD is the primary source.

### Step 2: Map to cookbook schema

Transform JSON-LD fields into the on-disk JSON shape. Do **not** include `slug` or `description` — those are added by `recipeSchema` at load time.

| JSON-LD                             | Cookbook field                            | Notes                                                               |
| ----------------------------------- | ----------------------------------------- | ------------------------------------------------------------------- |
| `name`                              | `title`                                   | Required                                                            |
| `recipeIngredient`                  | `ingredients`                             | String array; normalize names (simple, consistent)                  |
| `recipeInstructions`                | `directions`                              | Flatten `HowToStep.text` or string entries; one step per array item |
| `image`                             | `images`                                  | See image path convention below                                     |
| `prepTime`, `cookTime`, `totalTime` | `meta.prep`, `meta.cook`, `meta.ready_in` | Convert ISO 8601 duration (`PT15M`) → `"15 m"`                      |
| page URL                            | `source`                                  | Original recipe URL                                                 |
| —                                   | `stars`                                   | Use `null` for new imports unless the user specifies a rating       |
| —                                   | `categories`                              | Infer from cuisine/meal type, or `[]` if unclear                    |

**Ingredient normalization** (match existing recipes):

- Prefer `"2 tbsp soy sauce"` over verbose brand-specific names
- Keep fractions as `"1/2 cup"`, not `0.5 cup`
- Include unit + amount in the string; optional `ingredientsV2` only when amounts parse cleanly

**Directions normalization**:

- Split long paragraphs into logical steps
- Strip HTML tags from instruction text
- Each direction is a plain string

See [reference.md](reference.md) for full schema and examples.

### Step 3: Choose filename (slug)

Filename = `slugify(title, { lower: true })` + `.json`

Examples: `"Crepes"` → `crepes.json`, `"Sesame Soy Maple Chicken"` → `sesame-soy-maple-chicken.json`

Before writing, check for collisions:

```bash
ls apps/tanstack-start/src/lib/recipe-data/<slug>.json
```

If the slug exists, append a disambiguator (`-2`, site name, etc.) and keep `title` unchanged unless the user wants it edited.

### Step 4: Download hero image (optional)

1. Resolve image URL from JSON-LD `image` (string, object with `url`, or array — pick the first/largest).
2. Save to `apps/tanstack-start/src/lib/images/recipes/<slug>.jpg` (`.jpeg` ok if source is jpeg).
3. Set `images` to `["../images/recipes/<slug>.jpg"]` — path is relative to the JSON file.

If no image is available, use `["../images/recipes/<slug>.jpg"]` anyway (matches existing recipes) or ask the user.

```bash
curl -L "<image-url>" -o apps/tanstack-start/src/lib/images/recipes/<slug>.jpg
```

### Step 5: Write JSON file

Write to:

```
apps/tanstack-start/src/lib/recipe-data/<slug>.json
```

Use 2-space indent. Required top-level keys: `title`, `categories`, `images`, `stars`, `ingredients`, `directions`. Optional: `meta`, `source`, `ingredientsV2`.

Minimal example:

```json
{
  "title": "Example Recipe",
  "categories": ["dinner"],
  "meta": {},
  "images": ["../images/recipes/example-recipe.jpg"],
  "stars": null,
  "source": "https://example.com/recipe",
  "ingredients": ["1 cup flour", "2 eggs"],
  "directions": ["Mix ingredients.", "Cook until done."]
}
```

### Step 6: Validate

Confirm the file parses against the schema and the app builds:

```bash
yarn workspace tanstack-start build
```

Fix any Zod errors reported during the build (usually missing required fields or wrong types).

Optionally verify the recipe loads:

```bash
# slug comes from slugify(title, { lower: true })
open http://localhost:3000/recipe/<slug>
```

## ISO 8601 duration helper

| JSON-LD   | meta value   |
| --------- | ------------ |
| `PT5M`    | `"5 m"`      |
| `PT1H30M` | `"1 h 30 m"` |
| `PT45M`   | `"45 m"`     |

Omit empty meta keys rather than setting `""` unless matching an existing recipe that uses empty strings.

## Site-specific notes

- **HelloFresh**: use `scripts/steal-hellofresh.js` API flow instead; prefix filenames with `hf-` and add `"hellofresh"` category.
- **Paywalled / bot-blocked sites**: fetch may fail; ask user to paste recipe text and skip URL fetch.
- **add-recipe UI**: `/add-recipe` uses the same JSON-LD fetch + OpenAI extraction but does not write files yet. Prefer this skill's file-based workflow for permanent additions.

## Additional resources

- Schema details and field examples: [reference.md](reference.md)

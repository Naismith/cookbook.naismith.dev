#!/usr/bin/env node
/**
 * Fetch a recipe URL and print the JSON-LD Recipe object.
 * Run from apps/tanstack-start so jsdom resolves:
 *   node ../../.cursor/skills/import-recipe-from-url/scripts/fetch-recipe-jsonld.mjs "<url>"
 */
import { JSDOM } from "jsdom";

const url = process.argv[2];

if (!url) {
  console.error(
    "Usage: node fetch-recipe-jsonld.mjs <url>\nRun from apps/tanstack-start directory.",
  );
  process.exit(1);
}

function isRecipeType(type) {
  if (type === "Recipe") return true;
  if (Array.isArray(type)) return type.includes("Recipe");
  return false;
}

function findRecipe(node) {
  if (!node || typeof node !== "object") return null;

  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findRecipe(item);
      if (found) return found;
    }
    return null;
  }

  if (isRecipeType(node["@type"])) return node;

  if (node["@graph"]) {
    return findRecipe(node["@graph"]);
  }

  return null;
}

const response = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (compatible; cookbook-importer/1.0; +https://cookbook.naismith.dev)",
    Accept: "text/html",
  },
});

if (!response.ok) {
  console.error(`HTTP ${response.status} fetching ${url}`);
  process.exit(1);
}

const html = await response.text();
const dom = new JSDOM(html);
const scripts = dom.window.document.querySelectorAll(
  'script[type="application/ld+json"]',
);

for (const script of scripts) {
  const raw = script.textContent?.trim();
  if (!raw || !raw.includes("Recipe")) continue;

  try {
    const parsed = JSON.parse(raw);
    const recipe = findRecipe(parsed);
    if (recipe) {
      console.log(JSON.stringify(recipe, null, 2));
      process.exit(0);
    }
  } catch {
    // try next script block
  }
}

console.error(`No JSON-LD Recipe found at ${url}`);
process.exit(1);

"use client";
import { useState, useCallback } from "react";
import { RecipeCard } from "./RecipeCard";
import { SearchBar } from "./SearchBar";
import { recipes, searchRecipes } from "@/lib/recipes";

export function RecipeList() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = useCallback((query: string) => {
    if (query.trim() === "") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(searchRecipes(query));
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">All Recipes</h2>
          <p className="text-sm text-muted-foreground">
            {filteredRecipes.length} recipe
            {filteredRecipes.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-4">
            <SearchEmptyIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            No recipes found
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}

function SearchEmptyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="m9 9 4 4" />
      <path d="m13 9-4 4" />
    </svg>
  );
}

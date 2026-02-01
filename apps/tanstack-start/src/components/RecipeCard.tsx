import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import type { Recipe } from "@/lib/recipes";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      to="/recipe/$recipeId"
      params={{
        recipeId: recipe.id,
      }}
    >
      <Card className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.name}
            // fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
              {recipe.category}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {recipe.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {recipe.description}
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ClockIcon className="h-3.5 w-3.5" />
              {recipe.totalTime}
            </span>
            <span className="flex items-center gap-1">
              <UsersIcon className="h-3.5 w-3.5" />
              {recipe.servings} servings
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

import { Header } from "@/components/Header";
import { RecipeList } from "@/components/RecipeList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Discover Delicious Recipes
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Explore our collection of carefully curated recipes. From quick
            weeknight dinners to impressive weekend feasts, find your next
            culinary adventure.
          </p>
        </section>
        <RecipeList />
      </main>
    </div>
  );
}

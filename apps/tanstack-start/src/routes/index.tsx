import { RecipeList } from "@/components/RecipeList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <RecipeList />
      </main>
    </div>
  );
}

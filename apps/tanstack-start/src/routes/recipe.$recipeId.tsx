import { NotFound } from "@/components/NotFound";
import { getRecipeById } from "@/lib/recipes";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  ClockIcon,
  FlameIcon,
  ListIcon,
} from "lucide-react";
import { notFound } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/recipe/$recipeId")({
  component: RouteComponent,
  loader: async ({ params: { recipeId } }) => {
    const recipe = await getRecipeById(recipeId);
    if (!recipe) {
      throw notFound();
    }
    return recipe;
  },
  notFoundComponent: () => {
    return <NotFound>Recipe not found</NotFound>;
  },
});

function RouteComponent() {
  const recipe = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to recipes
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recipe Image */}
          <div className="relative aspect-4/3 overflow-hidden rounded-xl">
            <img
              src={recipe.images[0] || "/placeholder.svg"}
              alt=""
              //   fill
              className="object-cover"
              //   priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute left-4 top-4">
              <Badge variant="secondary" className="backdrop-blur-sm">
                {recipe.categories.join(", ")}
              </Badge>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
                {recipe.title}
              </h1>
              <p className="mt-3 text-pretty text-lg text-muted-foreground">
                {recipe.description}
              </p>
            </div>

            {/* Time Cards */}
            <div className="grid grid-cols-3 gap-4">
              <TimeCard
                label="Prep Time"
                value={recipe.meta?.prep || ""}
                icon={<ClockIcon />}
              />
              <TimeCard
                label="Cook Time"
                value={recipe.meta?.cook || ""}
                icon={<FlameIcon />}
              />
              {/* <TimeCard
                label="Servings"
                value={`${recipe.servings}`}
                icon={<UsersIcon />}
              /> */}
            </div>

            <Separator className="bg-border/50" />

            {/* Ingredients */}
            <Card className="border-border/50 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ListIcon className="h-5 w-5 text-primary" />
                  Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-8 border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BookOpenIcon className="h-5 w-5 text-primary" />
              Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-6">
              {recipe.directions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <p className="flex-1 pt-1 text-foreground">{instruction}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function TimeCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-secondary/30 p-4 text-center">
      <div className="mb-2 flex justify-center text-primary">{icon}</div>
      <p className="text-lg font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

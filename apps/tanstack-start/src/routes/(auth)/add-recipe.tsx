import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { chat } from "@tanstack/ai";
import { createOpenaiChat } from "@tanstack/ai-openai";
import { recipeSchema } from "@/lib/recipes";
import { JSDOM } from "jsdom";

export const Route = createFileRoute("/(auth)/add-recipe")({
  component: RouteComponent,
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const addRecipePayload = AddRecipeSchema.parse(body);

          try {
            let recipeText = addRecipePayload.recipeText ?? "";

            if (addRecipePayload.inputType === "url") {
              const response = await fetch(addRecipePayload.recipeUrl || "");
              const html = await response.text();

              const dom = new JSDOM(html);
              const { document } = dom.window;

              const maybeLdJson = Array.from(
                document.querySelectorAll('script[type="application/ld+json"]'),
              ).find((script) => script.textContent?.includes("Recipe"))
                ?.textContent;

              const maybeRecipeText = maybeLdJson
                ? JSON.parse(maybeLdJson)?.["@graph"].find(
                    (item: any) => item["@type"] === "Recipe",
                  )
                : null;

              if (maybeRecipeText) {
                recipeText = JSON.stringify(maybeRecipeText);
              }
            }

            const prompt = `
              Given the following recipe text, extract the relevant information to create a recipe.

              Normalize the ingredient names to be simpler and more consistent.
              ${recipeText}
            `;

            // Create a streaming chat response
            const adapter = createOpenaiChat(
              "gpt-5.2",
              addRecipePayload.intelligenceToken,
              {},
            );
            const result = await chat({
              adapter,
              messages: [
                {
                  role: "user",
                  content: prompt,
                },
              ],
              outputSchema: recipeSchema,
            });

            // Convert stream to HTTP response
            return Response.json(result);
          } catch (error) {
            return new Response(
              JSON.stringify({
                error:
                  error instanceof Error ? error.message : "An error occurred",
              }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
        } catch (err) {
          return Response.json(
            {
              error:
                err instanceof Error ? err.message : "Something went wrong",
            },
            { status: 400 },
          );
        }
      },
    },
  },
});

const AddRecipeSchema = z
  .object({
    githubToken: z.string().min(1, "GitHub token is required"),
    intelligenceToken: z.string().min(1, "Intelligence token is required"),
    inputType: z.enum(["url", "paste"]),
    recipeUrl: z.string().optional(),
    recipeText: z.string().optional(),
  })
  .refine(
    (data) =>
      data.inputType === "url"
        ? data.recipeUrl != null && data.recipeUrl.length > 0
        : true,
    { message: "Recipe URL is required", path: ["recipeUrl"] },
  )
  .refine(
    (data) =>
      data.inputType === "paste"
        ? data.recipeText != null && data.recipeText.length > 0
        : true,
    { message: "Recipe text is required", path: ["recipeText"] },
  );

type AddRecipeFormValues = z.infer<typeof AddRecipeSchema>;

function RouteComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<AddRecipeFormValues>({
    resolver: zodResolver(AddRecipeSchema),
    defaultValues: {
      inputType: "url",
      githubToken: "",
      intelligenceToken: "",
      recipeUrl: "",
      recipeText: "",
    },
  });

  const inputType = watch("inputType");

  async function onSubmit(data: AddRecipeFormValues) {
    try {
      const result = await fetch("/add-recipe", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log(result);
      // if (result.recipeId && result.recipeId !== "stub") {
      //   await router.navigate({
      //     to: "/recipe/$recipeId",
      //     params: { recipeId: result.recipeId },
      //   });
      // }
    } catch (err) {
      setFormError("root", {
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Add Recipe</CardTitle>
            <CardDescription>
              Provide your tokens and either a recipe URL or paste the recipe
              text.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="githubToken">GitHub User Token</Label>
              <Input
                id="githubToken"
                type="password"
                placeholder="Enter your GitHub token"
                {...register("githubToken")}
              />
              {errors.githubToken && (
                <p className="text-destructive text-sm">
                  {errors.githubToken.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="intelligenceToken">Intelligence Token</Label>
              <Input
                id="intelligenceToken"
                type="password"
                placeholder="Enter your Intelligence token"
                {...register("intelligenceToken")}
              />
              {errors.intelligenceToken && (
                <p className="text-destructive text-sm">
                  {errors.intelligenceToken.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 rounded-lg border p-4">
              <Label>Add Recipe By</Label>
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="url"
                    className="accent-primary"
                    {...register("inputType")}
                  />
                  <span className="text-sm font-medium">URL</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="paste"
                    className="accent-primary"
                    {...register("inputType")}
                  />
                  <span className="text-sm font-medium">Paste Text/Recipe</span>
                </label>
              </div>
              {inputType === "url" ? (
                <div className="flex flex-col gap-2 pt-2">
                  <Label htmlFor="recipeUrl">Recipe URL</Label>
                  <Input
                    id="recipeUrl"
                    type="url"
                    placeholder="e.g. https://example.com/my-recipe"
                    {...register("recipeUrl")}
                  />
                  {errors.recipeUrl && (
                    <p className="text-destructive text-sm">
                      {errors.recipeUrl.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Label htmlFor="recipeText">Paste Recipe Text</Label>
                  <Textarea
                    id="recipeText"
                    placeholder="Paste your recipe here..."
                    rows={5}
                    {...register("recipeText")}
                  />
                  {errors.recipeText && (
                    <p className="text-destructive text-sm">
                      {errors.recipeText.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            {errors.root && (
              <p className="text-destructive text-sm" role="alert">
                {errors.root.message}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

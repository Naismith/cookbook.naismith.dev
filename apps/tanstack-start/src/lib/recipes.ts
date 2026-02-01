export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  category: string;
}

export const recipes: Recipe[] = [
  {
    id: "spaghetti-carbonara",
    name: "Spaghetti Carbonara",
    description:
      "A classic Italian pasta dish with creamy egg sauce, crispy pancetta, and parmesan cheese.",
    image: "/recipes/spaghetti-carbonara.jpg",
    prepTime: "10 mins",
    cookTime: "20 mins",
    totalTime: "30 mins",
    servings: 4,
    category: "Pasta",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale, diced",
      "4 large egg yolks",
      "2 whole eggs",
      "100g Pecorino Romano, finely grated",
      "50g Parmesan, finely grated",
      "Freshly ground black pepper",
      "Salt to taste",
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package directions until al dente.",
      "While pasta cooks, fry the pancetta in a large skillet over medium heat until crispy, about 8-10 minutes. Remove from heat.",
      "In a bowl, whisk together egg yolks, whole eggs, Pecorino, Parmesan, and plenty of black pepper.",
      "Reserve 1 cup of pasta water, then drain the spaghetti.",
      "Add hot pasta to the skillet with pancetta (off heat). Toss to coat.",
      "Quickly pour the egg mixture over the pasta, tossing constantly. Add pasta water as needed for creamy consistency.",
      "Serve immediately with extra cheese and black pepper.",
    ],
  },
  {
    id: "grilled-salmon",
    name: "Grilled Salmon",
    description:
      "Perfectly grilled salmon fillet with crispy skin, served with lemon and fresh herbs.",
    image: "/recipes/grilled-salmon.jpg",
    prepTime: "10 mins",
    cookTime: "15 mins",
    totalTime: "25 mins",
    servings: 2,
    category: "Seafood",
    ingredients: [
      "2 salmon fillets (6 oz each)",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "1 lemon, juiced and zested",
      "2 tablespoons fresh dill, chopped",
      "Salt and pepper to taste",
      "Lemon wedges for serving",
    ],
    instructions: [
      "Pat salmon fillets dry with paper towels and let sit at room temperature for 15 minutes.",
      "Mix olive oil, garlic, lemon juice, zest, and half the dill. Brush over salmon.",
      "Season generously with salt and pepper.",
      "Preheat grill to medium-high heat (400°F). Oil the grates.",
      "Place salmon skin-side down on the grill. Cook for 4-5 minutes.",
      "Flip carefully and cook for another 3-4 minutes until internal temperature reaches 145°F.",
      "Rest for 2 minutes, then serve with remaining dill and lemon wedges.",
    ],
  },
  {
    id: "chicken-tikka-masala",
    name: "Chicken Tikka Masala",
    description:
      "Tender chicken pieces in a rich, creamy tomato-based curry sauce with aromatic spices.",
    image: "/recipes/chicken-tikka-masala.jpg",
    prepTime: "20 mins",
    cookTime: "35 mins",
    totalTime: "55 mins",
    servings: 4,
    category: "Indian",
    ingredients: [
      "1.5 lbs chicken breast, cubed",
      "1 cup plain yogurt",
      "2 tablespoons garam masala",
      "1 tablespoon cumin",
      "1 tablespoon paprika",
      "1 can (14 oz) crushed tomatoes",
      "1 cup heavy cream",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "2 inch piece ginger, grated",
      "Fresh cilantro for garnish",
      "Salt to taste",
      "Basmati rice for serving",
    ],
    instructions: [
      "Marinate chicken in yogurt, 1 tbsp garam masala, cumin, and paprika for at least 30 minutes.",
      "Thread chicken onto skewers and grill or broil until charred and cooked through, about 12 minutes.",
      "In a large pan, sauté onion until golden. Add garlic and ginger, cook 2 minutes.",
      "Add remaining garam masala and paprika. Stir for 1 minute until fragrant.",
      "Pour in crushed tomatoes and simmer for 15 minutes.",
      "Stir in heavy cream and add the grilled chicken pieces.",
      "Simmer for 10 minutes. Season with salt to taste.",
      "Garnish with fresh cilantro and serve over basmati rice.",
    ],
  },
  {
    id: "classic-burger",
    name: "Classic Gourmet Burger",
    description:
      "Juicy beef patty with melted cheese, fresh vegetables, and special sauce on a brioche bun.",
    image: "/recipes/classic-burger.jpg",
    prepTime: "15 mins",
    cookTime: "10 mins",
    totalTime: "25 mins",
    servings: 4,
    category: "American",
    ingredients: [
      "1.5 lbs ground beef (80/20)",
      "4 brioche burger buns",
      "4 slices cheddar cheese",
      "4 leaves butter lettuce",
      "4 slices ripe tomato",
      "8 pickle slices",
      "1/4 cup mayonnaise",
      "2 tablespoons ketchup",
      "1 tablespoon mustard",
      "1 teaspoon paprika",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Mix mayonnaise, ketchup, mustard, and paprika to make the special sauce. Set aside.",
      "Divide ground beef into 4 equal portions. Form into patties slightly larger than buns.",
      "Season patties generously with salt and pepper on both sides.",
      "Heat a cast iron skillet or grill to high heat.",
      "Cook patties for 3-4 minutes per side for medium. Add cheese in the last minute.",
      "Toast brioche buns on the grill or in a pan until golden.",
      "Spread special sauce on both bun halves. Layer lettuce, tomato, patty, and pickles.",
      "Serve immediately with your favorite sides.",
    ],
  },
  {
    id: "caesar-salad",
    name: "Classic Caesar Salad",
    description:
      "Crisp romaine lettuce with homemade caesar dressing, parmesan, and crunchy croutons.",
    image: "/recipes/caesar-salad.jpg",
    prepTime: "15 mins",
    cookTime: "10 mins",
    totalTime: "25 mins",
    servings: 4,
    category: "Salads",
    ingredients: [
      "2 heads romaine lettuce, chopped",
      "1 cup croutons",
      "1/2 cup shaved Parmesan",
      "2 anchovy fillets (optional)",
      "2 cloves garlic",
      "1 egg yolk",
      "2 tablespoons lemon juice",
      "1 teaspoon Dijon mustard",
      "1/2 cup olive oil",
      "Salt and pepper to taste",
    ],
    instructions: [
      "For dressing: Mash anchovies and garlic into a paste using a mortar and pestle.",
      "Whisk in egg yolk, lemon juice, and Dijon mustard until smooth.",
      "Slowly drizzle in olive oil while whisking constantly until emulsified.",
      "Season with salt and pepper to taste.",
      "Wash and dry romaine lettuce, then chop into bite-sized pieces.",
      "Toss lettuce with enough dressing to coat lightly.",
      "Top with croutons and shaved Parmesan.",
      "Serve immediately with extra dressing on the side.",
    ],
  },
  {
    id: "beef-stir-fry",
    name: "Asian Beef Stir-Fry",
    description:
      "Tender beef strips with colorful vegetables in a savory garlic ginger sauce.",
    image: "/recipes/beef-stir-fry.jpg",
    prepTime: "20 mins",
    cookTime: "10 mins",
    totalTime: "30 mins",
    servings: 4,
    category: "Asian",
    ingredients: [
      "1 lb flank steak, thinly sliced",
      "2 cups broccoli florets",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "4 cloves garlic, minced",
      "2 inch piece ginger, minced",
      "1/4 cup soy sauce",
      "2 tablespoons oyster sauce",
      "1 tablespoon sesame oil",
      "1 tablespoon cornstarch",
      "2 tablespoons vegetable oil",
      "Sesame seeds and green onions for garnish",
    ],
    instructions: [
      "Mix soy sauce, oyster sauce, sesame oil, and cornstarch for the sauce. Set aside.",
      "Slice beef thinly against the grain. Season with a pinch of salt.",
      "Heat vegetable oil in a wok over high heat until smoking.",
      "Add beef in a single layer. Sear for 1-2 minutes until browned. Remove and set aside.",
      "Add more oil if needed. Stir-fry broccoli and peppers for 2-3 minutes.",
      "Add garlic and ginger, cook for 30 seconds until fragrant.",
      "Return beef to wok. Pour in sauce and toss everything together.",
      "Cook for 1-2 minutes until sauce thickens. Garnish and serve over rice.",
    ],
  },
];

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}

export function searchRecipes(query: string): Recipe[] {
  const lowercaseQuery = query.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.category.toLowerCase().includes(lowercaseQuery),
  );
}

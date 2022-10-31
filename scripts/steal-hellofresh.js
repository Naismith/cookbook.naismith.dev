require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const util = require('util');

const recipesToSteal = [
  '631f483c5094b0ce6303a38f',
  '6317563e7402fd5b16074ef2',
  '6304934e5e85b9af920c1e75',
  '62fb5626a45357d0ea007a67',
  'www.hellofresh.ca/recipes/creamy-pork-gnocchi-62f0cb3156cd10ee4b0c2eb3',
];
const Authorization = process.env.Authorization;

const getUrl = (id) =>
  `https://www.hellofresh.ca/gw/api/recipes/${id}?country=ca&locale=en-CA`;
const getImagePath = (imagePath) =>
  `https://img.hellofresh.com/hellofresh_s3${imagePath}`;

const normalizeAmount = (amount) => {
  if (amount === 0.25) return '1/4';
  if (amount === 0.5) return '1/2';
  if (amount === 0.75) return '3/4';
  return amount.toString();
};

const getData = async () => {
  for await (const recipeToSteal of recipesToSteal) {
    try {
      let arr = recipeToSteal.split('-');
      let id = arr[arr.length - 1];
      const { data } = await axios.get(getUrl(id), {
        headers: { Authorization },
      });

      const filename = `hf-${data.slug}`;

      const yields = data.yields[0].ingredients.reduce((acc, ingredient) => {
        acc[ingredient.id] = `${normalizeAmount(ingredient.amount)} ${
          ingredient.unit
        }`;
        return acc;
      }, {});

      const recipe = {
        title: data.name,
        categories: ['hellofresh'],
        meta: {},
        images: [`../images/recipes/${filename}.jpg`],
        stars: null,
        source: data.link,
        ingredients: data.ingredients.map(
          (ingredient) => `${yields[ingredient.id]} - ${ingredient.name}`,
        ),
        directions: data.steps.reduce((acc, step) => {
          return [...acc, ...step.instructions.split('\n')];
        }, []),
      };

      const image = await axios({
        method: 'get',
        responseType: 'stream',
        url: getImagePath(data.imagePath),
      });

      image.data.pipe(fs.createWriteStream(`./${filename}.jpg`));
      fs.writeFile(
        `./${filename}.json`,
        JSON.stringify(recipe, null, 2),
        (err) => {
          console.log(err);
        },
      );

      console.log(getImagePath(data.imagePath));
    } catch (err) {
      console.log(err);
    }
  }
};

getData();

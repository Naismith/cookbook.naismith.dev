require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const util = require('util');

const recipesToSteal = [
  'www.hellofresh.ca/recipes/homestyle-chive-and-cheddar-biscuits-6269abc2cbcb19e01d0aff8b',
  'www.hellofresh.ca/recipes/cheesy-tex-mex-casserole-61640606ebdcce0d023479e2',
  'www.hellofresh.ca/recipes/bacon-and-butternut-squash-risotto-61486542d368c521f60de608',
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

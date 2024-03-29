export const fruits = [
    {
        name: "apple",
        pieces: "7pcs",
        price: 4.99,
        img: "https://hips.hearstapps.com/hmg-prod/images/apples-royalty-free-image-164084111-1537885595.jpg?crop=0.66667xw:1xh;center,top&resize=640:*",
    },
    {
        name: "banana",
        pieces: "7pcs",
        price: 4.99,
        img: "https://hips.hearstapps.com/hmg-prod/images/apples-royalty-free-image-164084111-1537885595.jpg?crop=0.66667xw:1xh;center,top&resize=640:*",
    },
    {
        name: "orange",
        pieces: "7pcs",
        price: 4.99,
        img: "https://hips.hearstapps.com/hmg-prod/images/apples-royalty-free-image-164084111-1537885595.jpg?crop=0.66667xw:1xh;center,top&resize=640:*",
    },
    {
        name: "pine apple",
        pieces: "7pcs",
        price: 4.99,
        img: "https://hips.hearstapps.com/hmg-prod/images/apples-royalty-free-image-164084111-1537885595.jpg?crop=0.66667xw:1xh;center,top&resize=640:*",
    },
];

export const regions = [
    {id: '1', name: 'Italian', img: 'https://www.destinavo.com/wp-content/uploads/2020/01/Italian-Food.jpg.webp'},
    {
        id: '2',
        name: 'Middle Eastern Food',
        img: 'https://kaleela.com/Content/BlogImages/small/middle-eastern-food-what-are-the-best-arabic-recipes.png'
    },
    {
        id: '3',
        name: 'Indian',
        img: 'https://images.moneycontrol.com/static-mcnews/2023/10/pexels-anil-sharma-10580198.jpg?impolicy=website&width=1600&height=900'
    },
    // Add more regions here
];

// Update the existing dishes array to include a region field
export const dishes = [
    {
        id: '1',
        name: 'Pizza Margherita',
        img: 'https://images.prismic.io/eataly-us/ed3fcec7-7994-426d-a5e4-a24be5a95afd_pizza-recipe-main.jpg?auto=compress,format',
        region: 'Italian'
    },
    {
        id: '2',
        name: 'Sushi',
        img: 'https://img.taste.com.au/lNnNoTvU/taste/2010/01/sushi-187034-1.jpg',
        region: 'Japanese'
    },
    {
        id: '3',
        name: 'Chicken Tikka Masala',
        img: 'https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Chicken-Tikka-Masala-square-FS-51.jpg',
        region: 'Indian'
    },
    {
        id: '4',
        name: 'Falafel',
        img: 'https://domesticfits.com/wp-content/uploads/2023/05/lebanese-food-Falafel-640x427.jpg',
        region: 'Middle Eastern Food'},
    {
        id: '5',
        name: 'Shawarma',
        img: 'https://domesticfits.com/wp-content/uploads/2023/05/middle-eastern-food-Shawarma-640x404.jpg',
        region: 'Middle Eastern Food'
    },
    {
      id: '6',
        name: 'Fettuccine Alfredo',
        img: 'https://images.aws.nestle.recipes/resized/0a0717810b73a1672a029c29788e557b_creamy_alfredo_pasta_long_left_1080_850.jpg',
        region: 'Italian'
    }

    // Add more dishes with regions here
];
export const ingredientsData = {
    '1': [
        {
            id: '1',
            ingredient: 'Flour',
            quantity: '2 cups',
            img: 'https://www.unlockfood.ca/EatRightOntario/media/Website-images-resized/All-about-grain-flours-resized.jpg',
            price: '5'
        },
        {
            id: '2',
            ingredient: 'Water',
            quantity: '1 cup',
            img: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-1/11178-Different_types_of_water_header-1296x728.jpg?w=1155&h=1528',
            price: '0'
        },
        // Add more ingredients for Pizza Margherita with price
    ],
    '3': [
        // Ingredients for Chicken Tikka Masala with price
    ],
    '4': [ // Adding ingredients for Falafel
        { id: '1', ingredient: 'Baking Powder', quantity: '1 teaspoon', img: '', price: '' },
        { id: '2', ingredient: 'Yellow Onion', quantity: '1 small, roughly chopped', img: '', price: '' },
        { id: '3', ingredient: 'Parsley', quantity: '1 cup, fresh', img: '', price: '' },
        { id: '4', ingredient: 'Cilantro', quantity: '½ cup, fresh', img: '', price: '' },
        { id: '5', ingredient: 'Dill', quantity: '¼ cup, fresh', img: '', price: '' },
        { id: '6', ingredient: 'Garlic', quantity: '6 cloves, peeled', img: '', price: '' },
        { id: '7', ingredient: 'Sesame Seeds', quantity: '2 tablespoons', img: '', price: '' },
        { id: '8', ingredient: 'Salt', quantity: '2 teaspoons', img: '', price: '' },
        { id: '9', ingredient: 'Cumin', quantity: '2 teaspoons', img: '', price: '' },
        { id: '10', ingredient: 'Coriander', quantity: '2 teaspoons', img: '', price: '' },
        { id: '11', ingredient: 'Black Pepper', quantity: '½ teaspoon', img: '', price: '' },
        { id: '12', ingredient: 'Red Chili Flakes or Aleppo Chili Flakes', quantity: '½ teaspoon', img: '', price: '' },
        // Note: Vegetable oil for frying is typically not listed with a quantity or price, but you could add it if you wish
    ],
    // Add more dishes and their ingredients here
};

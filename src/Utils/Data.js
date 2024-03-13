export const fruits = [
    {
        name: "apple",
        pieces: "7pcs",
        price: 4.99,
        img: "https://w7.pngwing.com/pngs/265/75/png-transparent-ipod-touch-apple-icon-format-icon-large-red-apples-closeup-of-red-apples-natural-foods-food-eating.png",
    },
    {
        name: "banana",
        pieces: "7pcs",
        price: 4.99,
        img: "https://e7.pngegg.com/pngimages/955/492/png-clipart-banana-powder-fruit-cavendish-banana-banana-yellow-banana-fruit-food-image-file-formats.png",
    },
    {
        name: "orange",
        pieces: "7pcs",
        price: 4.99,
        img: "https://w7.pngwing.com/pngs/1001/506/png-transparent-slices-of-oranges-orange-juice-flavor-fruit-nutritious-orange-natural-foods-food-orange.png",
    },
    {
        name: "pine apple",
        pieces: "7pcs",
        price: 4.99,
        img: "https://static.vecteezy.com/system/resources/previews/008/848/362/non_2x/fresh-pineapple-free-png.png",
    },
];

// data.js
export const dishes = [
    { id: '1', name: 'Pizza Margherita', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3kpureyKi-x64WuackOIYcNu-MOhpH-yXQw&usqp=CAU' },
    { id: '2', name: 'Sushi', img: 'https://www.justonecookbook.com/wp-content/uploads/2023/05/Vegetarian-Sushi-Rolls-9707-I-1.jpg' },
    { id: '3', name: 'Chicken Tikka Masala', img: 'https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Chicken-Tikka-Masala-square-FS-51.jpg' },
    // Add more dishes here
];

export const ingredientsData = {
    '1': [
        { id: '1', ingredient: 'Flour', quantity: '2 cups', img: 'https://www.unlockfood.ca/EatRightOntario/media/Website-images-resized/All-about-grain-flours-resized.jpg', price: '5' },
        { id: '2', ingredient: 'Water', quantity: '1 cup', img: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-1/11178-Different_types_of_water_header-1296x728.jpg?w=1155&h=1528', price: '0' },
        // Add more ingredients for Pizza Margherita with price
    ],
    '2': [
        // Ingredients for Sushi with price
    ],
    '3': [
        // Ingredients for Chicken Tikka Masala with price
    ],
    // Add more dishes and their ingredients here
};

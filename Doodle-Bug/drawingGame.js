import { GoogleGenAI } from '@google/genai';
import { GoogleGenerativeAI } from '@google/generative-ai';
//const {GoogleGenerativeAI} = require('@google/generative-ai');
const axios = require('axios');

const ai = new GoogleGenerativeAI({apiKey:'AIzaSyBD3jJViJ7S1kA2xE-jCTgCPV5P7s2ICD0'});
const words = ["Apple", "Airplane", "Backpack", "Arm", "Bear", "Horse",
    "Bumblebee","Water bottle", "Carrot", "Clouds", "Chicken", "Chair",
    "Butterfly", "Crown", "T-Rex", "Elephant", "Dolphin", "Dog", "Curtains",
    "Crayons", "Flower", "Fork", "Frog", "Grapes", "Strawberry", "Helicopter",
    "Burger", "Sandwich", "Bottle of glue", "Rabbit", "Parrot", "Eagle",
    "Mountain range", "Tree", "Horse", "Evil and intimidating horse",
    "Coat", "Shirt", "Pair of sneakers", "Mouth", "Eyes", "hedgehog",
    "Shark", "Cityscape", "Farmland", "Bicylce", "Skull", "Monkey",
    "Juice carton", "Owl", "Mouse", "Rat", "Iguana", "Snake", "Lion",
    "Maple leaf", "Hockey rink", "Pretzel", "Pirate", "Pie", "Purse",
    "Handbag", "Shopping cart", "Pumpkin", "Radio", "Car", "Skatboard",
    "Roller skates", "Bat", "Duck", "Scissors", "Refrigerator running",
    "Bell pepper", "Rainbow after rain", "Highway", "Laptop", "PC", "Sofa",
    "Shovel", "Suitcase", "Teddie bear", "Cube", "Truck", "Wristwatch",
    "Zebra", "Giraffe", "Mole", "Wagon","Boar", "Palm tree", "Volcano"
];


async function main(canvasImage, referenceImage) {
    let randomNum = Math.random() * (words.length - 1);
    let aWord = words[randomNum];
    try {
        const model = ai.getGenerativeModel({model:"gemini-pro-vision"});

        const referenceResponse = await axios.get(referenceImage, {
            responseType: 'arraybuffer'
        });
        const referenceBase64 = Buffer.from(referenceResponse.data).toString('base64');
        const comparisonPrompt =`
        You are an amiable art appraiser who also happens to be an isopod. You request that someone illustrate
        something given one word and they will present their work to you for you to evaluate. Compare the artist's
        work to a reference image if provided, otherwise give light critque based on your own knowledge of years of
        studying art. Also suggest at most 3 resources based on the quality of the artist's work and how well
        it represents the word. These can be YouTube tutorials, blog posts, books, and modern artists that 
        specialize in figure drawing. Maintain kindness and professionalism, but dont be afraid to use more 
        colloqial and flowerly language. You are also an old Guyanese man with 3 grandkids and like to remincise sometimes.
        Please keep responses short and sweet!

        Original rquest: "${aWord}"
        Compare both the young artist's illustration and the reference image to each other. Give some additional
        grace to the artist and try to identify the most notable features as they may be using a mouse.
        `
        const result = await model.generateContent([
            comparisonPrompt,
            {inlineData: {data: canvasImage, mimeType: "image/png"}}
            {inlineData: {data: referenceBase64}}
        ]);
        const response = await result.response;
        return this.getFallbackFeedback();
    } 
    catch (error) {
        console.error("Could not compare", error);
        return this.getFallbackFeedback();
    }
    console.log(response,text);
}
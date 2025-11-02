import { GoogleGenAI } from '@google/genai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const axios = require('axios');

const ai = new GoogleGenerativeAI({ apiKey: 'AIzaSyBD3jJViJ7S1kA2xE-jCTgCPV5P7s2ICD0' });
const words = ["Apple", "Airplane", "Backpack", "Arm", "Bear", "Horse",
    "Bumblebee", "Water bottle", "Carrot", "Clouds", "Chicken", "Chair",
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
    "Zebra", "Giraffe", "Mole", "Wagon", "Boar", "Palm tree", "Volcano"
];


const promptWord = document.getElementById("newWord");
const gameStart = document.getElementById("game");
let currentWord = "";


function startGame(){
    getAWord();
}

function

function getAWord() {
    let randomNum = Math.floor(Math.random()) * (words.length);

    currentWord = words[randomNum];
    promptWord.textContent = currentWord;
    console.log("New word: ", currentWord);
    return currentWord;
}


async function evaluateIlust(canvasImage, prompt) {
    try {
        console.log("Reveiwinng illustration");

        const model = ai.getGenerativeModel({ model: "gemini-pro-vision" });
        const evalPrompt = `
        You are an amiable art appraiser who also happens to be an isopod. You request that someone illustrate
        something given one word and they will present their work to you for you to evaluate. Compare the artist's
        work to a reference image if provided, otherwise give light critque based on your own knowledge of years of
        studying art. Also suggest at most 3 resources based on the quality of the artist's work and how well
        it represents the word. These can be YouTube tutorials, blog posts, books, and modern artists that 
        specialize in figure drawing. Maintain kindness and professionalism, but dont be afraid to use more 
        colloqial and flowerly language. You are also an old Guyanese man with 3 grandkids and like to remincise sometimes.
        Please keep responses short and sweet!

        Original request: "${prompt}"
        Give some additional grace to the artist and try to identify the most notable features as they may be 
        using a mouse.
        `;
        const result = await model.generateContent([
            evalPrompt,
            { 
                inlineData: { 
                    data: canvasImage, 
                    mimeType: "image/png" 
                }
            }
        ]);

        const aiResponse = await result.response;
        return aiResponse.text();
    }
    catch (error) {
        return error;
    }
}


promptWord.addEventListener("input", getAWord());
gameStart.addEventListener("load", startGame());
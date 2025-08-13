const prompt = require('prompt-sync')();
const fs = require('fs');

function loadQuestions() {
    try {
        const data = fs.readFileSync("questions.json", "utf8");
        return JSON.parse(data).questions;
    } catch (e) {
        console.log('Error loading the file...');
    }
}

function getRandomQuestions(questions, numQuestions) {
    if (numQuestions > questions.length) {
        numQuestions = questions.length;
    }

    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

function askQuestion(question) {
    console.log(question.question);

    for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i];
        console.log(`${i + 1}. ${option}`);
    }

    const choice = parseInt(prompt('Enter the option: '));
    const choiceValue = question.options[choice - 1];

    return choiceValue && choiceValue.trim().toLowerCase() === question.answer.trim().toLowerCase();
}

const questions = loadQuestions();
console.log("WELCOME TO THE QUIZ");
console.log("__________________________________________");

const numQuestions = parseInt(prompt("Enter the number of questions: "));
const randomQuestions = getRandomQuestions(questions, numQuestions);

let correct = 0;
const startTime = Date.now()

for(let question of randomQuestions){

    const isCorrect = askQuestion(question)
    if(isCorrect) correct ++

}
const totalTime = Date.now() - startTime
console.log('correct',correct)
console.log('time ',totalTime)
console.log('score', Math.round(correct / numQuestions * 100,2))
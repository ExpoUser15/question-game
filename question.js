const readline = require("readline");
const figlet = require("figlet");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const yellow = "\x1b[33m";
const red = "\x1b[31m";
const white = "\x1b[37m";
const green = "\x1b[32m";

const arr = [
  "What is 3 + 2?",
  "What is -2 + 3?",
  "What is the value of 4 x 4 x 4?",
  "what is the x value from 3x + 2 = 20?",
  "What is reciprocal of 3?",
  "If x = 2 and y = 3, What is the value of 2x + 10y - xy?",
  "Formula z = 2x + 5xy, rearrange the formula to make 'y' the subject!",
  "What is the result of −2y < −8?",
  "What is the result of 3(4 - y) ≥ 9?"
];

const answerArr = ["5", "1", "64", "6", "1/3", "28", "y=z-2x/5x", "y>4", "y<=1"];

function askQuestion(question, signal) {
  return new Promise((resolve) => {
    rl.question(question + " ", { signal }, (answer) => resolve(answer));
  });
}

let score = 0;

figlet("Welcome!", (err, data) => {
  if (err) throw err;
  console.log(data);

  console.log(
    `Answer the ${arr.length} questions bellow, in two minutes.`
  );

  rl.question("Are you ready?(y/n) ", async (ready) => {
    const input = ready.toLowerCase();
    if (input === "y" || input === "yes") {
      const ac = new AbortController();
      const signal = ac.signal;
      const answerTime = setTimeout(() => ac.abort(), 1000 * 60 * 2);
      signal.addEventListener(
        "abort",
        () => {
          console.log(red + "\n\nSorry, time out!");
          console.log(white);
          rl.close();
        },
        { once: true }
      );
      for (var i = 0; i < arr.length; i++) {
        console.log(`\n${yellow}Question ${i + 1}`);
        const userAnswer = await askQuestion(arr[i], signal);
        if (userAnswer === answerArr[i]) {
          score++;
          console.log(`Correct ${userAnswer}`);
        } else {
          console.log(
            `Wrong answer, The answer is ${answerArr[i]} not ${userAnswer} \n`
          );
        }
      }

      console.log(`\n\x1b[1m${green}Result`);
      console.log(`\x1b[1m${green}Correct Answer: `, `${score}/${arr.length}`);
      score = Math.floor((score / arr.length) * 100);
      console.log(`\x1b[1m${green}Your Score: `, score + "\n");

      clearTimeout(answerTime);

      console.log(`\n\x1b[1m${green}Thank You for playing!`);
      console.log("\x1b[0m");
      rl.close();
    } else {
      console.log(`\n\x1b[1m${green}Thank You for playing!`);
      console.log("\x1b[0m");
      rl.close();
    }
  });
});

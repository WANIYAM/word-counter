#! /usr/bin/env node

// Importing modules
import inquirer from "inquirer";
import chalk from "chalk";
import Table from 'cli-table';

// welcome note
console.log(chalk.yellow("\t\t\t\t\tWELCOME TO WORD COUNTER\t\t\t\t\t"));



// making function 
//Function for main menu 
async function mainMenu(){
 // TAKING USER INPUT
   let main =await inquirer.prompt(
        [
            {
                name:"menu",
                type:"list",
                choices:["word counter", "exit"]

            }
        ]
    );
    if (main.menu==="word counter"){
        let userText =await inquirer.prompt(
            [
                {
                    name:"text",
                    type:"input",
                    message:chalk.cyan.bold("Enter you text")
                }
            ]
        );
      // Create a new CLI table
        let table = new Table();
        table.push(

            { "Word Count": countWords(userText.text) },
            { "Character Count (with whitespace)": countCharactersWithWhitespace(userText.text) },
            { "Character Count (without whitespace)": countCharactersWithoutWhitespace(userText.text) },
            {"Unique Words Count": countUnique(userText.text).toString() } // Convert number to string 
        );
 
        // Display the table
         console.log(table.toString());
    }else{
        console.log(chalk.yellow("EXITING......\n \t\t\t\t\tTHANK YOU !!! HAVE A NICE DAY"));
        
    }
};
// Function to count words
function countWords(text: any) {
    if (!text) {
        return 0; // or handle the case based on your requirements
    }
    let words = text.trim().split(/\s+/);
    return words.length;
};

// Function to count characters including whitespace
function countCharactersWithWhitespace(text:any){
   return text.length
};

// Function to count characters excluding whitespace
function countCharactersWithoutWhitespace(text:any) {
    return text.replace(/\s/g, "").length;  // \/s/g : is used for searching and replacing whitespace characters in a string
};
// Function to count unique words
function countUnique(text: any){
    const words = new Set(text.trim().toLowerCase().split(/\s+/));
  return words.size;
};

// Function for recurrence 
async function repeat(){
    let question = await inquirer.prompt(
        [
            {
                name:"answer",
                type:"list",  
                message:"Do you want to restart?",
                choices:["yes", "no"]  
            }   
        ]
    );
    if (question.answer === "yes"){
        await mainMenu(); 
        await repeat();    
    } else {
        console.log(chalk.yellow("\t\t\t\t\tTHANK YOU FOR USING WORD COUNTER\t\t\t\t\t"));
    }
}

await mainMenu();
await repeat();
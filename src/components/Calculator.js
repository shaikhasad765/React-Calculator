// Importing necessary dependencies and components
import React, { useState } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import "./styles/Calculator.css";
import { evaluate, round } from "mathjs";

// Defining the Calculator component
function Calculator() {
    // Using React's state to manage the input and answer values
    const [input, setInput] = useState("");
    const [answer, setAnswer] = useState("");

    // Function to handle input from button clicks
    const inputHandler = (event) => {
        // If the answer is "Invalid Input!!", prevent further input
        if (answer === "Invalid Input!!") return;

        // Get the value of the clicked button
        let val = event.target.innerText;

        // Regular expression to match valid arithmetic operators
        const isOperator = /[+\-*/^x÷%]/;

        // Check if the new input and the last input are both operators
        const lastChar = input.charAt(input.length - 1);
        if (isOperator.test(val) && isOperator.test(lastChar)) {
            // Replace the last operator with the new one
            setInput((prev) => prev.slice(0, -1) + val);
        } else {
            // Otherwise, append the new input to the existing input
            let str = input + val;
            if (str.length > 14) return;

            // If there is a previous answer, use it as the new input and clear the answer
            if (answer !== "") {
                setInput(answer + val);
                setAnswer("");
            } else setInput(str);
        }
    };

    // Function to clear the input and answer
    const clearInput = () => {
        setInput("");
        setAnswer("");
    };

    // Function to check if brackets are balanced in the expression
    const checkBracketBalanced = (expr) => {
        let stack = [];
        for (let i = 0; i < expr.length; i++) {
            let x = expr[i];
            if (x === "(") {
                stack.push(x);
            } else if (x === ")") {
                if (stack.length === 0) return false;
                stack.pop();
            }
        }
        return stack.length === 0;
    };

    // Function to calculate the final answer of the expression
    const calculateAns = () => {
        if (input === "") return;
        let result = 0;
        let finalexpression = input;
        
        // Replace 'x' with '*', '÷' with '/', and '^' with '**'
        finalexpression = finalexpression.replace(/x/g, "*");
        finalexpression = finalexpression.replace(/÷/g, "/");
        finalexpression = finalexpression.replace(/\^/g, "**");

        // Evaluate square root expressions (e.g., √4 -> sqrt(4))
        let noSqrt = input.match(/√[0-9]+/gi);
        if (noSqrt !== null) {
            let evalSqrt = input;
            for (let i = 0; i < noSqrt.length; i++) {
                evalSqrt = evalSqrt.replace(noSqrt[i], `sqrt(${noSqrt[i].substring(1)})`);
            }
            finalexpression = evalSqrt;
        }

        try {
            // Check if brackets are balanced in the expression
            if (!checkBracketBalanced(finalexpression)) {
                const errorMessage = { message: "Brackets are not balanced!" };
                throw errorMessage;
            }

            // Replace '√' with 'sqrt()', 'log()' with 'log()', and 'log10()' with 'log() / log(10)'
            finalexpression = finalexpression.replace(/√([0-9.]+)/g, "sqrt($1)");
            finalexpression = finalexpression.replace(/log\(([0-9.]+)\)/g, "log($1)");
            finalexpression = finalexpression.replace(/log10\(([0-9.]+)\)/g, "log($1) / log(10)");

            // Use the mathjs library to evaluate the expression
            result = evaluate(finalexpression);
        } catch (error) {
            // Handle errors related to unbalanced brackets and invalid input
            result =
                error.message === "Brackets are not balanced!"
                    ? "Brackets are not balanced!"
                    : "Invalid Input!!";
        }
        // Round the result to 3 decimal places and update the answer state
        typeof result === "number" ? setAnswer(round(result, 3)) : setAnswer(result);
    };

    // Function to remove the last character from the input
    const backspace = () => {
        // If the answer is not empty, use it as the new input and clear the answer
        if (answer !== "") {
            setInput(answer.toString().slice(0, -1));
            setAnswer("");
        } else {
            // Otherwise, remove the last character from the input
            setInput((prev) => prev.slice(0, -1));
        }
    };

    // Function to change the prefix of the expression (+/-)
    const changePlusMinus = () => {
        // If the answer is "Invalid Input!!", prevent further input
        if (answer === "Invalid Input!!") return;
        else if (answer !== "") {
            // If there is a previous answer, change its prefix and use it as the new input
            let ans = answer.toString();
            setInput((prev) => (ans.charAt(0) === "-" ? "+" + ans.slice(1) : "-" + ans));
            setAnswer("");
        } else {
            // Otherwise, change the prefix of the input
            setInput((prev) => (prev.charAt(0) === "-" ? "+" + prev.slice(1) : "-" + prev));
        }
    };

    // Rendering the JSX for the Calculator component
    return (
        <>
            <div className="container">
                <div className="main">
                    {/* Display component to show the input and answer */}
                    <Display input={input} setInput={setInput} answer={answer} />
                    {/* Buttons component to handle button clicks */}
                    <Buttons
                        inputHandler={inputHandler}
                        clearInput={clearInput}
                        backspace={backspace}
                        changePlusMinus={changePlusMinus}
                        calculateAns={calculateAns}
                    />
                </div>
            </div>
        </>
    );
}

// Exporting the Calculator component to be used in other parts of the application
export default Calculator;

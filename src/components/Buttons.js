// Importing React and the CSS file for styling the buttons
import React from "react";
import "./styles/Buttons.css";

// Defining the Buttons component, which receives several functions as props to handle button clicks
const Buttons = ({ inputHandler, clearInput, backspace, changePlusMinus, calculateAns }) => {
    // Adding an event listener to the document for the "Enter" key to trigger the "=" button click
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("equalbtn").click();
        }
    });

    // Returning the JSX code for the buttons with their respective click handlers
    return (
        <div className="show-btn">
            {/* Buttons for special mathematical expressions */}
            <button className="btn exp" onClick={inputHandler}>
                ^
            </button>
            <button className="btn exp" onClick={inputHandler}>
                (
            </button>
            <button className="btn exp" onClick={inputHandler}>
                )
            </button>
            <button className="btn exp" onClick={inputHandler}>
                √
            </button>
            <button className="btn exp" onClick={inputHandler}>
                x<sup>2</sup>
            </button>
            
            {/* Buttons for clearing the input */}
            <button className="btn clr" onClick={clearInput}>
                AC
            </button>
            <button className="btn clr" onClick={backspace}>
                {/* An image for the backspace functionality */}
                <img src="https://cdn-icons-png.flaticon.com/128/10023/10023704.png" alt="" />
            </button>
            
            {/* Button for the "log" function */}
            <button className="btn exp" onClick={() => inputHandler({ target: { innerText: "log(" } })}>
                log
            </button>
            
            {/* Buttons for basic arithmetic operations */}
            <button className="btn expdivide" onClick={inputHandler}>
                ÷
            </button>
            <button className="btn exp" onClick={inputHandler}>
                %
            </button>
            <button className="btn" onClick={inputHandler}>
                7
            </button>
            <button className="btn" onClick={inputHandler}>
                8
            </button>
            <button className="btn" onClick={inputHandler}>
                9
            </button>
            <button className="btn expmultiply" onClick={inputHandler}>
                x
            </button>
            <button className="btn exp" onClick={inputHandler}>
                x<sup>3</sup>
            </button>
            <button className="btn" onClick={inputHandler}>
                4
            </button>
            <button className="btn" onClick={inputHandler}>
                5
            </button>
            <button className="btn" onClick={inputHandler}>
                6
            </button>
            <button className="btn expminus" onClick={inputHandler}>
                -
            </button>
            <button className="btn exp" onClick={inputHandler}>
                <sup>3</sup>√
            </button>
            <button className="btn" onClick={inputHandler}>
                1
            </button>
            <button className="btn" onClick={inputHandler}>
                2
            </button>
            <button className="btn" onClick={inputHandler}>
                3
            </button>
            <button className="btn expplus" onClick={inputHandler}>
                +
            </button>
            <button className="btn exp" onClick={inputHandler}>
                !
            </button>
            
            {/* Button to change the sign of the input value (+/-) */}
            <button className="btn exp" onClick={changePlusMinus}>
                ±
            </button>
            
            {/* Buttons for zero, decimal point, and the equal sign */}
            <button className="btn" onClick={inputHandler}>
                0
            </button>
            <button className="btn exp" onClick={inputHandler}>
                .
            </button>
            <button className="btn expequal equal" id="equalbtn" onClick={calculateAns}>
                =
            </button>
        </div>
    );
};

// Exporting the Buttons component to be used in other parts of the application
export default Buttons;

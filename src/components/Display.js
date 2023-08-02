// Importing React and the CSS file for styling the display area
import React from "react";
import "./styles/Display.css";

// Defining the Display component, which receives the current input, setInput function, and answer as props
const Display = ({ input, setInput, answer }) => {
    // Function to handle changes in the input tag
    const onChangeTagInput = (e) => {
        // Regular expression to validate the input value
        const re = /^[!%(-+\x2D-9^glox\xF7\u221A]+$/;
        
        // Get the new value entered in the input tag
        const newValue = e.target.value;

        // Remove any consecutive arithmetic operators to avoid invalid inputs
        const cleanedValue = newValue.replace(/[-+*/x÷]{2,}/g, (match) => match[1]);

        // Check if the cleanedValue is valid or an empty string
        if (cleanedValue === "" || re.test(cleanedValue)) {
            // Update the input state with the cleaned value
            setInput(cleanedValue);
        }
    };

    // Returning the JSX code for the display area
    return (
        <>
        <div className="display">
            {/* The calculator heading */}
            <h2 className="calculator-heading">
                <img 
                    src="https://cdn-icons-png.flaticon.com/128/10544/10544734.png" 
                    alt=""
                    style={{
                        width: "50px",
                        height: "50px",
                        paddingRight: "5px"
                    }}
                /> 
                React Calculator
            </h2>
            
            {/* Conditional rendering based on whether there is an answer */}
            {answer === "" ? (
            <>
                {/* Input field for entering the calculation */}
                <input
                    type="text"
                    name="input"
                    className="input"
                    style={{ padding: "29px" }}
                    value={input}
                    placeholder="0"
                    maxLength={12}
                    // disabled
                    onChange={onChangeTagInput}
                    autoComplete="off"
                />
            </>
            ) : (
            <>
                {/* Displaying the input and the answer */}
                <input
                    type="text"
                    name="input"
                    className="value"
                    value={input}
                    placeholder="0"
                    maxLength={12}
                    disabled
                />
                <input
                    type="text"
                    name="value"
                    className="input"
                    value={answer}
                    disabled
                />
            </>
            )}
        </div>
        </>
    );
};

// Exporting the Display component to be used in other parts of the application
export default Display;

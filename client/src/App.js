import React, { useState } from "react";
import axios from "axios";

function App() {
    const [number, setNumber] = useState("");
    const [romanNumeral, setRomanNumeral] = useState("");
    const [error, setError] = useState("");

    const convertNumber = async () => {
        if (!number) {
            setError("Please enter a number between 1 and 3999.");
            return;
        }
        setError(""); 

        try {
            const response = await axios.get("http://localhost:8080/romannumeral?query=" + number);
            console.log("Fetching:", `http://localhost:8080/romannumeral?query=${number}`);
            setRomanNumeral(response.data.output);
        } catch (err) {
          console.log("API Error:", err.response ? err.response.data : err.message);
            setRomanNumeral("");
            setError("Invalid input. Please enter a number between 1 and 3999.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Roman Numeral Converter</h1>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a number"
            />
            <button onClick={convertNumber}>Convert</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {romanNumeral && <h2>Output: {romanNumeral}</h2>}
        </div>
    );
}

export default App;
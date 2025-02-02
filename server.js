const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());

function convertToRoman(num) {
    const romanNumerals = [
        { value: 1000, numeral: "M" },
        { value: 900, numeral: "CM" },
        { value: 500, numeral: "D" },
        { value: 400, numeral: "CD" },
        { value: 100, numeral: "C" },
        { value: 90, numeral: "XC" },
        { value: 50, numeral: "L" },
        { value: 40, numeral: "XL" },
        { value: 10, numeral: "X" },
        { value: 9, numeral: "IX" },
        { value: 5, numeral: "V" },
        { value: 4, numeral: "IV" },
        { value: 1, numeral: "I" }
    ];
    let result = "";
    for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i].value) {
            result += romanNumerals[i].numeral;
            num -= romanNumerals[i].value;
        }
    }
    return result;
}

app.get('/romannumeral', (req, res) => {
    const query = req.query.query;

    const number = parseInt(query, 10);
    if (isNaN(number) || number < 1 || number > 3999) {
        return res.status(400).json({ error: "Invalid input. Please enter a number between 1 and 3999." });
    }
    const romanNumeral = convertToRoman(number);

    res.json({ input: query, output: romanNumeral });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
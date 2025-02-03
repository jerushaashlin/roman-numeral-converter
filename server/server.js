const express = require("express");
const cors = require("cors");
const logger = require("./logger"); 

const app = express();
app.use(cors());

// Logs every request
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Function to Convert Number to Roman Numeral
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

// Health Check 
app.get("/health", (req, res) => {
  logger.info("Health check accessed");
  res.json({ status: "ok", uptime: process.uptime(), timestamp: Date.now() });
});

// API for Roman Numeral Conversion 
app.get("/romannumeral", (request, response) => {
  const query = request.query.query;

  const number = parseInt(query, 10);
  if (isNaN(number) || number < 1 || number > 3999) {
    logger.warn(`Invalid input: ${query}`); // Logs invalid attempts
    return response.status(400).json({ error: "Invalid input. Please enter a number between 1 and 3999." });
  }

  const romanNumeral = convertToRoman(number);
  logger.info(`Converted ${query} to ${romanNumeral}`);

  response.json({ input: query, output: romanNumeral });
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
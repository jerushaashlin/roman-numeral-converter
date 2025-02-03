import React, { useState } from "react";
import { Provider, defaultTheme, TextField, Button, Heading, View, Well, Content, Flex } from "@adobe/react-spectrum";
import axios from "axios";

function App() {
  const [number, setNumber] = useState("");
  const [romanNumeral, setRomanNumeral] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Detect system theme (Dark/Light Mode)
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Added Validation Logic
  const isValidNumber = number && !isNaN(number) && number >= 1 && number <= 3999;
  const isInvalidInput = number.includes("-") || number === "0" || number > 3999;

  const convertNumber = async () => {
      if (!isValidNumber) {
          setError("Please enter a valid number between 1 and 3999.");
          setRomanNumeral("");
          return;
      }

      setLoading(true);
      setError("");

      try {
          const response = await axios.get(`http://localhost:8080/romannumeral?query=${number}`);
          setRomanNumeral(response.data.output);
      } catch (err) {
          setError("Error fetching data. Please try again.");
      } finally {
          setLoading(false);
      }
  };

  return (
      <Provider theme={defaultTheme} colorScheme={prefersDark ? "dark" : "light"}>
          <View padding="size-400" maxWidth="size-4600" margin="auto">
              <Flex direction="column" alignItems="center" gap="size-300">
                  <Heading level={1}>Roman Numeral Converter</Heading>

                  {/* Input Field with Realtime Validation */}
                  <TextField
                      label="Enter a number (1-3999)"
                      type="text" 
                      value={number}
                      onChange={setNumber}
                      width="size-3600"
                      necessityIndicator="label"
                      validationState={isValidNumber ? "valid" : isInvalidInput ? "invalid" : null} 
                      errorMessage={isInvalidInput ? "Invalid input: Please enter a number between 1 and 3999." : ""}
                  />

                  {/* Convert Button */}
                  <Button variant="cta" onPress={convertNumber} isDisabled={!isValidNumber || loading} width="size-2400">
                      {loading ? "Converting..." : "Convert"}
                  </Button>

                  {/* Display Result */}
                  {romanNumeral && (
                      <Well marginTop="size-200">
                          <Content>
                              <Heading level={2}>Roman Numeral: {romanNumeral}</Heading>
                          </Content>
                      </Well>
                  )}
              </Flex>
          </View>
      </Provider>
  );
}

export default App;
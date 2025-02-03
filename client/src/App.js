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

    const convertNumber = async () => {
        if (!number || number < 1 || number > 3999) {
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
                   
                    {/* Input Field */}
                    <TextField
                        label="Enter a number (1-3999)"
                        type="number"
                        value={number}
                        onChange={setNumber}
                        width="size-3600"
                        necessityIndicator="label"
                        validationState={error ? "invalid" : "valid"}
                    />
                   
                    {/* Convert Button */}
                    <Button variant="cta" onPress={convertNumber} isDisabled={loading} width="size-2400">
                        {loading ? "Converting..." : "Convert"}
                    </Button>
                   
                    {/* Display Result */}
                    {error && (
                        <Well marginTop="size-200" backgroundColor="negative">
                            <Content>{error}</Content>
                        </Well>
                    )}
                   
                    {romanNumeral && (
                        <Well marginTop="size-200" backgroundColor="positive">
                            <Content>Roman Numeral: {romanNumeral}</Content>
                        </Well>
                    )}
                </Flex>
            </View>
        </Provider>
    );
}

export default App;
import React, { useState } from "react";
import { Provider, defaultTheme, lightTheme, darkTheme, TextField, Button, Heading, View, Well, Content, Flex } from "@adobe/react-spectrum";
import axios from "axios";

function App() {
    const [number, setNumber] = useState("");
    const [romanNumeral, setRomanNumeral] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Detect system color mode
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme;

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
        <Provider theme={systemTheme}>
            <View padding="size-200" maxWidth="size-3600" margin="auto">
                <Heading level={1}>Roman Numeral Converter</Heading>
                <Flex direction="column" gap="size-200">
                    <TextField
                        label="Enter a number (1-3999)"
                        type="number"
                        value={number}
                        onChange={setNumber}
                        width="100%"
                    />
                    <Button variant="cta" onPress={convertNumber} isDisabled={loading}>
                        {loading ? "Converting..." : "Convert"}
                    </Button>
                    {error && (
                        <Well marginTop="size-200" backgroundColor="negative">
                            {error}
                        </Well>
                    )}
                    {romanNumeral && (
                        <Well marginTop="size-200" backgroundColor="positive">
                            <Content>Result: {romanNumeral}</Content>
                        </Well>
                    )}
                </Flex>
            </View>
        </Provider>
    );
}

export default App;
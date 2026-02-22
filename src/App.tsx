import { useState } from "react";
import { Container, CssBaseline, Typography, Button } from "@mui/material";
import { RevealCard } from "./RevealCard";
import { questions } from "./data/questions";

const App = () => {
    const [index, setIndex] = useState(0);

    const nextQuestion = () => {
        setIndex((prev) => (prev + 1) % questions.length);
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ py: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                    Quizpoker Test
                </Typography>

                <RevealCard
                    key={index}
                    item={questions[index]}
                />
                <Button
                    sx={{ mt: 3 }}
                    variant="outlined"
                    fullWidth
                    onClick={nextQuestion}
                >
                    Nächste Frage
                </Button>
            </Container>
        </>
    );
};

export default App;
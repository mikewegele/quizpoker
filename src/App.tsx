import {useMemo, useState} from "react";
import { Box, Button, CssBaseline, Stack, ThemeProvider, Typography, createTheme } from "@mui/material";
import { RevealCard } from "./RevealCard";
import { questions } from "./data/questions";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#f2c94c" }, // gold-ish
        success: { main: "#2ecc71" },
        background: { default: "#052e1b", paper: "#0b3d26" }, // felt-ish
    },
    typography: {
        fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    },
});

const shuffleArray = <T,>(array: T[]): T[] => {
    const result = [...array]

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
    }

    return result
}

const App = () => {
    const [index, setIndex] = useState(0);


    const shuffledQuestions = useMemo(() => {
        return shuffleArray(questions)
    }, [questions]);

    const nextQuestion = () => setIndex((p) => (p + 1) % shuffledQuestions.length);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                    py: 3,
                    background: `
            radial-gradient(1200px 600px at 50% 35%, rgba(255,255,255,0.10), rgba(0,0,0,0) 60%),
            radial-gradient(900px 500px at 50% 85%, rgba(0,0,0,0.35), rgba(0,0,0,0) 55%),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 6px, rgba(0,0,0,0.02) 6px, rgba(0,0,0,0.02) 12px),
            radial-gradient(circle at 50% 40%, #0e5a35 0%, #063822 45%, #041f14 100%)
          `,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 520,
                        borderRadius: 6,
                        p: 2,
                        background: `
              linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.55)),
              radial-gradient(circle at 30% 20%, rgba(255,255,255,0.10), rgba(0,0,0,0) 55%)
            `,
                        boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
                        position: "relative",
                    }}
                >
                    {/* Holzrahmen */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: -10,
                            borderRadius: 7,
                            background: `
                linear-gradient(180deg, #7a4b22, #4c2a10),
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), rgba(0,0,0,0) 45%)
              `,
                            filter: "saturate(1.1)",
                            boxShadow: "0 18px 40px rgba(0,0,0,0.65)",
                            zIndex: -1,
                        }}
                    />

                    <Stack spacing={2}>
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontWeight: 800,
                                letterSpacing: 1,
                                textTransform: "uppercase",
                                fontSize: 14,
                                opacity: 0.9,
                            }}
                        >
                            Quizpoker
                        </Typography>

                        {/* key={index} resettet die RevealCard bei neuer Frage */}
                        <RevealCard key={index} item={shuffledQuestions[index]} />

                        <Button
                            variant="contained"
                            onClick={nextQuestion}
                            fullWidth
                            sx={{
                                borderRadius: 999,
                                py: 1.2,
                                fontWeight: 800,
                                textTransform: "none",
                                background: "linear-gradient(180deg, #f2c94c, #d4a017)",
                                color: "#1b1b1b",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
                                "&:hover": {
                                    background: "linear-gradient(180deg, #ffd66b, #e2b22a)",
                                },
                            }}
                        >
                            Nächste Karte
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default App;
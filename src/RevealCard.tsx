import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import type { QuizItem } from "./types";

type Props = {
    item: QuizItem;
};

const ChipButton = (props: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: "gold" | "red" | "blue" | "green";
}) => {
    const { label, onClick, disabled, variant = "gold" } = props;

    const styles: Record<string, any> = {
        gold: {
            background: "radial-gradient(circle at 30% 30%, #ffe08a 0%, #f2c94c 35%, #b88400 100%)",
            color: "#1b1b1b",
            border: "2px solid rgba(255,255,255,0.35)",
        },
        red: {
            background: "radial-gradient(circle at 30% 30%, #ff8a8a 0%, #ff4d4d 35%, #9b1c1c 100%)",
            color: "#1b1b1b",
            border: "2px solid rgba(255,255,255,0.30)",
        },
        blue: {
            background: "radial-gradient(circle at 30% 30%, #9fd2ff 0%, #4aa3ff 35%, #1f4b8f 100%)",
            color: "#07121f",
            border: "2px solid rgba(255,255,255,0.30)",
        },
        green: {
            background: "radial-gradient(circle at 30% 30%, #a9f5c0 0%, #2ecc71 35%, #0f6b34 100%)",
            color: "#071a10",
            border: "2px solid rgba(255,255,255,0.30)",
        },
    };

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            fullWidth
            sx={{
                borderRadius: 999,
                py: 1.1,
                fontWeight: 900,
                textTransform: "none",
                letterSpacing: 0.2,
                boxShadow: "0 12px 28px rgba(0,0,0,0.55)",
                ...styles[variant],
                "&:hover": disabled
                    ? {}
                    : {
                        transform: "translateY(-1px)",
                        boxShadow: "0 16px 34px rgba(0,0,0,0.60)",
                    },
                transition: "transform 120ms ease, box-shadow 120ms ease",
            }}
        >
            {label}
        </Button>
    );
};

export const RevealCard = ({ item }: Props) => {
    const [showHint1, setShowHint1] = useState(false);
    const [showHint2, setShowHint2] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <Box
            sx={{
                position: "relative",
                borderRadius: 5,
                p: 2,
            }}
        >
            {/* Kartenstapel-Illusion */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 5,
                    transform: "translate(10px, 10px) rotate(1.3deg)",
                    background: "linear-gradient(180deg, #e9e9e9, #cfcfcf)",
                    opacity: 0.22,
                    boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 5,
                    transform: "translate(-8px, 8px) rotate(-1.1deg)",
                    background: "linear-gradient(180deg, #f0f0f0, #d7d7d7)",
                    opacity: 0.18,
                    boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                }}
            />

            {/* Hauptkarte */}
            <Box
                sx={{
                    position: "relative",
                    borderRadius: 5,
                    p: 2.2,
                    background: "linear-gradient(180deg, #ffffff, #e8e8e8)",
                    color: "#121212",
                    boxShadow: "0 22px 60px rgba(0,0,0,0.65)",
                    overflow: "hidden",
                }}
            >
                {/* Karten-Glanz */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: -80,
                        background:
                            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.85), rgba(255,255,255,0) 55%)",
                        transform: "rotate(12deg)",
                        opacity: 0.55,
                        pointerEvents: "none",
                    }}
                />

                <Stack spacing={2.2} sx={{ position: "relative" }}>
                    <Typography sx={{ fontWeight: 900, fontSize: 18, textAlign: "center" }}>
                        {item.question}
                    </Typography>

                    <Box
                        sx={{
                            height: 2,
                            borderRadius: 2,
                            background: "linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0.25), rgba(0,0,0,0))",
                        }}
                    />

                    <ChipButton
                        label={showHint1 ? "Hinweis 1 aufgedeckt" : "Hinweis 1 aufdecken"}
                        onClick={() => setShowHint1(true)}
                        disabled={showHint1}
                        variant="blue"
                    />

                    <Box
                        sx={{
                            borderRadius: 3,
                            p: 1.6,
                            background: "rgba(0,0,0,0.05)",
                            border: "1px dashed rgba(0,0,0,0.25)",
                            minHeight: 56,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <Typography sx={{ fontWeight: 700 }}>
                            {showHint1 ? item.hint1 : "Hinweis 1 ist noch verdeckt"}
                        </Typography>
                    </Box>

                    <ChipButton
                        label={showHint2 ? "Hinweis 2 aufgedeckt" : "Hinweis 2 aufdecken"}
                        onClick={() => setShowHint2(true)}
                        disabled={!showHint1 || showHint2}
                        variant="red"
                    />

                    <Box
                        sx={{
                            borderRadius: 3,
                            p: 1.6,
                            background: "rgba(0,0,0,0.05)",
                            border: "1px dashed rgba(0,0,0,0.25)",
                            minHeight: 56,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <Typography sx={{ fontWeight: 700 }}>
                            {showHint2 ? item.hint2 : "Hinweis 2 ist noch verdeckt"}
                        </Typography>
                    </Box>

                    <ChipButton
                        label={showAnswer ? "Lösung aufgedeckt" : "Lösung aufdecken"}
                        onClick={() => setShowAnswer(true)}
                        disabled={!showHint2 || showAnswer}
                        variant="green"
                    />

                    <Box
                        sx={{
                            borderRadius: 3,
                            p: 1.8,
                            background: showAnswer ? "rgba(46, 204, 113, 0.18)" : "rgba(0,0,0,0.05)",
                            border: showAnswer ? "1px solid rgba(46, 204, 113, 0.55)" : "1px dashed rgba(0,0,0,0.25)",
                            minHeight: 64,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                            {showAnswer ? item.answer : "Antwort ist noch verdeckt"}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};
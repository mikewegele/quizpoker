import { useMemo, useState } from "react";
import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import type { QuizItem } from "./types";

type Props = {
    item: QuizItem;
};

export const RevealCard = (props: Props) => {
    const { item } = props;

    const [showHint1, setShowHint1] = useState(false);
    const [showHint2, setShowHint2] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const canShowHint2 = showHint1;
    const canShowAnswer = showHint2;

    const status = useMemo(() => {
        if (showAnswer) return "Lösung aufgedeckt";
        if (showHint2) return "Hinweis 2 aufgedeckt";
        if (showHint1) return "Hinweis 1 aufgedeckt";
        return "Nur Frage";
    }, [showHint1, showHint2, showAnswer]);

    const reset = () => {
        setShowHint1(false);
        setShowHint2(false);
        setShowAnswer(false);
    };

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="overline" sx={{ opacity: 0.7 }}>
                        {status}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Frage
                    </Typography>
                    <Typography>{item.question}</Typography>

                    <Divider />

                    <Stack spacing={1.5}>
                        <Button
                            variant="contained"
                            onClick={() => setShowHint1(true)}
                            disabled={showHint1}
                            fullWidth
                        >
                            Hinweis 1 aufdecken
                        </Button>

                        {showHint1 ? (
                            <Typography>1. Hinweis: {item.hint1}</Typography>
                        ) : (
                            <Typography sx={{ opacity: 0.5 }}>1. Hinweis ist noch verdeckt</Typography>
                        )}

                        <Button
                            variant="contained"
                            onClick={() => setShowHint2(true)}
                            disabled={!canShowHint2 || showHint2}
                            fullWidth
                        >
                            Hinweis 2 aufdecken
                        </Button>

                        {showHint2 ? (
                            <Typography>2. Hinweis: {item.hint2}</Typography>
                        ) : (
                            <Typography sx={{ opacity: 0.5 }}>2. Hinweis ist noch verdeckt</Typography>
                        )}

                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => setShowAnswer(true)}
                            disabled={!canShowAnswer || showAnswer}
                            fullWidth
                        >
                            Lösung aufdecken
                        </Button>

                        {showAnswer ? (
                            <Typography sx={{ fontWeight: 700 }}>Antwort: {item.answer}</Typography>
                        ) : (
                            <Typography sx={{ opacity: 0.5 }}>Antwort ist noch verdeckt</Typography>
                        )}

                        <Button variant="outlined" onClick={reset} fullWidth>
                            Reset
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};
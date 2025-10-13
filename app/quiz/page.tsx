"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Stack,
  Fade,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

type Option = {
  option_id: number;
  option_text: string;
  is_correct: boolean;
};

type Explanation = {
  explanation_id: number;
  explanation_text: string;
};

type Question = {
  question_id: number;
  question_text: string;
  options: Option[];
  explanations: Explanation[];
  image?: string;
};

export default function QuizPage() {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const [fadeKey, setFadeKey] = useState(0);

  // Retrieve question data from the backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          "https://floodfighterbackend.onrender.com/quiz"
        ); // all questions
        const allQuestions = res.data;
        // Randomly select 10 questions
        const shuffled = allQuestions.sort(() => 0.5 - Math.random());
        setQuizData(shuffled.slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch quiz data", err);
      }
    };
    fetchQuiz();
  }, []);

  if (quizData.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        Loading Quiz...
      </Box>
    );
  }

  const handleAnswer = (option: Option) => {
    setSelected(option);
    if (option.is_correct) setScore((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelected(null);
      setFadeKey((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
    setFadeKey((prev) => prev + 1);
  };

  const current = quizData[currentQuestion];
  const correctOption = current.options.find((o) => o.is_correct);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      bgcolor="#e3f2fd"
      p={3}
    >
      <Card
        sx={{
          maxWidth: 1200,
          width: "100%",
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        {!showResult ? (
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            {/* left side pics */}
            <Box
              sx={{
                width: { xs: "100%", md: "41.67%" },
                bgcolor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: { xs: 250, md: 600 },
                position: "relative",
              }}
            >
              <Fade in={true} timeout={500} key={fadeKey}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {current.image && (
                    <img
                      src={current.image}
                      alt={`Question ${currentQuestion + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      bgcolor: "rgba(25, 118, 210, 0.9)",
                      color: "white",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Question {currentQuestion + 1} / {quizData.length}
                  </Box>
                </Box>
              </Fade>
            </Box>

            {/* right side questions */}
            <Box sx={{ width: { xs: "100%", md: "58.33%" } }}>
              <CardContent sx={{ p: 4, height: "100%" }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Flood Awareness Quiz
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={((currentQuestion + 1) / quizData.length) * 100}
                  sx={{ mb: 3, height: 8, borderRadius: 4 }}
                />

                <Fade in={true} timeout={300} key={fadeKey}>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                      <Box
                        component="span"
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                      >
                        Question {currentQuestion + 1}:
                      </Box>{" "}
                      {current.question_text}
                    </Typography>

                    <Stack spacing={2}>
                      {current.options.map((option) => {
                        const isCorrectAns = selected && option.is_correct;
                        const isWrong =
                          selected &&
                          selected.option_id === option.option_id &&
                          !option.is_correct;

                        return (
                          <Button
                            key={option.option_id}
                            variant="outlined"
                            onClick={() => handleAnswer(option)}
                            disabled={!!selected}
                            sx={{
                              py: 1.5,
                              px: 2,
                              justifyContent: "flex-start",
                              textAlign: "left",
                              color: isCorrectAns
                                ? "#2E7D32"
                                : isWrong
                                ? "#C62828"
                                : "text.primary",
                              bgcolor: isCorrectAns
                                ? alpha("#4CAF50", 0.15)
                                : isWrong
                                ? alpha("#F44336", 0.15)
                                : "transparent",
                              borderColor: isCorrectAns
                                ? "#4CAF50"
                                : isWrong
                                ? "#F44336"
                                : "rgba(0,0,0,0.23)",
                              borderWidth: isCorrectAns || isWrong ? 2 : 1,
                              fontWeight:
                                selected && (isCorrectAns || isWrong)
                                  ? "bold"
                                  : "normal",
                              textTransform: "none",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor: isCorrectAns
                                  ? alpha("#4CAF50", 0.25)
                                  : isWrong
                                  ? alpha("#F44336", 0.25)
                                  : alpha("#1976d2", 0.08),
                                borderWidth: 2,
                              },
                            }}
                          >
                            {option.option_text}
                          </Button>
                        );
                      })}
                    </Stack>

                    {selected && (
                      <Fade in={true}>
                        <Box mt={3}>
                          {selected.is_correct ? (
                            <Box
                              p={2}
                              bgcolor={alpha("#4CAF50", 0.1)}
                              borderRadius={2}
                              border="2px solid #4CAF50"
                              mb={2}
                            >
                              <Typography
                                variant="h6"
                                color="success.main"
                                fontWeight="bold"
                              >
                                ✅ Correct!
                              </Typography>
                            </Box>
                          ) : (
                            <Box
                              p={2}
                              bgcolor="#fff3e0"
                              borderRadius={2}
                              border="2px solid #ffb74d"
                              mb={2}
                            >
                              <Typography
                                variant="body1"
                                color="text.primary"
                                fontWeight="bold"
                                mb={1}
                              >
                                ❌ Incorrect
                              </Typography>
                              <Typography variant="body1" mb={1}>
                                <strong>Correct Answer:</strong>{" "}
                                {correctOption?.option_text}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                💡{" "}
                                {current.explanations
                                  .map((e) => e.explanation_text)
                                  .join(" ")}
                              </Typography>
                            </Box>
                          )}

                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNextQuestion}
                            fullWidth
                            size="large"
                            sx={{ py: 1.5 }}
                          >
                            {currentQuestion + 1 < quizData.length
                              ? "Next Question →"
                              : "View Results 🎯"}
                          </Button>
                        </Box>
                      </Fade>
                    )}
                  </Box>
                </Fade>
              </CardContent>
            </Box>
          </Box>
        ) : (
          <CardContent sx={{ p: 6 }}>
            <Box textAlign="center">
              <Typography variant="h4" gutterBottom fontWeight="bold">
                🎉 Quiz Completed!
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                gutterBottom
                sx={{ my: 3 }}
              >
                Your Score: {score} / {quizData.length}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                {score === quizData.length
                  ? "Perfect score! Outstanding! 🌟"
                  : score >= quizData.length * 0.7
                  ? "Great job! Well done! 👏"
                  : "Keep practicing! You'll improve! 💪"}
              </Typography>
              <Button
                variant="contained"
                onClick={handleRestart}
                size="large"
                sx={{ px: 6, py: 1.5 }}
              >
                🔄 Restart Quiz
              </Button>
            </Box>
          </CardContent>
        )}
      </Card>
    </Box>
  );
}

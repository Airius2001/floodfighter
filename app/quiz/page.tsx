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
  Fade,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// special effect
import Confetti from "react-confetti";

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
        );
        const allQuestions = res.data;
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
          maxWidth: 800,
          width: "100%",
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
          textAlign: "center",
          p: 3,
        }}
      >
        {!showResult ? (
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Flood Awareness Quiz
            </Typography>

            <LinearProgress
              variant="determinate"
              value={((currentQuestion + 1) / quizData.length) * 100}
              sx={{
                mb: 3,
                height: 8,
                borderRadius: 4,
              }}
            />

            <Fade in={true} timeout={1000} key={fadeKey}>
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    mb: 3,
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                >
                  Question {currentQuestion + 1}:
                </Typography>

                <Typography variant="body1" mb={4}>
                  {current.question_text}
                </Typography>

                {/* Fixed layout with two options per row */}
                <Box>
                  {/* First line: Options 0 and 1 */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    {current.options.slice(0, 2).map((option) => {
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
                            flex: "1 1 50%",
                            minWidth: 0,
                            py: 2.5,
                            px: 2,
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            fontSize: "0.9rem",
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            lineHeight: 1.3,
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
                  </Box>

                  {/* Second row: Options 2 and 3 */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    {current.options.slice(2, 4).map((option) => {
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
                            flex: "1 1 50%",
                            minWidth: 0,
                            py: 2.5,
                            px: 2,
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            fontSize: "0.9rem",
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            lineHeight: 1.3,
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
                  </Box>
                </Box>

                {selected && (
                  <Fade in={true}>
                    <Box mt={4}>
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
                          <Typography variant="body2" color="text.secondary">
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
        ) : (
          <CardContent sx={{ p: 6 }}>
            <Box textAlign="center">
              <Confetti recycle={false} numberOfPieces={500} gravity={0.2} />
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

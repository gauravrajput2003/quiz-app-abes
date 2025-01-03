// src/components/Trivia.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addScoreToLeaderboard } from '../assets/leaderboardSlice'; // Redux action to add score

function Trivia() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30); // Timer starts at 30 seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [userName, setUserName] = useState(''); // User's name
  const dispatch = useDispatch(); // Redux dispatch to save score
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((response) => {
      setCategories(response.data.trivia_categories);
    });
  }, []);

  const fetchQuestions = () => {
    if (!selectedCategory) {
      alert('Please select a category to start the quiz!');
      return;
    }
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&type=multiple`)
      .then((response) => {
        const formattedQuestions = response.data.results.map((q) => ({
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          correctAnswer: q.correct_answer,
        }));
        setQuestions(formattedQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizComplete(false);
        setAnsweredQuestions([]);
        setSelectedAnswer(null);
        setTimer(30); // Reset timer to 30 seconds
        setTimerRunning(true); // Start timer
      });
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId); // Set selected category
    fetchQuestions(); // Start quiz immediately after category selection
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correctAnswer === selectedOption;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setAnsweredQuestions((prev) => [
      ...prev,
      { questionIndex: currentQuestionIndex, selectedOption, isCorrect },
    ]);
    setSelectedAnswer(selectedOption);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(30); // Reset timer for the next question
    } else {
      setQuizComplete(true);
      // Dispatch action to save score with user's name
      dispatch(addScoreToLeaderboard({ name: userName, score: score }));
      // Redirect to leaderboard after quiz completion
      navigate('/leaderboard');
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setSelectedCategory('');
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setAnsweredQuestions([]);
    setSelectedAnswer(null);
    setTimer(30); // Reset timer
    setTimerRunning(false); // Stop timer
  };

  // Timer logic: Decrement the timer every second
  useEffect(() => {
    if (timerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleAnswer(null); // Automatically answer if time runs out
    }
  }, [timer, timerRunning]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">A2Z Quiz</h2>
      {!quizComplete ? (
        <>
          {questions.length === 0 ? (
            <div className="text-center">
              <div className="mb-4">
                <label className="block text-lg font-semibold">Enter your Name:</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="p-2 border rounded mb-4"
                  placeholder="Your Name"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:border-4 hover:border-blue-500"
                    onClick={() => handleCategorySelect(category.id)} // Set category and start quiz
                  >
                    <h3 className="text-lg font-semibold text-center">{category.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="relative bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
                <div className="absolute top-2 right-2 text-xl font-bold text-blue-600">
                  Time Left: {timer}s
                </div>
                <p className="text-xl mb-4">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </p>
                <p
                  className="text-xl mb-4"
                  dangerouslySetInnerHTML={{
                    __html: questions[currentQuestionIndex].question,
                  }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[currentQuestionIndex].options.map((option, index) => {
                    const answered = answeredQuestions.some(
                      (q) => q.questionIndex === currentQuestionIndex
                    );
                    const isCorrect = answeredQuestions.find(
                      (q) => q.questionIndex === currentQuestionIndex && q.isCorrect
                    );
                    const optionClass = answered
                      ? option === questions[currentQuestionIndex].correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600';

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`px-4 py-2 rounded ${optionClass}`}
                        disabled={answered}
                        dangerouslySetInnerHTML={{ __html: option }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
          <p className="text-xl mb-4">Your Score: {score}/{questions.length}</p>
          <button
            onClick={resetQuiz}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Trivia;

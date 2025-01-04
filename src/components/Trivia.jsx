import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addScoreToLeaderboard } from '../assets/leaderboardSlice';

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
    // Check if user is logged in
    const storedUserName = localStorage.getItem('userName');
    if (!storedUserName) {
      navigate('/login'); // Redirect to login if no userName is found
    } else {
      setUserName(storedUserName); // Set userName from local storage
    }
  }, [navigate]);

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
    if (!userName.trim()) {
      alert('Please enter your name to start the quiz!');
      return;
    }
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
    setTimerRunning(false); // Stop timer

    if (currentQuestionIndex + 1 < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setTimer(30); // Reset timer for the next question
        setTimerRunning(true); // Start timer
      }, 500);
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
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white p-6"
      style={{
        backgroundImage:
          'url("https://media.istockphoto.com/id/2002552654/video/question-mark-animated-on-transparent-alpha-channel-looping-composite-item-use-on-any-visual.jpg?s=640x640&k=20&c=YDmJ3ebLj13iFtnpzT_X5F3UrErkt256lU0XRkSQ8v0=")',
      }}
    >
      <h2 className="text-4xl font-extrabold text-center mb-8 text-red-700">A2Z Quiz</h2>
      {!quizComplete ? (
        <>
          {questions.length === 0 ? (
            <div className="w-full max-w-7xl text-center">
              <div className="mb-6">
                <label className="block text-2xl mb-2 text-black font-bold">Enter your Name:</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full max-w-md p-3 border rounded-lg font-bold text-xl bg-black"
                  placeholder="Your Name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="text-black bg-gradient-to-r from-white to-white  p-6 rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <h3 className="text-2xl font-bold text-center">{category.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl text-center">
              <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                <div className="absolute top-2 right-2 text-lg font-bold text-yellow-400">
                  Time Left: {timer}s
                </div>
                <p className="text-xl mb-4">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </p>
                <p
                  className="text-xl mb-6"
                  dangerouslySetInnerHTML={{
                    __html: questions[currentQuestionIndex].question,
                  }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[currentQuestionIndex].options.map((option, index) => {
                    const answered = answeredQuestions.some(
                      (q) => q.questionIndex === currentQuestionIndex
                    );
                    const optionClass = answered
                      ? option === questions[currentQuestionIndex].correctAnswer
                        ? 'bg-green-500 text-white'
                        : selectedAnswer === option
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-500 text-black'
                      : 'bg-blue-500 text-white hover:bg-blue-600';

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`px-4 py-3 rounded-lg ${optionClass}`}
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
          <h3 className="text-3xl font-bold mb-6">Quiz Complete!</h3>
          <p className="text-xl mb-4">Your Score: {score}/{questions.length}</p>
          <button
            onClick={resetQuiz}
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Trivia;

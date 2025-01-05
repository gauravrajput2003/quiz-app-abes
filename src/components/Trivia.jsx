import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  const [timer, setTimer] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setUserName(user.email);
      }
    });
    return () => unsubscribe();
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
        setTimer(30);
        setTimerRunning(true);
      });
  };

  const handleCategorySelect = (categoryId) => {
    if (!userName.trim()) {
      alert('Please enter your name to start the quiz!');
      return;
    }
    setSelectedCategory(categoryId);
    fetchQuestions();
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
    setTimerRunning(false);

    if (currentQuestionIndex + 1 < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setTimer(30);
        setTimerRunning(true);
      }, 2000);
    } else {
      setQuizComplete(true);
      dispatch(addScoreToLeaderboard({ name: userName, score: score }));
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
    setTimer(30);
    setTimerRunning(false);
  };

  useEffect(() => {
    if (timerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleAnswer(null);
    }
  }, [timer, timerRunning]);

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    const preventCopy = (e) => e.preventDefault();

    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('copy', preventCopy);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('copy', preventCopy);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white p-6"
      style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/background-abstract-pixel-rain_23-2148367760.jpg?ga=GA1.1.547295045.1735834093&semt=ais_hybrid")' }}
    >
      <h2 className="text-4xl font-extrabold text-center mb-8">A2Z Quiz</h2>
      {!quizComplete ? (
        <>
          {questions.length === 0 ? (
            <div className="w-full max-w-6xl text-center">
              <div className="mb-6">
                <label className="block text-2xl font-bold mb-2 p-2 rounded-lg">Enter your Name:</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-[300px] max-w-md p-3 border rounded-lg  font-bold transition-transform transform hover:scale-105 bg-black text-white"
                  placeholder="Your Name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white w-full p-6 rounded-lg shadow-2xl cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <h3 className="text-xl font-bold text-center text-black">{category.name}</h3>
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
                <p className="text-xl mb-4 no-select">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </p>
                <p
                  className="text-xl mb-6 no-select"
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
                        className={`px-4 py-3 rounded-lg no-select ${optionClass}`}
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
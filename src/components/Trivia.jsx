import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addScoreToLeaderboard } from '../assets/leaderboardSlice'; // Import your action
import axios from 'axios';

function Trivia() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [name, setName] = useState(''); // State to store the user's name
  const [scoreSaved, setScoreSaved] = useState(false); // State to show success message
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track the selected answer
  const dispatch = useDispatch(); // Dispatch function to update Redux store

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
        setSelectedAnswer(null); // Reset selected answer
      });
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
    setSelectedAnswer(selectedOption); // Store the selected answer
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleSubmitScore = () => {
    if (name.trim() !== '') {
      // Dispatch the action to save the score and name to the leaderboard
      dispatch(addScoreToLeaderboard({ name, score }));
      setScoreSaved(true); // Show the success message
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setSelectedCategory('');
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setScoreSaved(false); // Reset the score saved message
    setAnsweredQuestions([]); // Reset answered questions
    setSelectedAnswer(null); // Reset selected answer
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Trivia Quiz</h2>
      {!quizComplete ? (
        <>
          {questions.length === 0 ? (
            <div className="text-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full mb-4 p-2 border rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                onClick={fetchQuestions}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="text-center">
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
                    ? option === currentQuestion.correctAnswer
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
          )}
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
          <p className="text-xl mb-4">Your Score: {score}/{questions.length}</p>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded mb-4"
          />
          {scoreSaved ? (
            <p className="text-green-500 font-bold mb-4">Score Saved Successfully!</p>
          ) : (
            <button
              onClick={handleSubmitScore}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Save Score
            </button>
          )}
          <button
            onClick={resetQuiz}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 ml-4"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Trivia;

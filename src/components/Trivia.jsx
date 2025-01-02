import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addScoreToLeaderboard } from '../assets/leaderboardSlice'; // Import the correct action
import axios from 'axios'; // Ensure axios is imported

function Trivia() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [name, setName] = useState('');

  const dispatch = useDispatch();

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
      });
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleSaveScore = () => {
    if (name.trim()) {
      dispatch(addScoreToLeaderboard({ name, score })); // Dispatch the action to add score to Redux store
      alert('Score saved!'); // Show confirmation that score was saved
    } else {
      alert('Please enter your name before saving the score.');
    }
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
                className="block w-full mb-4 p-2 border rounded-md shadow-md"
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
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p
                className="text-xl mb-4"
                dangerouslySetInnerHTML={{
                  __html: questions[currentQuestionIndex].question,
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option === questions[currentQuestionIndex].correctAnswer)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    dangerouslySetInnerHTML={{ __html: `${index + 1}. ${option}` }}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-green-600">Quiz Complete!</h3>
          <p className="text-xl mb-4 text-gray-700">Your Score: {score}/{questions.length}</p>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full mb-4 p-2 border rounded-md shadow-md"
          />
          <button
            onClick={handleSaveScore}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Save Score
          </button>
        </div>
      )}
    </div>
  );
}

export default Trivia;

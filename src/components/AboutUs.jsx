import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">About A2Z Quiz App</h1>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <img
            src="https://img.freepik.com/free-photo/annoyed-young-caucasian-girl-with-pixie-haircut-holding-looking-mobile-phone-keeping-hand-air-isolated-green-background-with-copy-space_141793-88248.jpg?ga=GA1.1.547295045.1735834093&semt=ais_hybrid"
            alt="Happy person using a mobile"
            className="w-full sm:w-1/2 h-auto rounded-lg shadow-lg mb-4 sm:mb-0"
          />
          <img
            src="https://img.freepik.com/free-photo/brunette-woman-model-standing-using-her-mobile-phone-against-yellow-wall_144627-68763.jpg?ga=GA1.1.547295045.1735834093&semt=ais_hybrid"
            alt="Person using phone"
            className="w-full sm:w-1/2 h-auto rounded-lg shadow-lg"
          />
        </div>

        <p className="text-lg text-gray-700 mb-4">
          Welcome to A2Z Quiz App, your number one source for all things quiz-related. We're dedicated to providing you the very best of trivia questions, with an emphasis on variety, fun, and learning.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Founded in 2023, A2Z Quiz App has come a long way from its beginnings. When we first started out, our passion for making learning fun drove us to start our own business.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          We hope you enjoy our quizzes as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
        </p>

        <div className="text-center">
          <p className="text-lg text-gray-700 font-semibold mb-2">Sincerely,</p>
          <p className="text-xl font-bold text-blue-600">The A2Z Quiz App Team</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

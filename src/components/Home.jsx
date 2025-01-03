import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => {
        setCategories(response.data.trivia_categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    // Navigate to the Trivia component with selected category details
    navigate('/trivia', { state: { categoryId, categoryName } });
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Trivia Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.name)}
              className="cursor-pointer bg-gray-200 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 flex flex-col items-center justify-center"
              style={{ height: '150px' }}
            >
              <h4 className="text-xl font-semibold text-center">{category.name}</h4>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;

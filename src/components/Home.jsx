import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import images
import gkImage from '../images/gk.jpeg';
import enetImage from '../images/enet.jpeg';
import filmImage from '../images/film.jpeg';
import musicImage from '../images/music.jpeg';
import compImage from '../images/comp.jpeg';
import natureImage from '../images/nature.jpg';
import sportsImage from '../images/sports.jpg';
import geoImage from '../images/geo.jpeg';
import hisImage from '../images/his.jpeg';
import polImage from '../images/pol.jpeg';
import artsImage from '../images/arts.jpeg';
import celImage from '../images/cel.jpeg';
import animalImage from '../images/animal.jpeg';
import vechImage from '../images/vech.jpeg';
import comicsImage from '../images/comics.jpg';
import gadgetsImage from '../images/gadgets.jpg';
import animeMangaImage from '../images/anime_manga.jpg';
import cartoonsImage from '../images/cartoons.jpg';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then((response) => {
        setCategories(response.data.trivia_categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
        setLoading(false);
      });
  }, []);

  const getCategoryImage = (categoryName) => {
    const imageUrls = {
      "General Knowledge": gkImage,
      "Entertainment: Books": enetImage,
      "Entertainment: Film": filmImage,
      "Entertainment: Music": musicImage,
      "Science: Computers": compImage,
      "Science: Nature": natureImage,
      "Sports": sportsImage,
      "Geography": geoImage,
      "History": hisImage,
      "Politics": polImage,
      "Art": artsImage,
      "Celebrities": celImage,
      "Animals": animalImage,
      "Vehicles": vechImage,
      "Entertainment: Comics": comicsImage,
      "Science: Gadgets": gadgetsImage,
      "Entertainment: Japanese Anime & Manga": animeMangaImage,
      "Entertainment: Cartoon & Animations": cartoonsImage
    };

    return imageUrls[categoryName] || '/images/default.jpg'; // Default image if category doesn't match
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Trivia Categories</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-200 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 flex flex-col items-center justify-center"
              style={{ height: '250px' }} // Set height for each category box
            >
              <img 
                src={getCategoryImage(category.name)}
                alt={category.name} 
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              
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

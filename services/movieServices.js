const Movies = require("./models/movies");

const addMovie = async (movieObj) => {
  try {
    const newMovie = new Movies({
      title: movieObj.title,
      genre: movieObj.genre,
      director: movieObj.director,
      rating: movieObj.rating,
    });
    const savedMovie = await newMovie.save();
    console.log("Saved", savedMovie);
  } catch (error) {
    console.error("Error", error);
  }
};

const getAllMovies = async () => {
  try {
    const allMovies = await Movies.find({});
    console.log("All Movies", allMovies);
  } catch (error) {
    console.error(error);
    1;
  }
};
const addReview = async (movieId, movieReview) => {
  try {
    const movieToUpdate = await Movies.findById(movieId);
    if (movieToUpdate) {
      // adding review
      movieToUpdate.review.push(movieReview);

      // updating rating
      const ratingSum = movieToUpdate.review.reduce(
        (acc, item) => (acc += item.rating),
        0
      );
      const avgRating = ratingSum / movieToUpdate.review.length;
      movieToUpdate.rating = avgRating;

      //   saving data
      await movieToUpdate.save();
      return movieToUpdate;
    } else {
      console.error("Not Found");
      return "not found";
    }
  } catch (error) {
    return error;
  }
};

const topRatings = async (movieId) => {
  try {
    const movieToFind = await Movies.findById(movieId);
    if (movieToFind) {
      const top5 = movieToFind.review
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
      console.log("Top 5 Reviews", top5);
    } else {
      console.error("Not Found");
    }
  } catch (error) {
    return error;
  }
};

const bottomRatings = async (movieId) => {
  try {
    const movieToFind = await Movies.findById(movieId);
    if (movieToFind) {
      const bottom5 = movieToFind.review
        .sort((a, b) => a.rating - b.rating)
        .slice(0, 5);
      console.log("Bottom 5 Reviews", bottom5);
    } else {
      console.error("Not Found");
    }
  } catch (error) {
    console.error(error);
  }
};

const top3Populated = async (movieId) =>  {
    try {
      const movieToFind = await Movies.findById(movieId, "review").populate(
        "review"
      );
  
      if (movieToFind !== null) {
        const top3Sorted = movieToFind.review
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        console.log("Top 3 Reviews", top3Sorted);
        return top3Sorted;
      } else {
        console.log("Movie not found with ID:", movieId);
        return null; 
      }
    } catch (error) {
      console.error("Error:", error);
      throw error; 
    }
  }
  
module.exports = {
  addMovie,
  getAllMovies,
  addReview,
  topRatings,
  bottomRatings,
  top3Populated,
};

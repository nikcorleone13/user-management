const movieMethods = require("../services/movieServices");

const addReviewFields = async (req, res) => {
  const movieId = req.params.movieId;
  const movieReview = req.body;
  console.log("BODY", movieReview);

  try {
    if (movieId != "" && Object.keys(movieReview).length != 0) {
      const newRev = await movieMethods.addReview(movieId, movieReview);
      if (newRev) {
        res.status(201).json({ message: "Review Added Successfully", newRev });
      } else {
        res.status(400).json({ message: "Error in adding" });
      }
    } else {
      console.log("EMpty");
      res.status(404).json({ message: "Invalid Body/Movie ID" });
    }
  } catch (error) {
    res.status(500).error(error);
  }
};

const getTop3Reviews = async (req, res) => {
  const movieId = req.params.movieId;

  try {
    if (movieId != "") {
      const top3Reviews = await movieMethods.top3Populated(movieId);
      if (top3Reviews!=null) {
        res
          .status(201)
          .json({ message: "Top 3 Reviews fetched successfully", top3Reviews });
      } else {
        res.status(404).json({ message: "Error in fetching the movie" });
      }
    } else {
      res.status(404).json({ message: "Invalid Request" });
    }
  } catch (error) {
    res.status(500).json({error:"error"});
  }
};
module.exports = {
  addReviewFields,
  getTop3Reviews,
};

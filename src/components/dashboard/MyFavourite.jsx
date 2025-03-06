import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MyFavourite() {
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch favorite cars from API
  const fetchFavoriteCars = async () => {
    setLoading(true);
    try {
      // Retrieve favorite VINs from localStorage
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (storedFavorites.length === 0) {
        setFavoriteCars([]);
        setLoading(false);
        return;
      }
      const vinString = storedFavorites.join(",");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/vehicles/favorites?vins=${vinString}`);
      console.log(response.data);

      setFavoriteCars(response.data);
    } catch (err) {
      console.error("Error fetching favorite cars:", err);
      setError("Failed to load favorite cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteCars();
  }, []);

  // Remove a car from favorites
  const removeFromFavorites = (vin) => {
    // Get existing favorites
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Filter out the removed VIN
    const newFavorites = storedFavorites.filter((v) => v !== vin);

    // Save updated favorites back to localStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    // Update state and re-fetch favorites
    fetchFavoriteCars();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="content-area">
            <main id="main" className="main-content">
              <div className="tfcl-dashboard">
                <h1 className="admin-title mb-3">My Favorites</h1>

                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : favoriteCars.length === 0 ? (
                  <p>No favorite cars found.</p>
                ) : (
                  <div className="tfcl-favorite-listing">
                    <div className="wrap-favorite-listing">
                      {favoriteCars.map((car, i) => (
                        <div key={i} className="box-car-list hv-one">
                          <div className="image-group relative">
                            <div className="img-style" style={{
                              backgroundColor: "#f3f3f3", // Light grey filler background
                              height: "338px",
                              overflow: "hidden" // Ensures no stretching
                            }}>
                              <img
                                className="lazyload"
                                alt="image"
                                style={{
                                  objectFit: "contain"
                                }}
                                src={`${import.meta.env.VITE_BACKEND_BASE_URL}/${car.thumbnail}`}
                                width={450}
                                height={338}

                              />
                            </div>
                          </div>
                          <div className="content">
                            <div className="text-address">
                              <p className="text-color-3 font">{car.year}</p>
                            </div>
                            <div className="text-address">
                              <p style={{ fontSize: "20px" }} className="text-color-3 font">
                                {car.make}
                              </p>
                            </div>
                            <h5 className="link-style-1">
                              <Link to={`/detail/${car.vin}`}>
                                {car.model}
                              </Link>
                            </h5>
                            <div className="icon-box flex flex-wrap">
                              <div className="icons flex-three">
                                <i className="icon-autodeal-km1" />
                                <span>{car.miles} Miles</span>
                              </div>
                              <div className="icons flex-three">
                                <i className="icon-autodeal-color" />
                                <span>{car.color}</span>
                              </div>
                              <div className="icons">
                                <i className="fa fa-address-book" />
                                <span>{car.location}</span>
                              </div>
                            </div>
                            <div className="days-box flex justify-space align-center">
                              <button onClick={() => removeFromFavorites(car.vin)} className="view-car">
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

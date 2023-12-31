import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRockets } from "../Redux/rocketSlice";
import { Link } from "react-router-dom";
import Header from "./Header";

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);

  const [searchTerm, setSearchTerm] = useState("");

  
  

  // Fetch rockets on component mount
  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  // Filter rockets based on search term
  const filteredRockets = rockets.filter((rocket) =>
    rocket.rocket_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
    

  return (
    <div className="relative">
      <Header />

      {/* Search bar */}
      <div className="flex justify-center items-center ">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 p-1.5 text-black w-1/2 rounded-md"
        />
      </div>

     

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 min-w-full min-h-full object-cover z-[-1]"
      >
        <source
          src={process.env.PUBLIC_URL + "/videos/Rocketsvid.mp4"}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="container mx-auto p-8 text-white relative z-10">
        <h1 className="text-4xl font-bold mt-8 mb-4">SpaceX Rockets</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRockets.map((rocket) => (
            <Link to={`/rockets/${rocket.rocket_id}`} key={rocket.rocket_id}>
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out">
                <h2 className="text-2xl font-bold mb-4">
                  {rocket.rocket_name}
                </h2>
                {rocket.flickr_images.length > 0 ? (
                  <img
                    src={rocket.flickr_images[0]}
                    alt={rocket.rocket_name}
                    className="mb-4"
                  />
                ) : (
                  <div className="mb-4">No Image Available</div>
                )}
                <p className="text-gray-300">{rocket.description}</p>
                <p className="text-gray-300">
                  Height: {rocket.height.meters} meters
                </p>
                <p className="text-gray-300">Weight: {rocket.mass.kg} kg</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rockets;

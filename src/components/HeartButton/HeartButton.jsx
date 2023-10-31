import { useState, useEffect } from "react";
import "./HeartButton.css";

const HeartButton = ({ thoughts }) => {
  const initialLikes = thoughts.map((thought) => thought.hearts);
  const [increaseLikes, setIncreaseLikes] = useState(initialLikes);

  const handleLikes = (thoughtId) => {
    // Make a POST request to update likes on the server
    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thoughtId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Increment likes locally
          setIncreaseLikes((prevLikes) => {
            const newLikes = [...prevLikes];
            const id = thoughts.findIndex((thought) => thought._id === thoughtId);
            newLikes[id]++;
            // Store updated likes in local storage
            localStorage.setItem("likes", JSON.stringify(newLikes));
            return newLikes;
          });
          console.log(`Liked thought ${thoughtId}`);
        } else {
          console.error(`Failed to like thought ${thoughtId}`);
        }
      })
      .catch((error) => {
        console.error("Error updating likes on the server", error);
      });
  };

  useEffect(() => {
    if (thoughts && thoughts.length) {
      // Retrieve likes from local storage, if available
      const localLikes = JSON.parse(localStorage.getItem("likes")) || initialLikes;
      setIncreaseLikes(localLikes);
    }
  }, [thoughts]);

  return (
    thoughts &&
    thoughts.map((thought) => (
      <div key={thought._id} className="heartContainer">
        <button className="heartButton" onClick={() => handleLikes(thought._id)}>
          <span className="heartEmoji">❤️</span>
        </button>
        <p> x{thought.hearts + increaseLikes[thoughts.indexOf(thought)]}</p>
      </div>
    ))
  );
};

export default HeartButton;

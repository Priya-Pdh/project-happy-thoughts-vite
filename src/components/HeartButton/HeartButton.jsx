import { useState } from "react";
import "./HeartButton.css";

const HeartButton = ({ thoughts, onLike }) => {
  const [likes, setLikes] = useState(thoughts.map((thought) => thought.hearts));

  const handleLike = (thoughtId, index) => {
    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thoughtId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (response.ok) {
          // Update likes every time the POST request is successful
          const newLikes = [...likes];
          newLikes[index] = newLikes[index] + 1;
          setLikes(newLikes);
          onLike(thoughtId);
        }
      })
      .catch((error) => {
        console.error("Error liking the thought", error);
      });
  };

  return (
    <div className="heartContainer">
      {thoughts.map((thought, index) => (
        <div key={thought._id} className="heartItem">
          <button className="heartButton" onClick={() => handleLike(thought._id, index)}>
            <span className="heartEmoji">❤️</span><span></span>
          </button>
          <span className="num-likes">x{likes[index]}</span>
        </div>
      ))}
    </div>
  );
};

export default HeartButton;

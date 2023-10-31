import { useState } from "react";
import "./HeartButton.css";

const HeartButton = ({ thoughts }) => {
  const initialLikes = thoughts.map((thought) => thought.hearts);
  const [increaseLikes, setIncreaseLikes] = useState(initialLikes);

  // const currentLikes = thoughts[hearts]

  const handleLikes = (id) => {
    setIncreaseLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[id]++;
      return newLikes;
    });
  };
  return (
    thoughts &&
    thoughts.map((thought, id) => (
      <div key={id} className="heartContainer">
        <button onClick={() => handleLikes(id)}>
          <span className="heartEmoji">❤️</span>
        </button>
        <p> x{thought.hearts + increaseLikes[id]}</p>
      </div>
    ))
  );
};

export default HeartButton;
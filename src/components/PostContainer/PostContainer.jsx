import { useState } from "react";
import HeartButton from "../HeartButton/HeartButton";
import PostTime from "../PostTime/PostTime";
import "./PostContainer.css";

const PostContainer = ({ thoughts, newThoughtId, setTotalLikes }) => {
  const [likedThoughts, setLikedThoughts] = useState([]);
 

  // Function to convert the timestamp in the JSON to a readable format, including making it a "XX minutes since format"
  const convertTimestamp = (timestamp) => {
    // The timestamp that will come from the API
    const timeOfPost = new Date(timestamp);

    // Create the current time
    const currentTime = new Date();

    // Subtract current time and timeOfPos and then convert into minutes
    const differenceinTime = Math.floor(
      (currentTime - timeOfPost) / (1000 * 60)
    );

    // If the difference is less than 60 minutes, show one message
    if (differenceinTime < 60) {
      return `${differenceinTime} minutes ago`;
    } // If difference is less than 120 minutes, show that it was about one hour ago
    else if (differenceinTime < 120) {
      return `1 hour ago`;
    } // If difference is less than 180 minutes, show that it was about two hour ago
    else if (differenceinTime < 180) {
      return `2 hours ago`;
    } // In all other cases show that it was more than XX hours ago.
    return `${Math.floor(differenceinTime / 60)} hours ago`;
  };

  const handleLike = (thoughtId) => {
    setLikedThoughts((prevLikedThoughts) => [...prevLikedThoughts, thoughtId]);
    setTotalLikes((prevTotalLikes) => prevTotalLikes + 1);
  };

  return (
    thoughts && (
      <div>
        {thoughts.map((thought) => (
          <div key={thought._id}>
       
            <div className={`postedThoughtsContainer ${
            newThoughtId === thought._id ? "newThought" : ""
          }`} >
              <div className="messageList">
                <p className="happyThoughts">{thought.message}</p>
              
              <div className="infoWrapper">
                <div className="infoLikes">
                  <HeartButton thoughts={[thought]} onLike={handleLike} />
                </div>
                <div className="infoTime">
                  <PostTime timeStamp={convertTimestamp(thought.createdAt)} />{" "}
                </div>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default PostContainer;

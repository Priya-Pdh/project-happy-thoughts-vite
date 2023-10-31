import PostTime from "../PostTime/PostTime";
import "./PostContainer.css";

const PostContainer = ({ thoughts }) => {
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
  return (
    thoughts && (
      <ul>
        {thoughts.map((thought, id) => (
          <div key={id} className="postDisplay">
            <li>{thought.message}</li>
            <PostTime timeStamp={convertTimestamp(thought.createdAt)} />
          </div>
        ))}
      </ul>
    )
  );
};

export default PostContainer;

const SubmitButton = ({ handleSubmit }) => {
  return (
    <button onClick={handleSubmit} className="submitButton">
      <span className="heartEmoji">❤️</span>Send Happy Thought
      <span className="heartEmoji">❤️</span>
    </button>
  );
};

export default SubmitButton;



const QuizGame = () => {
  const queryLink = import.meta.env.VITE_TRIVIA_API;
  const api_key = import.meta.env.VITE_API_KEY;
  const baseUrl = queryLink + api_key;
  return (
    <>
      <h1 className="text-center">QuizGame</h1>
      {/* <h5>{baseUrl}</h5> */}
    </>
  );
};

export default QuizGame;
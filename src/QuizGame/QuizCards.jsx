import Cards from './Cards';

const QuizCards = ({ cards }) => {
  return (
    <>
    {cards.map((card, i) => <Cards key={i} card={card} />)}
    </>
  );
};

export default QuizCards;
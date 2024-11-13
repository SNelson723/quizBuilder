import Cards from './Cards';

const QuizCards = ({ category, cards }) => {
  return (
    <>
    <h1>{category}</h1>
    {cards.map((card, i) => <Cards key={i} card={card} />)}
    </>
  );
};

export default QuizCards;
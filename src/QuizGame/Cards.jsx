import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const decodeHTMLEntities = (text) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(text, 'text/html');
  return dom.documentElement.textContent;
};

const successGreen = '#52b963';
const failureRed = '#c44240';

const Cards = ({ card }) => {
  let answers = [...card.incorrect_answers, card.correct_answer];
  answers = answers.sort(() => Math.random() - 0.5);

  const handleAnswerClick = (e) => {
    console.log(e.target.value);
    if (e.target.value === card.correct_answer) {
      e.target.style.backgroundColor = successGreen;
    } else {
      e.target.style.backgroundColor = failureRed;
    }
  };

  return (
    <Container className='container-sm' style={{width: '35rem', fontSize: 14}}>
      <Card className='text-center'>
        <Card.Title className='text-center mx-auto' style={{fontSize: '16px'}}>{decodeHTMLEntities(card.question)}</Card.Title>
        <Card.Body>
          <Row className='mb-2'>
            <Col>
              <Button className='answerButton' value={answers[0]} onClick={(e) => handleAnswerClick(e)}>{answers[0]}</Button>
            </Col>
            <Col>
              <Button className='answerButton' value={answers[2]} onClick={(e) => handleAnswerClick(e)}>{answers[2]}</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className='answerButton' value={answers[1]} onClick={(e) => handleAnswerClick(e)}>{answers[1]}</Button>
            </Col>
            <Col>
              <Button className='answerButton' value={answers[3]} onClick={(e) => handleAnswerClick(e)}>{answers[3]}</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cards;
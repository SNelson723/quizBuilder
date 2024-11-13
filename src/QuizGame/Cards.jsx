import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const Cards = ({ card }) => {
  let answers = [...card.incorrect_answers, card.correct_answer];
  answers = answers.sort(() => Math.random() - 0.5)

  return (
    <Container className='container-sm' style={{width: '35rem', fontSize: 14}}>
      <Card>
        <Card.Title className='text-center mx-auto'>{card.question}</Card.Title>
        <Row>
          <Col>
            <Button id='answerButton'>{answers[0]}</Button>
          </Col>
          <Col>
            <Button id='answerButton'>{answers[2]}</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button id='answerButton'>{answers[1]}</Button>
          </Col>
          <Col>
            <Button id='answerButton'>{answers[3]}</Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Cards;
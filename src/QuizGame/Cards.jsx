import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const decodeHTMLEntities = (text) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(text, 'text/html');
  return dom.documentElement.textContent;
}


const Cards = ({ card }) => {
  let answers = [...card.incorrect_answers, card.correct_answer];
  answers = answers.sort(() => Math.random() - 0.5)

  return (
    <Container className='container-sm' style={{width: '35rem', fontSize: 14}}>
      <Card className='text-center'>
        <Card.Title className='text-center mx-auto' style={{fontSize: '16px'}}>{decodeHTMLEntities(card.question)}</Card.Title>
        <Card.Body>
          <Row className='mb-2'>
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
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cards;
/* eslint-disable react/prop-types */
import { Form, Container, Card, Button }from 'react-bootstrap';

const QuizGame = ({ quizUrl, categories}) => {
  /**
   * There will be quiz cards
   * Options for quizzes?
   * Let the use know if they got the answer right/wrong and display a prompt with a random message
   */
  // console.log(categories)

  return (
    <>
      <h1 className="text-center">QuizGame</h1>
      <Container className="w-50">
        <Card>
          <Form>
            <Form.Group className='p-2'>
              <Form.Label>Categories</Form.Label>
              <Form.Select>
                <option>Select your quizzia ground!</option>
                {categories.map(cat => <option key={cat.name + cat.id}>{cat.name}</option>)}
              </Form.Select>
            </Form.Group>

            <Button>Get your quiz on</Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};


export default QuizGame;
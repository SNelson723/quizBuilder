/* eslint-disable react/prop-types */
import { Form, Container, Card, Button }from 'react-bootstrap';

const difficulties = []
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
          <Form className='p-2'>
            <Form.Group className='d-flex'>
              <Form.Group  className='w-50'>
                <Form.Label>Categories</Form.Label>
                <Form.Select>
                  <option>Select your quizzia ground!</option>
                  {categories.map(cat => <option key={cat.name + cat.id}>{cat.name}</option>)}
                </Form.Select>
              </Form.Group>

            </Form.Group>
          </Form>
          <Button className='w-25 mx-auto'>Get your quiz on</Button>
        </Card>
      </Container>
    </>
  );
};


export default QuizGame;
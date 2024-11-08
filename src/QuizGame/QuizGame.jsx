
import { Form, Container, Card, Button }from 'react-bootstrap';
import axios from 'axios';

const QuizGame = ({ categories }) => {
  const queryLink = import.meta.env.VITE_TRIVIA_API;
  const api_key = import.meta.env.VITE_API_KEY;
  /**
   * There will be quiz cards
   * Options for quizzes?
   * Let the use know if they got the answer right/wrong and display a prompt with a random message
   */
  // const finalUrl = quizUrl;
  console.log(finalUrl);
  const handleDifficultySelect = (e) => {

  };

  return (
    <>
      <h1 className="text-center">QuizGame</h1>
      <Container className="w-50">
        <Card>
          <Form className='p-2'>
            <Form.Group className='d-flex'>
              <Form.Group  className='w-50'>
                <Form.Label htmlFor='categories'>Categories</Form.Label>
                <Form.Select id="categories">
                  <option>Select your quizzia ground!</option>
                  {categories.map(cat => <option key={cat.name + cat.id}>{cat.name}</option>)}
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="difficulties">Difficulty</Form.Label>
                <Form.Select>
                  <option>Any Difficulty</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
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
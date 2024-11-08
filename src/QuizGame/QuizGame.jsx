
import { useState, useEffect } from 'react';
import { Form, Container, Card, Button }from 'react-bootstrap';
import axios from 'axios';

const QuizGame = ({ categories }) => {
  const [amount, setAmount] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  /**
   * There will be quiz cards
   * Options for quizzes?
   * Let the use know if they got the answer right/wrong and display a prompt with a random message
   * 
   * TODO:
   *  Finish the endpoint and send back the data
   *  Double check to see if the amount of questions is specified
   *    => if amount is not specified, the response comes back empty
   *  Think about the format of the game and how you want to navigate or show a new React Fragment
   *    => conditional Rendering?
   */
  const handleOnSelect = (e, setOption) => {
    const index = e.target.selectedIndex;
    const value = e.target.children[index].id;
    setOption(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get('/getQuiz', {
        params: {
          url: import.meta.env.VITE_TRIVIA_API,
          amount: amount,
          difficulty: difficulty,
          category: category,
          type: type,
          api_key: import.meta.env.VITE_API_KEY
        }
      });
      console.log(data);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  return (
    <>
      <h1 className="text-center">QuizGame</h1>
      <Container className="w-50">
        <Card className='p-2'>
          <Form id="quizOptionForm" onSubmit={handleSubmit}>

            <Form.Group className='w-50 mx-auto text-center'>
              <Form.Label htmlFor='categories'>Categories</Form.Label>
              <Form.Select id="categories" onChange={(e) => handleOnSelect(e, setCategory)}>
                <option id="">Select your quizzia ground!</option>
                {categories.map(cat => <option key={cat.name + cat.id} id={cat.id}>{cat.name}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className='w-25 mx-auto text-center'>
              <Form.Label>Number of Questions</Form.Label>
              <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className='w-25 mx-auto text-center'>
              <Form.Label htmlFor="difficulties">Difficulty</Form.Label>
              <Form.Select id="difficulties" onChange={(e) => handleOnSelect(e, setDifficulty)}>
                <option id="">Any Difficulty</option>
                <option id="easy">Easy</option>
                <option id="medium">Medium</option>
                <option id="hard">Hard</option>
              </Form.Select>
            </Form.Group>

            <Form.Group  className='w-25 mx-auto text-center'>
              <Form.Label htmlFor='type'>Type of quiz</Form.Label>
              <Form.Select id="type" onChange={(e) => handleOnSelect(e, setType)}>
                <option id="">Any Type</option>
                <option id='multiple'>Multiple Choice</option>
                <option id='boolean'>True or False</option>
              </Form.Select>
            </Form.Group>

            <Button className='w-25 mx-auto mt-2 d-block' type='submit'>Get your quiz on</Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};


export default QuizGame;
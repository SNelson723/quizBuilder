
import { useState, useEffect } from 'react';
import { Form, Container, Card, Button }from 'react-bootstrap';
import axios from 'axios';

const QuizGame = ({ categories }) => {
  const [url, setUrl] = useState(import.meta.env.VITE_TRIVIA_API);
  const [amount, setAmount] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  /**
   * There will be quiz cards
   * Options for quizzes?
   * Let the use know if they got the answer right/wrong and display a prompt with a random message
   *  + import.meta.env.VITE_API_KEY
   * 
   * amount => category => difficulty => type => api key
   */
  // console.log(categories)
  const handleOnSelect = (e, setOption) => {
    const index = e.target.selectedIndex;
    const value = e.target.children[index].id;
    setOption(value);
  };
  console.log(difficulty, category, amount)

  return (
    <>
      <h1 className="text-center">QuizGame</h1>
      <p>{url}</p>
      <Container className="w-50">
        <Card className='p-2'>
          <Form id="quizOptionForm">

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

            <Form.Group  className='w-50 mx-auto text-center'>
              <Form.Label htmlFor='categories'>Categories</Form.Label>
              <Form.Select id="categories" onChange={(e) => handleOnSelect(e, setCategory)}>
                <option id="">Select your quizzia ground!</option>
                {categories.map(cat => <option key={cat.name + cat.id} id={cat.id}>{cat.name}</option>)}
              </Form.Select>
            </Form.Group>

          </Form>
          <Button className='w-25 mx-auto'>Get your quiz on</Button>
        </Card>
      </Container>
    </>
  );
};


export default QuizGame;
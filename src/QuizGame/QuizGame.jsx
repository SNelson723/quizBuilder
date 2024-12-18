
import { useState, useEffect } from 'react';
import { Form, Container, Card, Button }from 'react-bootstrap';
import axios from 'axios';
import QuizCards from './QuizCards';

const numbers = [5, 10, 15, 20, 25];

const QuizGame = ({ categories }) => {
  const [amount, setAmount] = useState('5');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('multiple');
  const [cards, setCards] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [categoryHeader, setCategoryHeader] = useState('');
  const [apiKey, setApiKey] = useState('');
  /**
   * Let the use know if they got the answer right/wrong and display a prompt with a random message
   * 
   * TODO:
   *  Could also add a randomizer for random questions to challenge friends with
   *    => if amount is not specified, the response comes back empty
   *  Think about the format of the game and how you want to navigate or show a new React Fragment
   *    => conditional Rendering?
   */
  useEffect(() => {
    const getApiKey = async () => {
      const { data } = await axios.get('https://opentdb.com/api_token.php?command=request');
      setApiKey(data.token);
    };
    getApiKey();
  }, []);

  const handleOnSelect = (e, setOption, setHeader = null) => {
    const index = e.target.selectedIndex;
    const value = e.target.children[index].id;
    setOption(value);
    if (setHeader) setHeader(e.target.value);
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
          api_key: apiKey
        }
      });
      setCards(data.results);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  return (
    <>
      <div id="quizBuilder" hidden={isPlaying}>
        <h1 className="text-center">QuizGame</h1>
        <Container className="w-50">
          <Card className='p-2'>
            <Form id="quizOptionForm" onSubmit={handleSubmit}>

              <Form.Group className='w-50 mx-auto text-center'>
                <Form.Label htmlFor='categories'>Categories</Form.Label>
                <Form.Select id="categories" onChange={(e) => handleOnSelect(e, setCategory, setCategoryHeader)}>
                  <option id="">Select your quizzia ground!</option>
                  {categories.map(cat => <option key={cat.name + cat.id} id={cat.id}>{cat.name}</option>)}
                </Form.Select>
              </Form.Group>

              <Form.Group className='w-25 mx-auto text-center'>
                <Form.Label htmlFor='amount'>Number of Questions</Form.Label>
                <Form.Select id='amount' onChange={(e) => handleOnSelect(e, setAmount)}>
                  {numbers.map((num, i) => <option key={num + i} id={num}>{num}</option>)}
                </Form.Select>
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
                  <option id='multiple'>Multiple Choice</option>
                  <option id='boolean'>True or False</option>
                </Form.Select>
              </Form.Group>

              <Button className='w-25 mx-auto mt-2 d-block' type='submit'>Get your quiz on</Button>
            </Form>
          </Card>
        </Container>
      </div>
      <div id="quizCards">
        <QuizCards cards={cards} header={categoryHeader} hidden={!isPlaying} />
      </div>
    </>
  );
};

export default QuizGame;
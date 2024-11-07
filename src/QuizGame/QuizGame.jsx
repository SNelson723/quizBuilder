/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form';

const QuizGame = ({ quizUrl, categories}) => {
  /**
   * There will be quiz cards
   * Options for quizzes?
   * Let the use know if they got the answer right/wrong and display a prompt with a random message
   */
  console.log(categories)

  return (
    <>
      <h1 className="text-center">QuizGame</h1>
      <Form>
        <Form.Group>
          <Form.Label>Categories</Form.Label>
          <Form.Select>
            <option>Select your quizzia ground!</option>
            {categories.map(cat => <option key={cat.name + cat.id}>{cat.name}</option>)}
          </Form.Select>
        </Form.Group>
      </Form>
    </>
  );
};


export default QuizGame;
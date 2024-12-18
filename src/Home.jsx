import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
  const [userObj, setUserObj] = useState(useLoaderData())

  useEffect(() => {
    const user = userObj[0];
    console.log('Home Page', user);
    // This is only for seeding other data into the database without being able to use an actual seeder
    // for (let i = 0; i < fakeUsers.length; i++) {
    //   axios.post('/seedUser', fakeUsers[i]);
    // }
  }, [userObj]);
  /**
   * TODO:
   * 1) Create a leaderboard with some hardcoded data
   * 2) Create the quiz game
   * 3) Create profile
   * 4) Start playing quizzes and figure out how to save that stuff
   * 5) or even then add a search functionality with keywords?
   * 6) Save scores => get the front end first then add endpoints so I know what I should be working with
   * 7) Handle authorization for logging in
   * 8) Create a chat board for comments/etc on quizzes
   * 9) Send messages to each other, make friends => add security of refusal
   */

  return (
    <div>
      Home page
    </div>
  )
};

export default Home;
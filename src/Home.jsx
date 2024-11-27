import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

const fakeUsers = [
  {
    "firstName": 'John',
    "lastName": 'Doe',
    "userName": 'johndoe123',
    "googleId": 'google_id_1',
    "image_url": 'http://example.com/image1.jpg',
    "email": 'john.doe@example.com'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    userName: 'janesmith456',
    googleId: 'google_id_2',
    image_url: 'http://example.com/image2.jpg',
    email: 'jane.smith@example.com'
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    userName: 'alicejohnson789',
    googleId: 'google_id_3',
    image_url: 'http://example.com/image3.jpg',
    email: 'alice.johnson@example.com'
  },
  {
    firstName: 'Bob',
    lastName: 'Brown',
    userName: 'bobbrown101',
    googleId: 'google_id_4',
    image_url: 'http://example.com/image4.jpg',
    email: 'bob.brown@example.com'
  },
  {
    firstName: 'Charlie',
    lastName: 'Davis',
    userName: 'charliedavis202',
    googleId: 'google_id_5',
    image_url: 'http://example.com/image5.jpg',
    email: 'charlie.davis@example.com'
  },
  {
    firstName: 'David',
    lastName: 'Wilson',
    userName: 'davidwilson303',
    googleId: 'google_id_6',
    image_url: 'http://example.com/image6.jpg',
    email: 'david.wilson@example.com'
  },
  {
    firstName: 'Eva',
    lastName: 'Garcia',
    userName: 'evagarcia404',
    googleId: 'google_id_7',
    image_url: 'http://example.com/image7.jpg',
    email: 'eva.garcia@example.com'
  },
  {
    firstName: 'Frank',
    lastName: 'Martinez',
    userName: 'frankmartinez505',
    googleId: 'google_id_8',
    image_url: 'http://example.com/image8.jpg',
    email: 'frank.martinez@example.com'
  },
  {
     firstName:'Grace',
     lastName:'Lopez',
     userName:'gracelopez606',
     googleId:'google_id_9',
     image_url:'http://example.com/image9.jpg',
     email:'grace.lopez@example.com'
   },
   {
     firstName:'Henry',
     lastName:'Hernandez',
     userName:'henryhernandez707',
     googleId:'google_id_10',
     image_url:'http://example.com/image10.jpg',
     email:'henry.hernandez@example.com'
   },
   {
     firstName:'Isabella',
     lastName:'Clark',
     userName:'isabellaclark808',
     googleId:'google_id_11',
     image_url:'http://example.com/image11.jpg',
     email:'isabella.clark@example.com'
   },
   {
     firstName:'Jack',
     lastName:'Lewis',
     userName:'jacklewis909',
     googleId:'google_id_12',
     image_url:'http://example.com/image12.jpg',
     email:'jack.lewis@example.com'
   },
   {
     firstName:'Katherine',
     lastName:'Robinson',
     userName:'katherinerobinson010',
     googleId:'google_id_13',
     image_url:'http://example.com/image13.jpg',
     email:'katherine.robinson@example.com'
   },
   {
      firstName:'Liam',
      lastName:'Walker',
      userName:'liamwalker111',
      googleId:'google_id_14',
      image_url:'http://example.com/image14.jpg',
      email:'liam.walker@example.com'
   },
   {
      firstName:'Mia',
      lastName:'Hall',
      userName:'miahall212',
      googleId:'google_id_15',
      image_url:'http://example.com/image15.jpg',
      email:'mia.hall@example.com'
   },
   {
      firstName:'Noah',
      lastName:'Young',
      userName:'noahyoung313',
      googleId:'google_id_16',
      image_url:'http://example.com/image16.jpg',
      email:'noah.young@example.com'
   },
   {
      firstName:'Olivia',
      lastName:'Allen',
      userName:'oliviaallen414',
      googleId:'google_id_17',
      image_url:'http://example.com/image17.jpg',
      email:'olivia.allen@example.com',
   },
   {
       first_name : "Pauline",
       last_name : "King",
       user_name : "paulineking515",
       google_id : "google_id_18",
       image_url : "http://example.com/image18.jpg",
       email : "pauline.king@example.com"
   },
   {
       first_name : "Quinn",
       last_name : "Wright",
       user_name : "quinnwright616",
       google_id : "google_id_19",
       image_url : "http://example.com/image19.jpg",
       email : "quinn.wright@example.com"
   },
   {
       first_name : "Ryan",
       last_name : "Scott",
       user_name : "ryanscott717",
       google_id : "google_id_20",
       image_url : "http://example.com/image20.jpg",
       email : "ryan.scott@example.com"
   }
]

const Home = () => {
  const [userObj, setUserObj] = useState(useLoaderData())

  useEffect(() => {
    const user = userObj[0];
    console.log('Home Page', user);
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
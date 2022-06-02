// seeds for Blog model/table
const{ Blog } = require('../models');

const blogData = [
  {
    "title": "Why MVC is so important",
    "description": "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic",
    "user_id": 3
  },
  {
    "title": "Authentication vs. Authorization",
    "description": "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system",
    "user_id": 1
  },
  {
    "title": "Object-Relational Mapping (ORM)",
    "description": "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
    "user_id": 2
  },
  {
    "title": "Why use a Templating Language?",
    "description": "If you like saving time creating your web application front end, a Templating Language is your friend. Templating languages simplify your code into segments that can be reused over and over again.",
    "user_id": 3
  },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;

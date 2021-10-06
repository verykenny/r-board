# Welcome to rBoard!

rBoard is a web application that combines your refrigerator space and whiteboard into one application--making it easy to manage chores, reminders, and other oddities in your household or for school. On rBoard, users can create a board, known as a whiteboard, add sticky notes to their board, and invite their family or roommates who have signed up to begin adding things as well!

As someone who has almost always lived with roommates, a project like this has been on my mind for a long time. I wanted something digital, that could be accessed from anywhere and had the versatility of a real whiteboard or fridge. This meant being able to provide an assortment of items to add to the board that could meet most household requirements and leaving the board flexible enough to be organized how the user wants. Being able to keep a household of 5 or 6 people organized can be a struggle and having a solution that is fun to use and that is readily available can make organization a breeze.

<img src="https://github.com/verykenny/r-board/blob/main/planning/rBoard_dnd.gif" alt="rBoard drag and drop" height="300">
<img src="https://github.com/verykenny/r-board/blob/main/planning/rBoard-edit.gif" alt="rBoard in place edit" height="300">


#### Live link: [rBoard](https://rboard2021.herokuapp.com/home)
***

### Index
[Development](#development)

[Technologies](#technologies)

[Key Features](#key-features)

[Code Snippets](#code-snippets)

[Wiki Pages](#wiki-pages)

[Future Goals](#future-goals)

***
### Development
- You can read more about the project using the wiki located at: https://github.com/verykenny/r-board/wiki
- To start a development environment:
  - Clone the repository at: https://github.com/verykenny/r-board
  - Run the command "npm install" from the react-app directory in your terminal to install dependencies for the front end
  - Run the command "pipenv install" from the root directory in your terminal to install dependencies for the backend and create a virtual environment.
  - Run the command "flask run" from the root directory to start the backend server.
  - Run the command "npm start" from the react-app directory to start the frontend server.
  - Navigate to the localhost port specified in config/index.js

### Technologies
#### Front End
- JavaScript
- React-Redux
- Styled Components
- CSS Transitions
- [Favicon.io](https://favicon.io/) for favicon
- Heroku (Hosting)

#### Back End
- Python
- Flask
- PostgreSQL (Database)
- SQLAlchemy
- AJAX

***

### Key Features
- Logged in users can create own whiteboards, add todo lists and sticky notes to their whiteboard, and invite people to also view and edit their whiteboard
- Users can request access to another user's whiteboard. Users can approve requests for access to their boards or simply grant access to a board proactively
- Drag and Drop for positioning whiteboard items
- CSRUF library used to prevent csrf attacks
- Flask-Login used to authorize users
- Redux Store State is used to manage session data on the front end
- Context Providers manage application data on the front end


***

### Wiki Pages
#### [API Documentation](https://github.com/verykenny/r-board/wiki/API-Route-Documentation)
#### [Wireframes](https://github.com/verykenny/r-board/wiki/Wireframes)
#### [Database Schema](https://github.com/verykenny/r-board/wiki/Database-Schema)
<img src="https://github.com/verykenny/r-board/raw/main/planning/r-board.png" alt="rBoard database schema" height="300">

#### [Feature List](https://github.com/verykenny/r-board/wiki/MVP-Feature-List)
#### [User Stories](https://github.com/verykenny/r-board/wiki/User-Stories)
***

### Future Goals
- Magnets(rewards): As development continues on rBoard, adding fun items to decorate the boards with will help fill out boards and make them seem less empty. This also lets users express their personal tastes on their boards. Using some items as rewards for completing todos, adding other users to their boards, etc., may help encourage more use of the application.
- Reminders: Currently, rBoard has a couple of functional items that can commonly be found on whiteboards/fridges, however, more diverse additions like reminders will give users more options to choose from.
- Bills: As somebody who has almost always lived with roommates, being able to keep track of bills and who has/has not paid them was always done on the whiteboard--therefore, this is a high priority addition for me!


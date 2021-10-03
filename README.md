# Welcome to rBoard!

rBoard is a web application that combines your refrigerator space and whiteboard into one app--making it easy to manage chores, reminders, and other oddities in your household or for school. On rBoard, users can create a board, known as a whiteboard, add sticky notes to their board, and invite their family or roommates who have signed up to the board to begin adding things as well!
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
- Flask
- PostgreSQL (Database)
- SQLAlchemy
- AJAX

***

### Key Features
- CSRUF library used to prevent csrf attacks
- Flask-Login used to authorize users
- Logged in users can create own whiteboards, add todo lists and sticky notes to their whiteboard, and invite people to also view and edit their whiteboard.
- Redux Store State is used to manage session data on the front end
- Context Providers manage application data on the front end
- Drag and Drop for positioning whiteboard items

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
- Magnets(rewards)
- Reminders
- Bills


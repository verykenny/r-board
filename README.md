# Welcome to rBoard!

rBoard is a web application that combines your refrigerator space and whiteboard into one application--making it easy to manage chores, reminders, and other oddities in your household or for school. On rBoard, users can create a board, known as a whiteboard, add sticky notes to their board, and invite their family or roommates who have signed up to begin adding things as well!

As someone who has almost always lived with roommates, a project like this has been on my mind for a long time. I wanted something digital, that could be accessed from anywhere and had the versatility of a real whiteboard or fridge. This meant being able to provide an assortment of items to add to the board that could meet most household requirements and leaving the board flexible enough to be organized how the user wants. Being able to keep a household of 5 or 6 people organized can be a struggle and having a solution that is fun to use and that is readily available can make organization a breeze.

<p align="center">
  <img src="https://github.com/verykenny/r-board/blob/main/planning/rBoard_dnd.gif" alt="rBoard drag and drop" height="300">
  <img src="https://github.com/verykenny/r-board/blob/main/planning/rBoard-edit.gif" alt="rBoard in place edit" height="300">
</p>


#### Live link: [rBoard](https://rboard2021.herokuapp.com/home)
***

### Index
[Launch](#launch)

[Technologies](#technologies)

[Key Features](#key-features)

[Wiki Pages](#wiki-pages)

[Future Goals](#future-goals)

***
### Launch
- You can read more about the project using the wiki located at: https://github.com/verykenny/r-board/wiki
- To start a development environment:
  - Clone the repository at: https://github.com/verykenny/r-board
  - Install front-end locally using npm from the react-app directory:
    ```
    npm install
    npm start
    ```
  - Install back-end locally using pipenv "pipenv install" from the root directory:
    ```
    pipenv install
    pipenv run flask run
    ```
  - Navigate to the localhost port specified in config/index.js

***
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
- Draggable components enable users to take control of how their information is organized on the screen:

<p align="center">
  <img src="https://github.com/verykenny/r-board/blob/main/planning/rBoard_dnd.gif" alt="rBoard drag and drop" height="300">
</p>

- On load, initial positioning is relative to the width of the window which ensures that all user elements are placed in the same relative position despite possible changes in screen size:


```js
const [dragData, setDragData] = useState({
    isDragging: false,
    orig: { xPos: 0, yPos: 0 },
    translation: {
        xPos: (window.innerWidth * (element.xPos / 100)),
        yPos: (window.innerHeight * (element.yPos / 100)),
    },
    lastTranslation: {
        xPos: (window.innerWidth * (element.xPos / 100)),
        yPos: (window.innerHeight * (element.yPos / 100)),
    },
```

- On MouseUp event, the current location of the element is stored after checking the type of element. A fetch request is made and the current relative position of the element is updated on the database:

```js
const handleMouseUp = (e) => {
    if (dragData.isDragging) {
        const { translation } = dragData;

        if (element.name) {
            (async () => {
                const response = await fetch(`/api/todo_lists/${element.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: element.name,
                        xPos: Math.floor((translation.xPos / window.innerWidth) * 100),
                        yPos: Math.floor((translation.yPos / window.innerHeight) * 100),
                    })
                })
                const data = await response.json()
                if (data.errors) {
                    console.log(data.errors);
                }
                setDisplayBoardData(prev => {
                    const updatedBoardItems = { ...prev }
                    updatedBoardItems.todoLists = updatedBoardItems.todoLists.map(listedTodoList => {
                        if (listedTodoList.id === element.id) {
                            return data.todoList
                        }
                        return listedTodoList;
                    })
                    return updatedBoardItems;
                })
            })()
        }
    ...
```


- Users can update information in-place without being taken to another page or form. Clicking away or pressing enter saves updates on the database:


```js
{nameEditToggle && (
    <WhiteBoardNameEdit
        autoFocus
        type='text'
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
    />
)}
{!nameEditToggle && (
    <WhiteBoardName onClick={handleChangeBoard}>{board.name}</WhiteBoardName>
)}
```

- In place edit forms are styled to look like the target text:


```js
export const StringEditInput = styled.input`
    border: none;
    background: transparent;
    font-size: inherit;
    font-type: inherit;
    &:focus {
        outline: none;
    }
`;

const WhiteBoardName = styled.p`
    width: 100%;
    &:hover {
        cursor: pointer;
    }
`;

const WhiteBoardNameEdit = styled(StringEditInput)`
    color: white;
    font-size: 16px;
`;
```


- Logged in users can create their own whiteboards, add todo lists and sticky notes to their whiteboard, and invite people to also view and edit their whiteboard.
- Users can request access to another user's whiteboard. Users can approve requests for access to their boards or simply grant access to a board proactively:

<p align="center">
  <img src="https://github.com/verykenny/r-board/blob/main/planning/Screen%20Shot%202021-10-06%20at%2011.10.56%20AM.png?" alt="rBoard access request" height="300">
</p>


- Redux Store State is used to manage session data on the front end.
- Context Providers manage application data on the front end. Admittedly, using Redux Store State would have been a good idea since this is a single-page application. Forcing myself to get away from Redux really helped me realize some of the places where Redux is helpful and helped me learn to be a little more flexible (and not handcuff myself to a particular idea) when it comes to actually implementing the goals I have set for myself or a project. 

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


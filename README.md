# Rock Paper Scissors  

### Abstract:
[//]: <> (Briefly describe what you built and its features. What problem is the app solving? How does this application solve that problem?)
A website allowing users to play a game of rock paper scissors. The user first starts by selecting an avatar and if they want to play the standard version of rock paper scissors or a varian which also includes Spock and a lizard. There is also an option to increase the number of required points to win a round from 3 to 5 or 7. Once the selections are complete the user clicks the play button and plays to play the game. The user then plays the game by selecting the option they want to play. They can start a new game at anytime by clicking the new game button. Once a winner has been determined it will be displayed on the screen, at which point the user needs to click the new game button to return to the main page where they can select another game or avatar. The overall win and losses for each avatar can be previewed from the main page by clicking the view scores button. A list of total losses and wins will be displayed for each avatar. This data will persist on page refresh. The app is solving the issue of keeping someone occupied when they're bored. It solves that problem by keeping the user occupied by playing the game. The short rounds give some satisfaction quickly as each round does not take that much time to play. 

### Installation Instructions:
[//]: <> (What steps does a person have to take to get your app cloned down and running?)
1. fork this repository https://github.com/jalbe0076/rock-paper-scissors-m1-final
2. Clone down your new, forked repo using the generated SSH link in the terminal
3. cd into the repository
4. Open it in your text editor
5. View app in the browser by running open index.html in your terminal

### Preview of App:
[//]: <> (Provide ONE gif or screenshot of your application - choose the "coolest" piece of functionality to show off.)

![App Preview Rock Paper Scissors](./assets/RPS-preview.gif)


### Context:
[//]: <> (Give some context for the project here. How long did you have to work on it? How far into the Turing program are you?)

We were assigned the project on 2023.04.17 and had until 2023.04.25 to complete the project. The required features were completed on 2023.04.21 and refactoring and introducing additional features and technologies were completed on 2023.04.23. This is the Turing Mod 1 final solo project issued in week 5 with the intent to implement everything that was thought since the beginning of Mod. We were tasked to build a Rock Paper Scissors game from scratch. 

### Contributors:
[//]: <> (Who worked on this application? Link to their GitHubs.)

[Jason Alberto](https://github.com/jalbe0076)

### Learning Goals:
[//]: <> (What were the learning goals of this project? What tech did you work with?)

The main learning goal for the project was to reinforce everything that was thought since the beginning of the module. Using concepts such as DRY JavaScript and functional based programming keeping functions pure when possible. VS Code was used as the text editor, GitHub was used as a hosting platform and a GitHub project was opened for planning purposes, Javascript, CSS and HTML were the languages used. The technical work goals involved JavaScript competency as far as functional programming concepts, DOM manipulation and readability. Although this is a solo project, a good Git Workflow going concepts were used, never merging broken or dead code to main and creating new branches as necessary. Once the required features were implemented, localStorage was researched and implemented to ensure the win and loses history would persist on page reload. It was a challenge having the data model update before using localStorage to keep it updated. I got around this by having the main gameData variable object key assigned to the `localStorage` or if `localStorage` was not created, to be assigned to a default object with the wins and loses defaulted to 0. This way we had data to assign to localStorage as it gets updated in the data model. The way the code was written localStorage and the gameData variable's score in JavaScript will persist on page reload.

### Wins + Challenges:
[//]: <> (What are 2-3 wins you have from this project? What were some challenges you faced - and how did you get over them?)
Win #1 was learning how to use `localStorage`, it was a challenge having the data persist in both the JavaScript data model and in `localStorage`. 
Win #2 Getting feedback from the group project to know that I need to work on making my JavaScript more readable, I attempted this by renaming a lot of variable names and functions to be more descriptive. 
Win #3 Organizing CSS to make things easier to find. On previous projects I found finding styles hard, hiving things organized with headers made it so that I did not have to sift through as many CSS rules. 

# NBA API Project

## Project Goal

- Explore backend and database services with Node.js, Flask, and MongoDB
- Create an example for the backend of an app that helps users create a fantasy basketball team. The core operations of this app will be
    - (HTTP GET) Get stats of individual players ✅
    - (HTTP GET) Get lists of players in sorted order based on different stats. This will allow the user to create ✅
    - (HTTP GET) Show a list of my the players on my fantasy team ✅
    - (HTTP POST) Add individual players to a list of players for a fantasy team. The fantasy team will contain 10 players and will be unstructured, so no position requirements, ranking of players or anything else. Just a list of 10 players, numbered 1 through 10. ✅
    - (HTTP PUT) Swap a player in your fantasy list for another player at certain index if that index exists ✅
    - (HTTP DELETE) Delete a player from your fantasy team at a certain index if that index exists ✅
- I want this backend to be a realistic model for how a backend would operate on a mobile frontend.

********Node********

- Look into posting for different kinds of requests, like just player name you would have to do a retrieve, then grab fields, then post. What is realistic?
- Did you need async/await for retrieve calls?
- Make player search by name not case sensitive
- Add ranking to players when showing the fantasy team

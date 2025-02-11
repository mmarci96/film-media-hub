# Film Hub

![GitHub repo size](https://img.shields.io/github/repo-size/mmarci96/film-media-hub?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/mmarci96/film-media-hub?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/mmarci96/film-media-hub?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/mmarci96/film-media-hub?style=for-the-badge)

## Overview
The Film Hub webapp let users browse, filter and search for movies or tv series, as well as saving them for later into their favorites. 
I wanted to racreate my first visually pleasant webapp during my coding jorney with using React with the HeroUI library and using outside API-s to get data as well as using an Express server with MongoDB to save and store users preferences.
Browse, search and find movies or TV series. Save favorites, get data about them, find and compare streaming services.

## Stack
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
---
I wanted to experiment using Typescript in the frontend to make to project maintainable to work on it for a longer period. HeroUI offers a wide variety of components, easy to extend React hooks and Tailwindcss to your custom needs.
For the backend I initiated the project just in Express and NodeJs using Mongoose. This helps me work my way around writing Typescript interfaces but enjoying some type system. This might change if the server side grows.

## Outside API-s
### TMDB - [TMDB API](https://developer.themoviedb.org/docs/getting-started)
Since I'm using TMDB free API to display many of my content to run the code you will need to aquire one.
### Jikan - [Jikan API](https://jikan.moe/)
Jikan (時間) is an unofficial & open-source API for the “most active online anime + manga community and database”. It's completely free to use. Only limiting your maximal request per minute.

---
## Screenshots
<div align="center"><table><tr>Theme Select</tr><tr><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/light.png"/></td><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/dark.png"/></td></tr></table></div>


<div align="center"><table><tr>Browse and Save Movies or Series</tr><tr><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/browse-filter.png"/></td><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/search-filter.png"/></td><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/save-favorites.png"/></td></tr></table></div>

<div align="center"><table><tr>List you favorites</tr><tr><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/get-favorites.png"/></td><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/check-favorites.png"/></td></tr></table></div>

## Installation & Usage
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/film-hub.git
   ```
2. Install dependencies:
   ```sh
   cd server
   npm install

   cd ../client
   npm install
   ```
3. Set up environment variables and run the project:
   ```sh
    cp .env.sample ./server/.env 
   ```
4. Set up a MongoDB cluster with Atlas or Docker and add to the .env file:
    ```env
    MONGO_URI=mongodb://localhost:27017/filmhub-db
    PORT=8080

    JWT_SECRET_KEY=your-secret-key

    ```
5. Start a terminal session for server and client and run:
    ```sh
    npm run dev
    ```


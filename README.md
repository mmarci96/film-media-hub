# Film Hub
![GitHub repo size](https://img.shields.io/github/repo-size/mmarci96/film-media-hub?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/mmarci96/film-media-hub?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/mmarci96/film-media-hub?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/mmarci96/film-media-hub?style=for-the-badge)

## Table of context
<div align="center">
<a href="#overview"><kbd> Overview </kbd></a>&ensp;&ensp;
<a href="#stack"><kbd>  Stack </kbd></a>&ensp;&ensp;
<a href="#external-apis"><kbd>  External API-s </kbd></a>&ensp;&ensp;
<a href="#screenshots"><kbd>  Screenshots </kbd></a>&ensp;&ensp;
<a href="#installation-and-usage"><kbd>  Installation </kbd></a>&ensp;&ensp;
</div>

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

I implemented TypeScript in the frontend to enhance long-term maintainability. 
HeroUI provides a wide variety of components and extendable React hooks, combined with Tailwind CSS for custom styling. 
The backend currently uses Express.js with Mongoose, offering flexibility for future TypeScript integration as the project evolves.

---
## External APIs
### TMDB - [TMDB API](https://developer.themoviedb.org/docs/getting-started)
This project utilizes TMDB's free API for content display. You'll need to obtain your own API key to run the application.
### Jikan - [Jikan API](https://jikan.moe/)
Jikan (時間) offers an unofficial, open-source API for anime and manga data. While completely free to use, it enforces rate limiting (30 requests/minute).

---
## Screenshots
<div align="center"><table><tr>Theme Select</tr><tr><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/light.png"/></td><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/dark.png"/></td></tr></table></div>

<div align="center"><table><tr>Browse and Save Media</tr><tr><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/browse-filter.png"/></td><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/save-favorites.png"/></td></tr></table></div>

<div align="center"><table><tr>Manage Your Favorites</tr><tr><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/get-favorites.png"/></td><td>
<img src="https://raw.githubusercontent.com/mmarci96/film-media-hub/development/screenshots/check-favorites.png"/></td></tr></table></div>

## Installation and Usage
1. Clone the repository:
   ```sh
   git clone https://github.com/mmarci96/film-media-hub.git
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
4. Create a local instance (Docker) or cloud cluster (Atlas) and update the connection string in .env:
    ```.env
    MONGO_URI=mongodb://localhost:27017/filmhub-db #Local example

    PORT=8080

    JWT_SECRET_KEY=your-secret-key
    ```

5. Start a terminal session for server and client and run:
    ```sh
    # Server directory
    npm run dev

    # Client directory
    npm run dev
    ```


# Star Wars Favorites

## Overview
This project is a web application built with **Next.js** that displays a list of Star Wars movies fetched from the [SWAPI API](https://swapi.py4e.com/). Users can mark movies as favorites, and their selections are saved in the browser's local storage so they persist across visits.

## Features
- Display a list of Star Wars movies.
- Mark or unmark movies as favorites.
- Favorites persist after refreshing or revisiting the page.
- Responsive design for various screen sizes.
- Organized code structure with separation of concerns.

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 20 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/starwars-favorites.git
   ```
2. Navigate to the project directory:
   ```bash
   cd starwars-favorites
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure
```
starwars-favorites/
  src/
    app/
      page.js          # Main page to display movies
      [movieId]/       # Dynamic route for movie details
        page.js        # Details page for a specific movie
    styles/
      globals.css      # Global CSS styles
  .gitignore          # Files and directories ignored by Git
  README.md           # Project documentation
  package.json        # Project dependencies and scripts
```

## Technologies Used
- **Next.js**: React framework for server-side rendering and static site generation.
- **CSS**: For responsive design and styling.
- **SWAPI API**: For fetching Star Wars movie data.

## Future Improvements
- Add more details for each movie (characters, planets, etc.).
- Implement search and filter functionality.
- Use a database (e.g., MongoDB) for persistent storage instead of local storage.
- Add animations for better user experience.

## License
This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

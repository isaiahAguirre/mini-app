import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  // const movies = [
  //   {title: 'Mean Girls'},
  //   {title: 'Hackers'},
  //   {title: 'The Grey'},
  //   {title: 'Sunshine'},
  //   {title: 'Ex Machina'},
  // ];

  useEffect(() => {
    fetch('http://localhost:8081/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => setMovies(err))
  }, []);

  const movieList = movies.map((movie, id) =>{
    return(<h1 key = {id}>{movie.title}</h1>)
  })

  return (
    <>
      <div>
          {movieList}
      </div>
    </>
  )
}

export default App

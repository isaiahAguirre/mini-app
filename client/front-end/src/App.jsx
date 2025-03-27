import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const movies = [
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'The Grey'},
    {title: 'Sunshine'},
    {title: 'Ex Machina'},
  ];

  const movieList = movies.map(movie =>{
    return(<h1>{movie.title}</h1>)
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

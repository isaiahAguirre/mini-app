import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextField from '@mui/material/TextField';

function App() {
  const[search, setSearch] = useState('');
  const[movieDisplay, setMovieDisplay] = useState('');

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
      .then(movies =>{
        let tempSearchList = [];

        movies.map((element, id) => {
          if ((element.title.toLowerCase().includes(search.toLowerCase())) || (search === '')) {tempSearchList.push(<p key = {id}>{element.title}</p>)}
        })

        setMovieDisplay(tempSearchList)
        tempSearchList = []
      })
      .catch(err => setMovies(err))
  }, [search]);

  return (
    <>
    <TextField id="search" label="Search..." variant="outlined" onChange={e => setSearch(e.target.value)}/>
      <div className='movie-list'> 
        <h1>Movies:</h1>
          {movieDisplay}
      </div>
    </>
  )
}

export default App

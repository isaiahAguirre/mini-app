import { useEffect, useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function App() {
  const[search, setSearch] = useState('');
  const[movieTitle, setMovieTitle] = useState('');
  const[movieDisplay, setMovieDisplay] = useState('');
  const[delId, setDelId] = useState('');

  const addMovie = async () =>{
    try{
      const response = await fetch('http://localhost:8081/movies', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: movieTitle
      }),
      })
    }catch(err){
      console.log('Error: ', err)
    }
  }

  const delMovie = async (id) =>{
    try{
      const response = await fetch(`http://localhost:8081/movies/${id}`, {
        method: 'DELETE',
      })
    }catch(err){
      console.log('Error: ', err)
    }
  }

  useEffect(() => {
    fetch('http://localhost:8081/movies')
      .then(res => res.json())
      .then(movies =>{
        let tempSearchList = [];
        movies.map((element) => {
          if ((element.title.toLowerCase().includes(search.toLowerCase())) || (search === ''))
          {
            tempSearchList.push(
              <p key = {element.id}>
                {element.title} <IconButton onClick={()=>{delMovie(element.id) }}><DeleteForeverIcon/></IconButton>
              </p>
            )
          }
        })

        setMovieDisplay(tempSearchList)
        tempSearchList = []
      })
      .catch(err => console.log(err))
  }, [search]);



  return (
    <>
    <div><TextField id="search" label="Search..." variant="outlined" onChange={e => setSearch(e.target.value)}/></div>
    <div><TextField id="add-movie" label="Movie to add..." variant="outlined" onChange={e => setMovieTitle(e.target.value)}/></div>
    <Button startIcon={<AddIcon/>} onClick={()=>addMovie()} >Add Movie</Button>
      <div className='movie-list'> 
        <h1>Movies:</h1>
          {movieDisplay}
      </div>
    </>
  )
}

export default App

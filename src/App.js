import React, { useEffect, useState } from 'react'
import axios from 'axios'

import MoviesList from './components/MoviesList'
import './App.css'
import AddMovie from './components/AddMovie'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // axios

  // const fetchMoviesHandler = () => {
  //   setIsLoading(true)
  //   axios.get('https://swapi.dev/api/films/').then((data) => {
  //     const transformedData = data.results.map((movieData) => {
  //       return {
  //         title: movieData.title,
  //         id: movieData.episode_id,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date,
  //       }
  //     })
  //     setMovies(transformedData)
  //     setIsLoading(false)
  //   })
  // }

  // async/await

  const fetchMoviesHandler = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(
        'https://react-http-d3f5e-default-rtdb.firebaseio.com/movies.json'
      )

      if (!res.ok) {
        throw new Error('Something went wrong!')
      }

      const data = await res.json()

      console.log(data)

      const loadedMovies = []

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

      setMovies(loadedMovies)
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchMoviesHandler()
  }, [])

  // fetch method

  // const fetchMoviesHandler = () => {
  //   setIsLoading(true)
  //   fetch('https://swapi.dev/api/films/')
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((data) => {
  //       const transformedData = data.results.map((movieData) => {
  //         return {
  //           title: movieData.title,
  //           id: movieData.episode_id,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         }
  //       })
  //       setMovies(transformedData)
  //       setIsLoading(false)
  //     })
  // }

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      'https://react-http-d3f5e-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    console.log(data)
  }

  let content = <p>Click to find</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <h1>Loading...</h1>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App

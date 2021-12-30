import React, { useState } from 'react'
import axios from 'axios'

import MoviesList from './components/MoviesList'
import './App.css'

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
      const res = await fetch('https://swapi.dev/api/films/')
      if (!res.ok) {
        throw new Error('Something went wrong!')
      }
      const data = await res.json()
      const transformedData = await data.results.map((movieData) => {
        return {
          title: movieData.title,
          id: movieData.episode_id,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      })
      setMovies(transformedData)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

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
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  )
}

export default App

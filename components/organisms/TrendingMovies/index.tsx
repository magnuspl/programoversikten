import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { getTrendingMovies } from '../../../services/data_api';
import { DetailMovieTypes } from '../../../services/data_types';
import MovieItem from '../../molecules/MovieItem';
import FormSearch from "../Navbar/FormSearch";

export default function TrendingMovies() {
  const [active, setActive] = useState('week');
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState(null);

  const getTrendingMoviesAPI = useCallback(async (param) => {
    const response: any = await getTrendingMovies(param);
    setMovies(response.results);
    if(response.results.length > 0) setFeatured(response.results[0])
  }, []);

  useEffect(() => {
    getTrendingMoviesAPI(active);
  }, [active]);

  const rootImg = process.env.NEXT_PUBLIC_IMG;


  return (
    <div className="section-trending container-xxxl">
      {  /*@ts-ignore*/ }
      {false && featured && <div>
        <div className="d-flex justify-content-center align-items-center backdrop-featured pb-10">
          <div className="faded faded-all">
              {  /*@ts-ignore*/ }
              <img className="featured-img" src={`${rootImg}/w1280${featured?.backdrop_path}`} alt={`backdrop ${featured?.title}`}/>
          </div>
          <div className="featured-search w-50">
            <FormSearch />
          </div>
        </div>
      </div>}
      <div className="popular d-flex justify-content-between align-items-sm-center align-items-end mb-5 mt-5">
        <div className="d-flex flex-column flex-sm-row align-items-start gap-3">
          <h3 className="fw-bold">Populære filmer</h3>
          <div className="button-wrapper d-flex">
            <button
              type="button"
              className={`btn btn-trending ${active === 'week' ? 'btn-active' : ''}`}
              onClick={() => setActive('week')}
            >
              Denne uken
            </button>
            <button
              type="button"
              className={`btn btn-trending ${active === 'day' ? 'btn-active' : ''}`}
              onClick={() => setActive('day')}
            >
              I dag
            </button>
          </div>
        </div>
        <div>
          <Link href={`/filmer/trending?q=${active}&page=1`}>
            <a className="view-all">
              Se alle
            </a>
          </Link>
        </div>
      </div>
      <div className="trending-wrapper scroll-wrapper pb-5">
        {movies.map((movie: DetailMovieTypes) => (
          <MovieItem
            key={movie.id}
            id={movie.id}
            title={movie.title}
            release_date={movie.release_date}
            poster={movie.poster_path}
            rate={movie.vote_average}
            count={movie.vote_count}
            type="poster"
          />
        ))}
      </div>
    </div>
  );
}

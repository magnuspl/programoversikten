import SectionHeader from '../../components/organisms/DetailMovieContent/SectionHeader';
import SectionInfo from '../../components/organisms/DetailMovieContent/SectionInfo';
import SectionRecom from '../../components/organisms/DetailMovieContent/SectionRecom';
import VideoTrailer from '../../components/organisms/DetailMovieContent/VideoTrailer';
import Footer from '../../components/organisms/Footer';
import Navbar from '../../components/organisms/Navbar';
import {
  getCredits, getDetailMovie, getSimilarMovies, getVideoTrailer, getWatchProviders,
} from '../../services/data_api';
import { DetailMovieTypes } from '../../services/data_types';
import SectionProviders from "../../components/organisms/DetailMovieContent/SectionProviders";

interface DetailMovieProps {
  movie: DetailMovieTypes;
  similarMovies: DetailMovieTypes[];
  credits: any;
  providers: any;
  trailer: {
    key: string;
  }
}

export default function DetailMovie(props: DetailMovieProps) {
  const {
    movie, similarMovies, trailer, credits, providers
  } = props;
  const rootImg = process.env.NEXT_PUBLIC_IMG;

  const flatRate = providers?.results?.NO?.flatrate

  return (
    <>
      <div className="d-none">
        <Navbar />
      </div>
      <div className="detail-movie mb-5">
        <div className="section-backdrop">
          <img src={`${rootImg}/w1280/${movie?.backdrop_path}`} alt={`backdrop ${movie?.title}`} />
        </div>
        <div className="section-content">
          <SectionHeader movie={movie} />
          {false && <div className="providers">
            {flatRate && flatRate.map(it => (
                <div className={"flex flex-row"}>
                  <div className="movie-poster mb-3">
                    <img src={`${rootImg}/w500${it.logo_path}`} alt={`backdrop ${it.provider_name}`}/>
                  </div>
                  {it.provider_name}
                </div>
            ))}
          </div>}
          <SectionProviders similarMovies={flatRate} />
          <SectionInfo movie={movie} credits={credits} />
          <SectionRecom similarMovies={similarMovies} />
        </div>
        <div className="overlay">
          <VideoTrailer trailer={trailer} />
        </div>
      </div>
      <Footer />
    </>
  );
}

interface GetStaticProps {
    params: {
        id: number;
    }
}

export async function getServerSideProps({ params }: GetStaticProps) {
  const { id } = params;

  console.log("ID: ")
  console.log(id)

  const movie = await getDetailMovie(id);
  const providers = await getWatchProviders(id);
  const videosMovie:any = await getVideoTrailer(id);
  const trailer = videosMovie?.results?.filter((result: any) => result.type === 'Trailer')[0] || null;
  const similarMovies:any = await getSimilarMovies(id);
  const credits = await getCredits(id);

  return {
    props: {
      movie,
      trailer,
      credits,
      similarMovies: similarMovies.results,
      providers
    },
  };
}
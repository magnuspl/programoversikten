import { DetailMovieTypes } from '../../../services/data_types';
import MovieItem from '../../molecules/MovieItem';
import ProviderItem from "../../molecules/ProviderItem";

interface SectionProvidersProps {
    similarMovies: DetailMovieTypes[];
}

export default function SectionProviders(props: SectionProvidersProps) {
  const { similarMovies } = props;

  return (
    <div className="section-recom px-4 px-sm-5 mt-5">
    {similarMovies && <h5 className="fw-bold mb-3">Streamingtjenester</h5>}
      <div className="scroll-wrapper pb-5">
        {similarMovies?.map((similar: DetailMovieTypes) => {
          if (similar.backdrop_path !== null) {
            return (
              <ProviderItem
                key={similar.id}
                id={similar.id}
                title={similar.provider_name}
                release_date={similar.release_date}
                backdrop={similar.logo_path}
                rate={similar.vote_average}
                count={similar.vote_count}
                genres={similar.genres}
                type="backdrop"
              />
            );
          }
        })}
      </div>
    </div>
  );
}

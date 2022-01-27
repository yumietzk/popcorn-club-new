import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieRelated,
} from '../actions';
import Title from './Title';
import DetailMain from './detail/DetailMain';
import Cast from './detail/Cast';
import Reviews from './detail/Reviews';
import Related from './detail/Related';
import styles from './Detail.module.css';

// movieとtvを統合できるはず
// fetchするとき、groupでmovieかtvか、typeでdetail, credits, reviews, relatedの何かをパラメータで渡してaction creatorも統合できるはず
const Detail = ({
  selectedItem,
  setSelectedItem,
  setDetailBackground,
  setIsDetail,
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieRelated,
  movieDetail,
  movieCasts,
  movieReviews,
  movieRelated,
  isFetching,
  isError,
}) => {
  // const [selectedItem, setSelectedItem] = useState({
  //   category: SelectorsData.movies.category[0].title,
  //   order: SelectorsData.movies.order[0].title,
  //   count: SelectorsData.movies.count[0].title,
  // });
  const { id } = useParams();

  useEffect(() => {
    setIsDetail(true);

    return () => {
      setIsDetail(false);
    };
  }, []);

  useEffect(() => {
    fetchMovieDetail(id);
    fetchMovieCredits(id);
    fetchMovieReviews(id);
    fetchMovieRelated(id);
  }, [id]);

  useEffect(() => {
    setDetailBackground({
      isON: true,
      url: movieDetail?.backdrop_path,
    });

    return () => {
      setDetailBackground({
        isON: false,
        url: '',
      });
    };
  }, [movieDetail]);

  return (
    <React.Fragment>
      <Title type="movies" isDetail={true} />
      <div className={styles.detail}>
        <DetailMain
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          group="movies"
          data={movieDetail}
          isFetching={isFetching}
          isError={isError}
        />
        <Cast data={movieCasts} isFetching={isFetching} isError={isError} />
        <Reviews
          data={movieReviews}
          isFetching={isFetching}
          isError={isError}
        />
        <Related
          data={movieRelated}
          isFetching={isFetching}
          isError={isError}
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    movieDetail: state.detail.detail,
    movieCasts: state.detail.casts,
    movieReviews: state.detail.reviews,
    movieRelated: state.detail.related,
    isFetching: state.detail.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieRelated,
})(Detail);

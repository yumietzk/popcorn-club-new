import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import // fetchMovieNowPlaying,
// fetchTvOnAir,
// fetchMovieUpcoming,
// fetchMovieTopRated,
'../actions';
import styles from './Card.module.css';

const Card = (props) => {
  // useEffect(() => {
  //   props.fetchMovieNowPlaying();
  //   props.fetchTvOnAir();
  // }, []);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const renderItems = () => {
    if (props.group === 'Movie') {
      if (!props.movies) {
        return <div>Loading...</div>;
      }

      return props.movies.map((movie) => {
        return (
          <Link
            to={`/detail/${movie.id}`}
            key={movie.id}
            className={`${styles.card} ${styles[props.cname]}`}
          >
            <div className={styles.img}>
              <img
                className={styles.poster}
                src={
                  props.cname
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : `https://image.tmdb.org/t/p/original${movie.poster_path}`
                }
                alt={movie.original_title}
              />
            </div>
            {props.cname ? (
              ''
            ) : (
              <p className={styles.title}>{movie.original_title}</p>
            )}
            {props.cname ? (
              ''
            ) : (
              <p className={styles.date}>{calcYear(movie.release_date)}</p>
            )}
          </Link>
        );
      });
    }

    if (props.group === 'TV Show') {
      if (!props.shows) {
        return <div>Loading...</div>;
      }

      return props.shows.map((show) => {
        return (
          <Link
            to={`/detailtv/${show.id}`}
            key={show.id}
            className={`${styles.card} ${styles[props.cname]}`}
          >
            <div className={styles.img}>
              <img
                className={styles.poster}
                src={
                  props.cname
                    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
                    : `https://image.tmdb.org/t/p/original${show.poster_path}`
                }
                alt={show.original_name}
              />
            </div>
            {props.cname ? (
              ''
            ) : (
              <p className={styles.title}>{show.original_name}</p>
            )}
            {props.cname ? (
              ''
            ) : (
              <p className={styles.date}>{calcYear(show.first_air_date)}</p>
            )}
          </Link>
        );
      });
    }
  };

  return <React.Fragment>{renderItems()}</React.Fragment>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies[ownProps.type],
    shows: state.shows[ownProps.type],
  };
};

export default connect(mapStateToProps, {
  // fetchMovieNowPlaying,
  // fetchTvOnAir,
  // fetchMovieUpcoming,
  // fetchMovieTopRated,
})(Card);
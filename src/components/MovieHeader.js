import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import styles from './MovieHeader.module.css';

const MovieHeader = (props) => {
  const [curSlide, setCurSlide] = useState(0);

  const maxSlide = 10;

  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      setCurSlide(0);
    } else {
      setCurSlide(curSlide + 1);
    }
  };

  const prevSlide = () => {
    if (curSlide === 0) {
      setCurSlide(maxSlide - 1);
    } else {
      setCurSlide(curSlide - 1);
    }
  };

  const truncate = (str, n) => {
    return str?.length > n ? `${str.substr(0, n - 1)}...` : str;
  };

  const renderHero = () => {
    if (!props.movies) {
      return <div>Loading...</div>;
    }

    return props.movies.map((movie, i) => {
      return (
        <div
          className={styles.slide}
          key={movie.id}
          style={{
            transform: `translateX(${100 * (i - curSlide)}%)`,
            backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={styles.description}>
            <p className={styles.name}>{movie.original_title}</p>
            <p className={styles.overview}>{truncate(movie.overview, 250)}</p>
            <Link to={`/detail/${movie.id}`} className={styles.more}>
              More
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.slider}>
      {renderHero()}
      <button className={styles['btn-left']} onClick={prevSlide}>
        <AiIcons.AiOutlineLeft className={styles['btn-icon']} />
      </button>
      <button className={styles['btn-right']} onClick={nextSlide}>
        <AiIcons.AiOutlineRight className={styles['btn-icon']} />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies.popular,
  };
};

export default connect(mapStateToProps)(MovieHeader);

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import movieTrailer from 'movie-trailer';
import * as IoIcons from 'react-icons/io';
import { truncate } from '../../../helpers/Truncate';
// import MovieTrailer from '../../MovieTrailer';
import styles from './Card.module.css';

const Card = ({ group, data, cname }) => {
  const [loaded, setLoaded] = useState(false);
  // const [trailerUrl, setTrailerUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // if group === tv detail, create render function

  useEffect(() => {
    setLoaded(false);
  }, []);

  // ここで一つ一つトレイラーを作っていることで時間がかかっているみたい。ボタンを押してからトレイラー対応するなりなんか考える
  // ⚠️やっぱりまだ最初のダウンロードに時間がかかっているから、トレイラーではなくてdetailに飛ぶボタンなりなんかにしてみる

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <React.Fragment>
      <div className={styles.img}>
        <img
          className={`${styles.poster} ${
            cname === 'grid' && styles['grid-poster']
          } ${loaded && styles['poster-open']}`}
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.original_title ? data.original_title : data.original_name}
          onLoad={onLoad}
        />
        <div className={styles.cover}>
          {/* <button
            className={styles['cover-btn']}
            // onClick={() => setIsModalOpen(true)}
          >
            <Link>
              <IoIcons.IoIosMore className={styles['cover-icon']} />
            </Link>
          </button> */}
          <Link
            // to={`detail/${data.id}`}
            to={`../../${group === 'movies' ? 'detail' : 'tvdetail'}/${
              data.id
            }`}
            className={styles['cover-btn']}
          >
            <IoIcons.IoIosMore className={styles['cover-icon']} />
          </Link>
        </div>
      </div>
      <Link
        // to={`detail/${data.id}`}
        to={`../../${group === 'movies' ? 'detail' : 'tvdetail'}/${data.id}`}
        className={styles.title}
      >
        {group === 'tvdetail'
          ? data.name
          : data.original_title
          ? truncate(data.original_title, 24)
          : truncate(data.original_name, 24)}
      </Link>
      <p className={styles.dateseason}>
        {group === 'tvdetail'
          ? `${data.episode_count} episodes`
          : calcYear(
              data.release_date ? data.release_date : data.first_air_date
            )}
      </p>
      {/* <MovieTrailer
        id={data.id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      /> */}
    </React.Fragment>
  );
};

export default Card;

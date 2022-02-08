import React, { useEffect, useRef } from 'react';
// import LoadingIndicator from '../helpers/LoadingIndicator';
import useObserver from '../hooks/useObserver';
import styles from './PersonMain.module.css';

const PersonMain = ({ person }) => {
  const ref = useRef();
  const [curElement, setSrc] = useObserver(ref);

  const targetData = !person.profile_path
    ? 'https://cdn.dribbble.com/users/1090020/screenshots/15509551/media/fe29a709b7a89315c1673d143c23c2c1.png?compress=1&resize=1200x900&vertical=top'
    : `https://image.tmdb.org/t/p/original${person.profile_path}`;

  useEffect(() => {
    setSrc(targetData);
  }, [curElement]);

  return (
    <div className={styles.main}>
      <div className={styles.img} ref={ref}>
        <img
          // src={
          //   !person.profile_path
          //     ? 'https://cdn.dribbble.com/users/1090020/screenshots/15509551/media/fe29a709b7a89315c1673d143c23c2c1.png?compress=1&resize=1200x900&vertical=top'
          //     : `https://image.tmdb.org/t/p/original${person.profile_path}`
          // }
          alt={person.name}
          className={styles.poster}
          // loading="lazy"
        />
      </div>
      <div className={styles.bio}>
        {/* truncateしたい、read moreでトグルできるように */}
        <p className={styles['bio-text']}>{person.biography}</p>
        <button className={styles.btn}>Read More</button>
      </div>
    </div>
  );
};

export default PersonMain;

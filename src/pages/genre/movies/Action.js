import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchActionMovies } from '../../../actions';
import Genre from '../../../components/Genre';

const Action = (props) => {
  useEffect(() => {
    props.fetchActionMovies();
  }, []);

  return <Genre title="Movies" type="Action" genre="action" />;
};

export default connect(null, {
  fetchActionMovies,
})(Action);
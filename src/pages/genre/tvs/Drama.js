import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDramaTv } from '../../../actions';
import Genre from '../../../components/Genre';

const DramaShow = (props) => {
  useEffect(() => {
    props.fetchDramaTv();
  }, []);

  return <Genre title="TV Shows" type="Drama" genre="dramashow" />;
};

export default connect(null, {
  fetchDramaTv,
})(DramaShow);
import React from 'react';
import Loader from 'react-loader-spinner';
import { StyledSpinner } from '../styles/style';

const Spinner = () => {
  return (
    <StyledSpinner>
      <Loader
        type="TailSpin"
        color="#2699fb"
        height={100}
        width={100}
        timeout={3000}
      />
    </StyledSpinner>
  );
};

export default Spinner;

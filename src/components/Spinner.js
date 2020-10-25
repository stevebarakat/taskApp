import React from 'react';
import Loader from 'react-loader-spinner';
import { Center } from '../styles/style';

const Spinner = () => {
  return (
    <Center>
      <Loader
        type="TailSpin"
        color="#2699fb"
        height={100}
        width={100}
        timeout={3000}
      />
    </Center>
  );
};

export default Spinner;

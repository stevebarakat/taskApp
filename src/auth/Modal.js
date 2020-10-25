import React from "react";
import styled from 'styled-components';
import { Flex, BackDrop } from '../styles/style';
import { AnimatePresence, motion } from "framer-motion";
import { AiFillCloseSquare } from 'react-icons/ai';

const StyledModal = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: #212936;
  height: auto;
  width: 85vw;
  max-width: 350px;
  border-radius: 4px;
  box-shadow: 1px 4px 5px hsla(0, 0%, 0%, 0.5);  
  z-index: 225;
`;


const Modal = ({ isToggled, setToggle, children }) => {
  return (
    <AnimatePresence>
      {isToggled && (
        <>
          <BackDrop onClick={isToggled => setToggle(!isToggled)} />
          <StyledModal
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: "30px",
              left: "50%",
              padding: "1rem",
              transform: "translate3d(-50%, 0,0)"
            }}
          >
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }}>
              <Flex style={{justifyContent: "space-between"}}>
              <h3 style={{paddingTop: "0.63rem"}}>Password Recovery</h3>
              <AiFillCloseSquare 
                style={{
                  fontSize: "3rem",
                  color: "#EEE",
                  cssFloat: "right"
                }}
                onClick={isToggled => setToggle(!isToggled)} 
                />
              </Flex>
              <hr />
                <p>Please enter your email address to recieve a password reset.</p>
              {children}
            </motion.div>
          </StyledModal>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;

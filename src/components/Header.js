import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { IconLink, Button, StyledHeader, Logo, Title } from '../styles/style';
import { FaUserCircle } from 'react-icons/fa';
import { ImList2 } from 'react-icons/im';
import { bodyBg, borderColor } from '../styles/colors';

export const MenuModal = styled(motion.div)`
  background: ${bodyBg};
  border: 1px solid ${borderColor};
  height: auto;
  border-radius: 4px;
  box-shadow: 1px 4px 5px hsla(0, 0%, 0%, 0.5);
  z-index: 55;
  right: -1rem;
  position: absolute;
  padding: 0.5rem;
  width: 168px;
  text-align: center;
`;

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -100 },
};

const Header = ({ isSignedIn, user, handleClearUser }) => {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setModalOpen(!isModalOpen));

  const signOut = () => {
    auth.signOut().then(function () {
      // Sign-out successful.
      setModalOpen(!isModalOpen);
    })
    .then(() => handleClearUser())
    .catch(function (error) {
      // An error happened.
    });
  };

  return (
    <StyledHeader type={isSignedIn ? 'signedIn' : 'signedOut'}>
      {!isSignedIn && <Logo><ImList2 style={{ paddingTop: '.9rem' }} /></Logo>}
      <Title>Task <span style={{ fontWeight: '600' }}>App</span></Title>
      {isSignedIn && 
        <div style={{position: "absolute", right: "18px"}}>
          <IconLink onClick={() => setModalOpen(true)}>
            {user?.photoURL ?
              <img
                style={{borderRadius: "4px", border: "1px solid #707070"}}
                alt={user.displayName} 
                src={user.photoURL} 
                width="50px" 
              /> :
              <FaUserCircle style={{ fontSize: "3rem" }} />
            }
          </IconLink>
          {isModalOpen && (
            <AnimatePresence>
              <MenuModal
                ref={ref}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                  <span>{user.displayName}</span>
                  <Button onClick={signOut}>sign out</Button>
              </MenuModal>
            </AnimatePresence>
          )}
        </div>
      }
    </StyledHeader>
  );
};
export default Header;



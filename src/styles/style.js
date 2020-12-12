import styled from 'styled-components';
import { inputBg, colorPrimary, borderColor, textColor } from './colors';
import { motion } from 'framer-motion';

export const Container = styled.div`
  max-width: 100%;
  width: 370px;
  border: 1px solid ${borderColor};
  margin: 0 auto;
  padding-bottom: 0.5rem;
  background: #212936;
  `;

export const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const BtnLink = styled.button`
  font-weight: 600;
  text-transform: capitalize;
  color: #AAA;
  background: none;
  margin: 0;
  border: none;
  &:focus,
  &:hover {
    color: #FFF;
    text-decoration: underline;
  }
`;

export const EndCap = styled.div`
  display: flex;
  font-size: 1.25rem;
  text-align: center;
  color: ${borderColor};
  &:hover,
  &:focus{
    color: #FFF;
  }
`;

export const DragHandle = styled.div`
  display: flex;
  &:hover,
  &:focus{
    background: ${colorPrimary};
    color: #FFF;
  }
`;

export const Button = styled.button`
  color: ${borderColor};
  background: ${p => p.google ? `${inputBg}` : `${inputBg}`};
  border: 1px solid ${borderColor};
  text-transform: uppercase;
  padding: 0.5rem;
  margin: ${p => p.secondary ? '0' : '0.5rem 0 0'};
  width: ${p => p.secondary ? '60px' : '100%'};
  height: 50px;
  transition: all 0.15s;
  &:focus,
  &:hover {
    background: 'hsla(207, 96%, 91%, 0.5)';
    color: #FFF;
    border: 1px solid #FFF;
    border-bottom: 3px solid #FFF;
  };
`;

export const IconLink = styled.button`
    border: none;
    border-radius: 4px;
    background: none;
    color: #FFF;
    padding: 0.1rem 0.2rem;
  &:focus,
  &:hover {
    border: none;
    border: 1px solid #fff;
  };
`;

export const ButtonIcon = styled.div`
  color: "${colorPrimary}",;
  position: "relative",;
  width: "50px",;
  height: "50px",;
  border: "1px solid ${colorPrimary}",;
  margin: "0.5rem 0 0",;
`;

export const StyledHeader = styled.header`
  position: relative;
  background: ${inputBg};
  border-bottom: 1px solid ${borderColor};
  display: flex;
  flex-direction: ${({ type }) => (type === 'signedIn' ? 'row' : 'column')};
  justify-content: space-between;
  color: #fff;
  padding: 1rem;
`;

export const Logo = styled.div`
  background: ${inputBg};
  border-radius: 90%;
  border: 1px solid ${borderColor};
  width: 70px;
  height: 70px;
  text-align: center;
  color: ${borderColor};
  font-size: 2.5rem;
  padding-top: 0.1rem;
  margin: 0 auto;
  `;

export const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-weight: 200;
  font-size: 1.5rem;
  margin-top: 1rem;
`;

export const StyledTaskForm = styled.form`
  margin: 1.5rem 0 1.5rem;
`;

export const ListItemContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  justify-content: space-between;
  transition: all .15s;
  border-bottom: 1px solid ${borderColor};
  &:hover,
  &:active {
    button,
    div:nth-child(3){
      color: #FFF;
    }
    color: ${textColor};
    border-bottom: 1px solid ${textColor};
  }
`;

export const TaskText = styled.div`
    padding: 0 0.1rem;
    cursor: text;
    &:focus {
    outline: 0;
  }
`;

export const ListItem = styled.li`
  list-style: none; 
  padding-top: 12px;
  padding-left: 0.25rem;
  padding: 1rem 0;
`;

export const Center = styled.div`
  margin: 0 auto;
  text-align: center;
`;

export const Label = styled.label`
  color: ${textColor};
  transition: all 0.2s;
  touch-action: manipulation; 
`;

export const TextInput = styled.input`
  position: relative;
  cursor: text;
  font-size: 1rem;
  border: 1px solid ${borderColor};
  border-top: 1px solid ${borderColor};
  border-bottom: 1px solid ${borderColor};
  padding: 1rem 0 0 1rem;
  max-width: 100%;
  width: 100%;
  height: 50px;
  z-index: 1;
  background: ${inputBg};
  color: ${textColor};
  transition: all 0.1s;
  touch-action: manipulation;
  border-radius: 0;
  &:focus {
    outline: 0;
    background: none;
  }
  &:placeholder-shown + label {
    cursor: text;
    margin-left: 4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform: translate(0, 1rem) scale(1);
    position: absolute;
  }
  &:not(:placeholder-shown) + label,
  &:focus + label{
    transform: translate(0, -2px) scale(0.85);
    cursor: pointer;
    z-index: 3;
    position: absolute;
    margin-left: 50px;
    color: ${borderColor};
  }
`;

export const Field = styled.div`
  display: flex;
  position: relative;
  padding: 0.5rem 0;
`;

export const TaskField = styled.div`
  margin: 1rem 0;
  display: flex;
  position: relative;
`;
export const Flex = styled.div`
  display: flex;
`;

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: hsla(0, 0%, 0%, 0.85);
  z-index: 1;
`;

export const InputIcon = styled.div`
  padding: .75rem 1rem;
  z-index: 1;
  color: ${borderColor};
  background: ${inputBg};
  border: 1px solid ${borderColor};
  z-index: 9;
  position: relative; 
`;

export const ErrorMessage = styled.div`
  color: #de5246;
  background: hsla(5, 70%, 57%, 0.15);
  border: 1px solid #de5246;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

export const StyledSpinner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
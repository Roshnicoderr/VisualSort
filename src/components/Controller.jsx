import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaRedo, FaRandom } from 'react-icons/fa';
import shallow from 'zustand/shallow';
import { useControls, useData } from '../common/store';
import { 
  convertInputToArrayString, 
  convertArrayStringToArray, 
  getRandomArray,
  delay
} from '../common/helper';

const ControlPanel = styled.div`
  background: var(--white);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const ControlItem = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--dark-gray);
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  font-size: 1rem;
  transition: var(--transition);
  background: var(--white);
  color: var(--text);

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(74, 111, 165, 0.2);
  }
`;

const SliderContainer = styled.div`
  padding: 0 0.5rem;
`;

const StyledSlider = styled.input`
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: var(--light-gray);
  border-radius: 3px;
  outline: none;
  opacity: 0.7;
  transition: var(--transition);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: var(--transition);
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: var(--transition);
  }

  &:hover {
    opacity: 1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  background: ${props => props.primary ? 'var(--primary)' : 'var(--light-gray)'};
  color: ${props => props.primary ? 'white' : 'var(--text)'};
  box-shadow: ${props => !props.primary ? '0 2px 4px rgba(0,0,0,0.05)' : '0 2px 8px rgba(74, 111, 165, 0.3)'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => !props.primary ? '0 4px 8px rgba(0,0,0,0.1)' : '0 4px 12px rgba(74, 111, 165, 0.4)'};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export function Controller() {

  const [isPausing, setIsPausing] = useState(false);

  const [arrayInput, setArrayInput] = useState('');

  const [progress, speed, swapTime] = useControls(
    (state) => [state.progress, state.speed, state.swapTime],
    shallow
  );

  const [sortingArray, setSortingArray] = useData(
    (state) => [state.sortingArray, state.setSortingArray],
    shallow
  );

  const [startSorting, pauseSorting, resetSorting, setSpeed] = useControls(
    (state) => [
      state.startSorting,
      state.pauseSorting,
      state.resetSorting,
      state.setSpeed,
    ],
    shallow
  );

  // Initialize array input when component mounts
  React.useEffect(() => {
    setArrayInput(sortingArray.join(', '));
  }, [sortingArray]);

  async function pauseAndDelaySorting() {
    pauseSorting();
    setIsPausing(true);
    await delay(swapTime);
    setIsPausing(false);
  }

  function arrayDataChangeHandler(value) {
    const arrayString = convertInputToArrayString(value);
    setArrayInput(arrayString);

    const array = convertArrayStringToArray(arrayString);
    setSortingArray(array);
    resetSorting();
  }

  function generateRandomArray() {
    const randomArray = getRandomArray();
    setArrayInput(randomArray.join(', '));
    setSortingArray(randomArray);
    resetSorting();
  }

  function getControlButton() {
    // Always show the start button if no progress state is set
    if (!progress || progress === 'start' || progress === 'paused' || progress === 'reset') {
      return (
        <Button primary onClick={startSorting}>
          <FaPlay /> Start Sorting
        </Button>
      );
    }

    if (isPausing) {
      return (
        <Button disabled>
          <FaPause /> Pausing...
        </Button>
      );
    }

    if (progress === 'inProgress') {
      return (
        <Button onClick={pauseAndDelaySorting}>
          <FaPause /> Pause
        </Button>
      );
    } 
    
    // Default case - show reset button
    return (
      <Button primary onClick={resetSorting}>
        <FaRedo /> Reset
      </Button>
    );
  }

  function handleSpeedChange(e) {
    setSpeed(Number(e.target.value));
  }

  return (
    <ControlPanel>
      <ControlGroup>
        <ControlItem>
          <Label htmlFor="array-input">Array Elements</Label>
          <Input
            id="array-input"
            type="text"
            value={arrayInput}
            onChange={(e) => arrayDataChangeHandler(e.target.value)}
            placeholder="e.g. 5, 3, 8, 4, 2"
            disabled={progress === 'inProgress'}
          />
        </ControlItem>
        
        <ControlItem>
          <Label>Speed</Label>
          <SliderContainer>
            <StyledSlider
              type="range"
              min="1"
              max="1000"
              value={speed}
              onChange={handleSpeedChange}
              disabled={progress === 'inProgress'}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--dark-gray)' }}>Slow</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--dark-gray)' }}>Fast</span>
            </div>
          </SliderContainer>
        </ControlItem>
      </ControlGroup>

      <ButtonGroup>
        {getControlButton()}
        <Button 
          onClick={generateRandomArray}
          disabled={progress === 'inProgress'}
        >
          <FaRandom /> Randomize
        </Button>
      </ButtonGroup>
    </ControlPanel>
  );
}

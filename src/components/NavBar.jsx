import React from 'react';
import styled from 'styled-components';
import { sortingAlgorithms } from '../common/config';
import { useData } from '../common/store';
import shallow from 'zustand/shallow';
import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Nav = styled.nav`
  background: var(--white);
  box-shadow: var(--shadow);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 0.9rem;
  color: var(--text);
  
  img {
    margin-left: 0.5rem;
    height: 1.2rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavTabs = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  scrollbar-color: var(--secondary) transparent;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--secondary);
    border-radius: 4px;
  }
`;

const TabButton = styled.button`
  background: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text)'};
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
  font-weight: 500;

  &:hover {
    background: ${props => props.active ? 'var(--primary)' : 'var(--light-gray)'};
  }
`;

const GitHubLink = styled.a`
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: var(--transition);
  font-weight: 500;

  &:hover {
    background: var(--light-gray);
    color: var(--primary);
  }
`;

export function NavBar() {
  const [algorithm, setAlgorithm] = useData(
    (state) => [state.algorithm, state.setAlgorithm],
    shallow
  );

  return (
    <Nav>
      <NavContainer>
        <Logo>VisualSort</Logo>
        <Counter>
          Visitors: 
          <img 
            src="https://visitor-badge.glitch.me/badge?page_id=visualsort.visitor.badge" 
            alt="Visitor counter" 
            onError={(e) => e.target.style.display = 'none'}
          />
        </Counter>
        <NavTabs>
          {sortingAlgorithms.map((algo, index) => (
            <TabButton
              key={algo.id}
              active={algorithm === index}
              onClick={() => setAlgorithm(index)}
              aria-label={`Select ${algo.name} algorithm`}
            >
              {algo.name}
            </TabButton>
          ))}
        </NavTabs>
        <GitHubLink 
          href="https://github.com/yourusername/sorting-visualizer" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaGithub size={20} />
          View on GitHub
        </GitHubLink>
      </NavContainer>
    </Nav>
  );
}

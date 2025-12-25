import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Controller } from "./components/Controller";
import { AlgoDisplay } from "./components/AlgoDisplay";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #4a6fa5;
    --secondary: #6b8cae;
    --accent: #ff6b6b;
    --background: #f8f9fa;
    --text: #2c3e50;
    --light-gray: #e9ecef;
    --dark-gray: #495057;
    --white: #ffffff;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background);
    color: var(--text);
    line-height: 1.6;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export default function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <NavBar />
      <MainContent>
        <Controller />
        <AlgoDisplay />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

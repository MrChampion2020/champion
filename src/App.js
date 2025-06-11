import React from "react";

import "./App.css";
import Navigation from "./navigation/Navigation";
import Modal from "react-modal";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from '../src/screens/context/ThemeContext'; 

function App() {
  return (
    <>
    <ThemeProvider>
      <AuthProvider>
        <>
        
          <Navigation />

          <Modal />
        </>
      </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;



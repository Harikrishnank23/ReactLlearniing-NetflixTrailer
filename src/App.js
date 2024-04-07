import React from 'react';
import NavBar from './components/NavBar/NavBar';
import './App.css'
import Banner from './components/Banner/Banner';
import RowPoster from './components/RowPoster/RowPoster';
import { actions, comedy, documentaries, originals, romance } from './urls';

function App() {
  return (
    <div className="App">
     
      <NavBar />
      <Banner />
      <RowPoster url={originals} title="Netflix orginals"/>
      <RowPoster url={actions} title="Action" isSmall/>
      <RowPoster url={comedy} title="Comedy" isSmall/>
      <RowPoster url={romance} title="Romance" isSmall/>
      <RowPoster url={documentaries} title="Documentaries" isSmall/>
    </div>
  );
}

export default App;

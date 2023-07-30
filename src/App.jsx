import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import { useEffect } from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <header className='header'>
          <h1 className='title'>Notes App</h1>
        </header>
        <main className='main'>
          <Sidebar />
          <Routes>
              <Route path='/' element={<NoteList />} />
              <Route path='/add' element={<AddNote />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App

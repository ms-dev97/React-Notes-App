import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const openDB = indexedDB.open('Note DB', 1);

    openDB.addEventListener('upgradeneeded', (e) => {
        const thisDB = e.target.result;
    
        if (!thisDB.objectStoreNames.contains('notes')) {
            thisDB.createObjectStore('notes', {autoIncrement: true});
        }
    });

  }, []);

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

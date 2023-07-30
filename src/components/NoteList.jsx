import { useState, useEffect } from "react";
import trashIcon from '../../public/trash-fill.svg';

function NoteList() {
    const [notes, setNotes] = useState([]);
    const notesDB = indexedDB.open('Note DB', 1);

    useEffect(() => {
        function fetchData(e) {
            const result = e.target.result;
            const notesArr = [];

            result.transaction(['notes'], 'readonly').objectStore('notes').openCursor().onsuccess = function(e) {
                const cursor = e.target.result;
    
                if (cursor) {
                    const value = {...cursor.value, id: cursor.key}
                    notesArr.push(value);
                    cursor.continue();
                } else {
                    setNotes(notesArr);
                }
            }

        }

        notesDB.addEventListener('upgradeneeded', (e) => {
            const thisDB = e.target.result;
        
            if (!thisDB.objectStoreNames.contains('notes')) {
                thisDB.createObjectStore('notes', {autoIncrement: true});
            }
        });

        notesDB.addEventListener('success', fetchData);

        return () => notesDB.removeEventListener('success', fetchData);
    }, []);

    function updateNoteStatus(e) {
        const checked = e.target.checked;
        const key = e.target.dataset.key;

        if (checked) {
            e.target.closest('.note').classList.add('checked');
            checkStatus(key);
            setNotes((oldNotes) => (
                oldNotes.map(note => note.id == key ? {...note, status: 1} : note)
            ));
        } else {
            e.target.closest('.note').classList.remove('checked');
            uncheckStatus(key);
            setNotes(oldNotes => (
                oldNotes.map(note => note.id == key ? {...note, status: 0} : note)
            ));
        }
    }

    function checkStatus(key) {
        const objectStore = notesDB.result.transaction(['notes'], 'readwrite').objectStore('notes');
        objectStore.get(+key).onsuccess = function(e) {
            const data = e.target.result;
            data.status = 1;
            objectStore.put(data, +key);
        }
    }

    function uncheckStatus(key) {
        const objectStore = notesDB.result.transaction(['notes'], 'readwrite').objectStore('notes');
        objectStore.get(+key).onsuccess = function(e) {
            const data = e.target.result;
            data.status = 0;
            objectStore.put(data, +key);
        }
    }

    function deleteNote(e) {
        const key = e.target.dataset.key;

        // Delete from database
        notesDB.result.transaction(['notes'], 'readwrite').objectStore('notes').delete(+key);

        // Update state
        setNotes(oldNotes => (
            oldNotes.filter(note => note.id != key)
        ));
    }

    return (
        <div className="note-grid">
            {notes.map(note => (
                <article key={note.id} className={`note ${note.status == 1 && 'checked'}`}>
                    <h2 className="note-title">
                        {note.title}
                    </h2>
                    <p className="note-body">
                        {note.body}
                    </p>
                    <div className="options">
                        <div className="note-status">
                            <input 
                                type="checkbox" 
                                className="note-check" 
                                id={`note-check-${note.id}`} 
                                data-key={note.id}
                                onChange={updateNoteStatus}
                                checked={note.status == 1 ? 'checked' : ''}
                                />

                            <label htmlFor={`note-check-${note.id}`}>Done</label>
                        </div>

                        <img 
                            className="delete" 
                            src={trashIcon} 
                            alt="Delete Note"
                            title="Delete Note"
                            data-key={note.id}
                            onClick={deleteNote}
                        />
                    </div>
                </article>
            ))}
        </div>
    );
}

export default NoteList;
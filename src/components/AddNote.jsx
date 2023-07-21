import { useState } from "react";

function AddNote() {
    const [note, setNote] = useState({
        title: '',
        body: '',
        status: 0
    });

    const [errors, setErrors] = useState({
        emptyTitle: '',
        emptyBody: '',
    });

    function addNote(title, body) {
        if (title == '') {
            setErrors({...errors, emptyTitle: 'This field can\'t be empty'});
            return;
        }
        if (body == '') {
            setErrors({...errors, emptyBody: 'This field can\'t be empty'});
            return;
        }
        
        const openDB = indexedDB.open('Note DB', 1);

        openDB.addEventListener('success', e => {
            const db = e.target.result;

            db.transaction(['notes'], 'readwrite').objectStore('notes').add(note).onsuccess = function () {
                setNote({title: '', body: ''});
            }
        });
        
    }

    return (
        <div>
            <div className="input-container">
                <input
                    className="title-input" 
                    type="text" 
                    name="title" 
                    id="title" 
                    value={note.title} 
                    placeholder="Title" 
                    onChange={e => setNote({...note, title: e.target.value})} />

                {/* Error */}
                {errors.emptyTitle != '' && <div className="input-error">{errors.emptyTitle}</div>}
            </div>

            <div className="input-container">
                <textarea
                    name="body" 
                    id="body" 
                    className="body-input"
                    value={note.body} 
                    placeholder="Note text..." 
                    onChange={e => setNote({...note, body: e.target.value})} />

                {/* Errors */}
                {errors.emptyBody != '' && <div className="input-error">{errors.emptyTitle}</div>}
            </div>

            <button type="button" className="add-note" onClick={() => addNote(note.title, note.body)}>Add Note</button>
        </div>
    );
}

export default AddNote;
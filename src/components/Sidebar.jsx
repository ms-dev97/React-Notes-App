import {useNavigate} from 'react-router-dom';
import addIcon from '../../public/add-note.svg';
import notesIcon from '../../public/notes.svg';

function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="sidebar-item" onClick={() => navigate('/add')}>
                <div className="icon">
                    <img src={addIcon} />
                </div>
                Add Note
            </div>

            <div className="sidebar-item" onClick={() => navigate('/')}>
                <div className="icon">
                    <img src={notesIcon} />
                </div>
                Notes
            </div>
        </div>
    );
}

export default Sidebar;
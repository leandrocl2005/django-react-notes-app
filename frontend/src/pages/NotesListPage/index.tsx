import React, { useState, useEffect } from 'react'
import AddButton from '../../components/AddButton'
import ListItem from '../../components/ListItem'
import { NoteProps } from '../../types/notes';

const NotesListPage = () => {

    const [notes, setNotes] = useState<NoteProps[]>([]);

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = async () => {
        const response = await fetch('/api/notes/');
        const data = await response.json();
        setNotes(data);
    }

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>

            <div className="notes-list">
                {notes.map(note => (
                    <ListItem key={note.id} id={note.id} body={note.body} updated={note.updated} />
                ))}
            </div>
            <AddButton />
        </div>
    )
}

export default NotesListPage;

import { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { NoteProps } from '../../types/notes';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg'

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const NotePage = ({ match }: Props) => {

    const id = match.params.id;
    const history = useHistory()
    const [note, setNote] = useState<NoteProps>({ id: 0, body: '', updated: '' })

    useEffect(() => {
        getNote(id);
    }, [id]);

    const getNote = async (id: string) => {

        if (id === 'new') return;

        let response = await fetch(`/api/notes/${id}`)
        let data = await response.json();

        setNote(data);
    }

    const deleteNote = async () => {
        await fetch(`/api/notes/${id}/delete`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        history.push('/')
    }

    const updateOrCreateNote = async () => {
        if (id === 'new') {
            if (note.body === '') {
                alert('Body must be not empty!')
                return;
            }
            await fetch(`/api/notes/create/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
            history.push('/')
        } else {
            if (note.body === '') {
                alert('Body must be not empty!')
                return;
            }
            await fetch(`/api/notes/${note.id}/update/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
            history.push('/')
        }
    }

    const handleChange = (value: string) => {
        setNote({ ...note, 'body': value })
    }

    return (
        <div className="note" >
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={() => history.push('/')} />
                </h3>
            </div>
            <div>
                <textarea onChange={(e) => handleChange(e.target.value)} value={note?.body}></textarea>
                <div className='actions-buttons-container'>
                    <button className="action-button" onClick={updateOrCreateNote}>Save</button>
                    {id !== 'new' ?
                        <button className="action-button" onClick={deleteNote}>Delete</button> :
                        ''}
                </div>
            </div>
        </div>
    )
};

export default NotePage;
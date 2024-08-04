import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = ({children}) => {
    const host = "http://localhost:5000"
    
    const [notes, setNotes] = useState([])

    const getNotes = async ()=>{
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json()
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        })
        const json = await response.json()
        setNotes(notes.concat(json))
    }

    // Delete a Note
    const deleteNote = async (id)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json()
        console.log(json.note._id);
        
        const newNotes = notes.filter((note)=>{return note._id !== json.note._id})
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title: title, description: description, tag: tag})
        })
        const json = await response.json()
        
        // Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for(let index = 0; index < newNotes.length; index++){
            if(newNotes[index]._id === json._id){
                newNotes[index].title = json.title
                newNotes[index].description = json.description
                newNotes[index].tag = json.tag
                break
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState;
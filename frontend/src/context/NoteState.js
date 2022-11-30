import { useState } from "react";
import context from "./contextfile";
import { NotesUrl } from "../ApiLinks";

const NoteState = (props)=>{
    //Show Alert
    const [alert,setAlert] = useState(null)
    const showAlert=(type,msg)=>{
     setAlert({type,msg})
     setTimeout(() => {
       setAlert(null)
     }, 2000);
   }



    //Local Array Of Notes 
    const [notes,setNotes]=useState([])
    
    // Function:-1 Fetchin all notes of the user and save them locally in notes Array
    const GetNotes = async ()=>{
        const auth= localStorage.getItem('auth')
            // using trycatch block
            try {
                let Usernotes = await fetch(NotesUrl,{
                    method:"GET",
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':auth
                    }
                });
                Usernotes = await Usernotes.json();
                if(Usernotes.success){
                    setNotes(Usernotes.notes);
                }else{
                    showAlert('error',Usernotes.msg)
                }
            } catch (error) {
                showAlert('error',"some error occured at GetNotes(front-end)")
            }
    }



    // Function:-2 Add Notes (in both local Array of notes and DB)
    const AddNote = async (title,desc,tag,setLoading)=>{
        const auth= localStorage.getItem('auth')
        setLoading(true)
            // using trycatch block
            try {
                let note = await fetch(NotesUrl,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':auth
                    },
                    body:JSON.stringify({title,desc,tag})
                });
                note = await note.json();
                if(note.success){
                    setLoading(false)
                    GetNotes();
                    showAlert('success',note.msg);
                }else{
                    showAlert('error',note.msg)
                    setLoading(false)
                    console.log(note)
                }
            } catch (error) {
                setLoading(false)
                showAlert("error","some error occured in AddNote (front-end)")
            }
    }


    // Function:-3 Update Note (in both local Array of notes and DB)
    const UpdateNote = async (id,title,desc,tag,setLoading,onClose)=>{
        const auth= localStorage.getItem('auth');
        setLoading(true)
            // using trycatch block
            try {
                let note = await fetch(`${NotesUrl}/${id}`,{
                    method:"PUT",
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':auth
                    },
                    body:JSON.stringify({title,desc,tag})
                });
                note = await note.json();
                if(note.success){
                    setLoading(false)
                    GetNotes();
                    showAlert('success',note.msg)
                    onClose()
                }else{
                    setLoading(false)
                    showAlert('error',note.msg)
                    onClose()
                }
            } catch (error) {
                setLoading(false)
                showAlert("error","some error occured in UpdateNote (front-end)")
                onClose()
            }
    }

    //Function:-4 Delete Note (in both local Array of notes and DB)
    const DeleteNote = async (id)=>{
        const auth= localStorage.getItem('auth')
            // using trycatch block
            try {
                let note = await fetch(`${NotesUrl}/${id}`,{
                    method:"DELETE",
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':auth
                    }
                });
                note = await note.json();
                if(note.success){
                    GetNotes();
                    showAlert('success',note.msg)
                }else{
                   showAlert('error',note.msg)
                }
            } catch (error) {
                showAlert("error","some error occured in Delete (front-end)")
            }
    }


    return(
        <context.Provider value={{notes ,GetNotes,AddNote,UpdateNote,DeleteNote,alert,showAlert}}>
            {props.children}
        </context.Provider>
    )
}

export {NoteState};
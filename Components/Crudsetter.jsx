import {  useState } from "react"
import axios from 'axios';
export default function Crudsetter(){

    const [message,setMessage] = useState([])

    const [submitText,setsubmitText] = useState(null)
    
    // for undoying the last submit.This will remove the last element from list in backend.
    function undo(){
        axios.get(`http://localhost:8080/counter/undo`).then(res=>{
                setMessage(res.data)
        })
    }
    //delete the entire dataset
    function setdelete(){
        
        axios.delete(`http://localhost:8080/counter/delete`).then(res=>{
                setMessage(res.data)
        })
    }
    //will redo the undo done before redo.
    function redo(){
        axios.get(`http://localhost:8080/counter/redo`).then(res=>{
                setMessage(res.data)
        })
      
}
    //save the value to the dataset. null check to avoid adding null values.
    function submitVal(){
        if(submitText !== null){
        axios.get(`http://localhost:8080/counter/submit/${submitText}`).then(response=>{
            setMessage(response.data)
        })}
    }


    return(
        <div className="container m-5"><div>
            <div className="p-4 m-3 bg-light border"> {submitText}</div>
            
           
            <div><button className="btn btn-success p-2 m-2"  onClick={()=>setsubmitText("Add")}>Add</button>
            <button className="btn btn-success p-2 m-2" onClick={()=>setsubmitText("Sub")}>Sub</button>          
            <button className="btn btn-success p-2 m-2" onClick={()=>setsubmitText("Mult")}>mult</button></div>
            <div><button className="btn btn-primary p-2 m-2" onClick={()=>undo()}>Undo</button>
            <button className="btn btn-danger p-2 mr-2" onClick={()=>setdelete()}>Delete</button>
            <button className="btn btn-primary p-2 m-2" onClick={()=>redo()}>Redo</button></div>
            <div><button className="btn btn-primary p-4 m-2" onClick={()=>submitVal()}>submit</button></div>
            <div>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                            <tr>
                                <th class>messages</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        message.map(
                            todo => (
                                <tr >
                                    <td>{todo}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
        </div>
        </div>
    )
}
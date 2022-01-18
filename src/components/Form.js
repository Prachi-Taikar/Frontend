import React, {useState, useEffect  } from 'react'
import APIService from '../APIService'
import {useCookies} from 'react-cookie'


function Form (props) {

    const[title, setTitle] = useState(props.book.title)
    const[description, setDescription] = useState(props.book.description)
    const[token] = useCookies(['mytoken'])

    useEffect( () => {
        setTitle(props.book.title)
        setDescription(props.book.description)
    }, [props.book])

    const updateBook = () => {
        APIService.updateBook(props.book.id, {title, description}, token['mytoken'] )
        .then(resp => props.updatedInformation(resp))
    }

    const addBook = () => {
        APIService.addBook({title, description}, token['mytoken'])
        .then(resp => props.addedInformation(resp))
    }


    return (
        <div>
          {props.book? (

            <div className = "mb-3">
                <label htmlFor = "title" className = "form-label"> Title </label>

                <input type = "text" className = "form-control" id = "title" placeholder = "Please Enter the Title..." 
                value = {title} onChange = {e => setTitle(e.target.value)}></input>

                <label htmlFor = "description" className = "form-label"> Description </label>
                
                <textarea className = "form-control" id ="description" rows = "5" placeholder = "Please Enter the Description..." 
                value = {description} onChange = {e => setDescription(e.target.value)} ></textarea>
                
                <br />

                {
                    props.book.id ?  <button onClick = {updateBook} className = "btn btn-success"> Update Book</button>
                    : <button onClick = {addBook} className = "btn btn-success"> Add Book</button>
                }
            
            </div>

          ) : null }

        </div>
    )
}


export default Form

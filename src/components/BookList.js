import React from 'react'
import APIService from '../APIService';
import {useCookies} from 'react-cookie'

function BookList(props) {

    const[token] = useCookies(['mytoken'])

    const editBtn = (book) => {
        props.editBtn(book)
    }

    const deleteBtn = (book) => {
        APIService.DeleteBook(book.id, token['mytoken'])
        .then(() => props.deleteBtn(book))
        .catch(error => console.log(error))
        
    }

    return (
        <div>
                <h2><b>Book List</b></h2>
                <hr className = "hrclass" />
                
            {props.books &&  props.books.map(book => {
            return (
                
                <div key = {book.id}>

                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                    <div className = "row">
                    <div className = "col-md-1"><br />
                       <button  className = "btn btn-primary" onClick = { () => editBtn(book) }> Update </button> 
                       </div> 

                    <div className = "col"> <br />
                        
                       <button  onClick = {() => deleteBtn(book)} className = "btn btn-danger"> Delete </button> 
                    </div>

                    </div>
                    <hr className = "hrclass" />
                

                    
                </div>
        )
      })}
        </div>
    )
}

export default BookList

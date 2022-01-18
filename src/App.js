
import './App.css';
import {useState , useEffect} from 'react'
import BookList from './components/BookList';
import Form from './components/Form';
import { useCookies } from 'react-cookie';
import {useHistory} from 'react-router-dom'



function App() {

  const [books, setBooks] = useState([])
  const [editBook, setEditBook] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])

  useEffect(() => {
      fetch('http://127.0.0.1:8000/api/books/', {
        'method':'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Token ${token ['mytoken']}`
        }
      })

      .then(resp => resp.json())
      .then(resp => setBooks(resp))
      .catch(error => console.log(error))

  }, [])

  let history = useHistory()

  useEffect( () =>{
    if (!token ['mytoken' ]){
         history.push('/')
        //window.location.href = '/'
    }
}, [token] )

  const editBtn = (book) => {
      setEditBook(book)
  }

  const updatedInformation = (book) => {
    const new_book = books.map(mybook => {

      if (mybook.id === book.id) {
        return book;
      }

      else {
        return mybook;
      }
    })

    setBooks(new_book)
  }

  const bookForm = () => {
    setEditBook({title: '', description: ''})
  }

  const addedInformation = (book) => {
    const new_books = [...books, book ]
    setBooks(new_books)
  }

  const deleteBtn = (book) => {
    const new_books = books.filter( mybook => {

      if( mybook.id === book.id){
        return false
    }
    return true;
  })
  setBooks(new_books)
}

const logoutBtn = () =>{
  removeToken(['mytoken'])
}

  return (
    <div className="App">

      <div className = "row" >
        <div className = "col">
        <h1>Library Management System</h1>
        <br/><br />

      </div>

      <div className = "col">
        <button onClick = {bookForm} className= "btn btn-primary"> Add Book</button>
      </div>

      <div className = "col">
        <button onClick = {logoutBtn} className= "btn btn-primary"> Logout</button>
      </div>

      <BookList books = {books} editBtn = {editBtn} deleteBtn = {deleteBtn} />
      {editBook ? <Form book = {editBook} updatedInformation = {updatedInformation}  addedInformation = {addedInformation} /> : null}
      
      <hr className = "hrclass" />
    </div></div>
  );
}

export default App;

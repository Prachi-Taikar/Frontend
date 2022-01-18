



export default class APIService {
    static updateBook (book_id, body, token) {

        return fetch(`http://127.0.0.1:8000/api/books/${book_id}/`, {
            'method' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Token ${token}`
              },

              body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static addBook(body, token) {
        return fetch(`http://127.0.0.1:8000/api/books/`, {
            'method' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Token ${token}`
              },

              body:JSON.stringify(body)
        }).then(resp => resp.json())
    }


    static DeleteBook(book_id, token) {
        return fetch(`http://127.0.0.1:8000/api/books/${book_id}/`, {
            'method' : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Token ${token}`
              }

        })
    }

    static LoginUser(body) {
        return fetch(`http://127.0.0.1:8000/auth/`, {
            'method' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                
              },

              body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static RegisterUser(body) {
        return fetch(`http://127.0.0.1:8000/api/users/`, {
            'method' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                
              },

              body:JSON.stringify(body)
        }).then(resp => resp.json())
    }
}







import './App.css'

function App() {

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    console.log(user)

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.insertedId){
        alert("User Added Successfully!")
        form.reset()
      }
    })
  }

  return (
    <>
      <div>
        <h2>Simple Crud</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name='name' placeholder='Name' required/><br />
          <input type="email" name='email' placeholder='Email' required/><br />
          <input type="submit" value='Submit' />
        </form>
      </div>
    </>
  )
}

export default App

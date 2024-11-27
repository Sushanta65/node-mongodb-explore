import { useLoaderData } from "react-router-dom";


const Update = () => {
    const loaderUser = useLoaderData()
    console.log(loaderUser)
    const handleUpdate = (event) => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = {name, email}
        console.log(user)

        fetch(`http://localhost:5000/users/${loaderUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    return (
        <div>
            <h3>Update User <i><b>{loaderUser.name}</b></i></h3>
            <div>
                <form onSubmit={handleUpdate}>
                    <input type="name" placeholder="Name" name="name" defaultValue={loaderUser.name}/>
                    <br />
                    <input type="email" placeholder="Email" name="email" defaultValue={loaderUser.email}/>
                    <br />
                    <input type="submit" value="Update" />
                </form>
            </div>
        </div>
    );
};

export default Update;
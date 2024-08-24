import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const LogIn = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""});

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/auth/login` , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
      
          const json = await response.json();
          console.log(json);

          if(json.success){
            //save the credentials in the local storage and redirect
            localStorage.setItem("token", json.authToken);
            props.showAlert("LoggedIn successfully");
            navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }



  return (
    <div class="mt-3">
        <h2>LogIn to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
  </div>
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default LogIn

import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = (props) => {

  const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name, email, password} = credentials;

      const host = "http://localhost:5000";

      const response = await fetch(`${host}/api/auth/createuser` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, email, password})
        });
    
        const json = await response.json();
        console.log(json);
        
        if(json.success){
          //save the credentials in the local storage and redirect
          localStorage.setItem("token", json.authToken);
          navigate("/");
          props.showAlert("Your account created successfully")
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
      <h2>SignUp to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">Enter your E-Mail here</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
  </div>
  <div class="mb-3">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default SignUp

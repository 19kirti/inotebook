import React from 'react'

const Alert = (props) => {
  return (
    <div>
    {props.alert && <div class="alert alert-primary" role="alert">
    {props.alert.msg}
    </div>}
    </div>
  )
}

export default Alert;

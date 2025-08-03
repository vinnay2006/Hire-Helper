import React from 'react'

function Alert(props) {
  return (
    <div>
      <div className={props.class} role="alert">
{props.message}
</div>
    </div>
  )
}

export default Alert

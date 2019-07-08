import React from 'react'

const Dashboard = ({onLogout}) => {
  return (
    <div>
      <div>Header</div>
      <button onClick={onLogout}>logout</button>
      <div>Footer</div>
    </div>
  )
}

export default Dashboard

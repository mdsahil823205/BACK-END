import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {
  const [user, setUser] = useState([])
  useEffect(() => {
    axios.get("/api/user").then((res) => {
      setUser(res.data)
      console.log(res.data)
    })
  }, [])

  return (
    <div>
      {user.map((data, key) => {
        return <ul key={key}>
          <li>{data.username}</li>
          <li>{data.age}</li>
          <li>{data.city}</li>
        </ul>
      })}
    </div>
  )
}

export default App
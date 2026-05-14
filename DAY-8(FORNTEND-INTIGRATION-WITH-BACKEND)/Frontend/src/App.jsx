import React, { useState } from "react";
import axios from "axios"
const App = () => {
  const [notes, setnotes] = useState([
    {
      title: "this is test title",
      description: "this is test description",
    },
    {
      title: "this is test title",
      description: "this is test description",
    },
  ]);
  axios.get('http://localhost:3000/api/notes').then((res) => {
    setnotes(res.data.notes)
  })
  return (
    <div className="notes">
      {notes.map((dets, idx) => {
        return (
          <div className="note" key={idx}>
            <h2>{dets.title}</h2>
            <p>{dets.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;

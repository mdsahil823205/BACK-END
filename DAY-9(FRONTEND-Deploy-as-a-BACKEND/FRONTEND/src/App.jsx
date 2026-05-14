import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [note, setnote] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [editid, seteditid] = useState(null);

  function fetchdata() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      console.log(res.data.note);
      setnote(res.data.note);
    });
  }

  function submithandle(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/notes", { title, description })
      .then(() => {
        fetchdata();
        settitle("");
        setdescription("");
      });
  }

  function deletehandle(noteid) {
    axios.delete(`http://localhost:3000/api/notes/${noteid}`).then(() => {
      fetchdata();
    });
  }
  function updatehandle(e) {
    e.preventDefault();

    axios.patch(`http://localhost:3000/api/notes/${editid}`, {
      title, description
    }).then(() => {
      fetchdata();
      seteditid(null);
      settitle("");
      setdescription("");
    });
  }

  useEffect(() => {
    fetchdata();
  }, []);
  return (
   <main className="bg-gray-950 min-h-screen w-full">
      <form
        className="p-4 flex gap-2 flex-wrap"
        onSubmit={editid ? updatehandle : submithandle}
      >
        <input
          type="text"
          placeholder="enter a title"
          className="px-5 py-2 w-90 border-2 bg-[#ffffffb5] text-[#0b0000] font-semibold rounded-lg"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter a description"
          className="px-5 py-2 w-90 border-2 bg-[#ffffffb5] text-[#0b0000] font-semibold rounded-lg"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
        <button className="text-white px-6 py-0.5 rounded-md border">
          {editid ? "update" : "submit"}
        </button>
      </form>
      <div className="all_card p-5 flex gap-4 flex-wrap">
        {note.map((card) => {
          return (
            <div
              key={card._id}
              className="card relative h-78 max-w-70 bg-gray-800 rounded-2xl text-[#e7e3e3] px-3 py-2 capitalize "
            >
              <div className="title text-2xl border-b-2 mt-5 mb-5">
                <h2 className="mb-4">{card.title} </h2>
              </div>
              <div className="description text-md h-37 overflow-auto">
                <p>{card.description}</p>
              </div>
              <div className="modify mt-4 border-t-2 flex gap-3 justify-around">
                <div
                  className="update bg-[green] px-5 p-1 mt-2 active:scale-95 rounded-md"
                  onClick={() => {
                    seteditid(card._id);
                    settitle(card.title);
                    setdescription(card.description);
                  }}
                >
                  update
                </div>
                <div
                  className="delete bg-red-600 px-5 p-1 mt-2 active:scale-95 rounded-md"
                  onClick={() => {
                    deletehandle(card._id);
                  }}
                >
                  delete
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default App;

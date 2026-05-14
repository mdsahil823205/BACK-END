import React from "react";
import "./features/shared/styles/Global.scss";
import FaceExpression from "./features/expression/components/FaceExpression";
import { RouterProvider } from "react-router";
import { Router } from "./App.routes.jsx";
import { AuthProvider } from "./features/auth/context/Auth.context.jsx";
import { SongContextProvider } from "./features/home/context/song.context";
function App() {
  return (
    <div>
      {/* <FaceExpression /> */}
      <AuthProvider>
        <SongContextProvider>
          <RouterProvider router={Router} />
        </SongContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

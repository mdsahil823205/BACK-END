import React from "react";
import FaceExpression from "../../expression/components/FaceExpression.jsx";
import { useSong } from "../hooks/useSong.js";
import Player from "../components/Player.jsx";

const Home = () => {
    const { handleGetSong } = useSong();

    return (
        <div>
            <FaceExpression
                onClick={(expression) => {
                    handleGetSong({ mood: expression });
                }}
            />
            <Player />
        </div>
    );
};

export default Home;

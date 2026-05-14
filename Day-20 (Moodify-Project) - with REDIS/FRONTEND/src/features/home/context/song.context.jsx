import { createContext, useState } from "react";

export const songContext = createContext();

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/qnt7clkc1/cohort/moodify/songs/Baby_Holi_Hai_-_PagalNew__JhGNOoqO1.mp3",
        "posterUrl": "https://ik.imagekit.io/qnt7clkc1/cohort/moodify/poster/Baby_Holi_Hai_-_PagalNew__g4O2zyKVP.jpeg",
        "title": "Baby Holi Hai - PagalNew ",
        "mood": "surprised",
    });
    const [loading, setLoading] = useState(false);

    return (
        <songContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </songContext.Provider>
    );
};

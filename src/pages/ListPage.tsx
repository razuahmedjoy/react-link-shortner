import ShortURLList from "../components/ShortURLList";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IShortURL } from "../interface";

import { useState, useEffect } from "react";

const ListPage = () => {

    const [shortURLs, setShortURLs] = useState<IShortURL[]>([]);
    const [data] = useLocalStorage();

    useEffect(() => {
        setShortURLs(data);
    },[])

    return (
        <div>
            <h2 className="text-xl font-bold text-center my-8">Shorten URLs</h2>
            <ShortURLList shortURLs={shortURLs} setShortURLs={setShortURLs} />
        </div>
    );
};

export default ListPage;
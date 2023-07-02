import React, { useState, useEffect } from "react";
import { IShortURL } from "../interface";
import { Input, Button } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import ShortURLList from "../components/ShortURLList";
const HomePage: React.FC = () => {

    const [longURL, setLongURL] = useState<string>("");
    const [shortURLs, setShortURLs] = useState<IShortURL[]>([]);

    const generateShortURL = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newShortURL: IShortURL = {
            id: Math.random().toString(32).substring(2, 8),
            longURL: longURL,
        };
        setShortURLs((prev) => {
            localStorage.setItem("shortURLs", JSON.stringify([newShortURL, ...prev]));
            return [newShortURL, ...prev];
        });
        setLongURL("");

        toast.success("Short URL generated successfully");
    };


    useEffect(() => {
        const data = localStorage.getItem("shortURLs");
        if (data) {
            setShortURLs(JSON.parse(data));
        }
    }, []);

    return (

        <>
            <h1 className="text-3xl font-bold text-center">URL Shortener App</h1>
            <form onSubmit={generateShortURL}>
                <div className="flex just w-full mt-16">
                    <Input
                        type="url"
                        required
                        label="Long URL"
                        value={longURL}
                        onChange={(e) => setLongURL(e.target.value)}
                        className="pr-3 rounded-none"

                    />
                    <Button
                        type="submit"
                        size="md"
                        color={"blue"}

                        className="rounded-none"
                    >
                        Generate
                    </Button>
                </div>
            </form>


            <div className="mt-12">
                <h2 className="text-xl font-bold">Latest URLs</h2>

                <div className="mt-4">
                    {
                        shortURLs.length > 0 ? <ShortURLList shortURLs={shortURLs} setShortURLs={setShortURLs} limit={3} buttonLink={"/list"}/>
                            :
                            <div className="text-center mt-8">
                                <p>No URLs generated yet</p>
                            </div>
                    }
                </div>
            </div></>

    );
};

export default HomePage;

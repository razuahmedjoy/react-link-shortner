import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { IShortURL } from '../interface';
import { toast } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';

const EditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [shortURLs, setShortURLs] = useState<IShortURL[]>([]);
    const navigate = useNavigate();
    const [data] = useLocalStorage();

    const [longURL, setLongURL] = useState<string>("");

    const updateURL = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedShortUrls = shortURLs.map((item: IShortURL) => {
            if (item.id === id) {
                return {
                    id: id,
                    longURL: longURL,
                };
            }
            return item;
        });
        setShortURLs(updatedShortUrls);
        localStorage.setItem("shortURLs", JSON.stringify(updatedShortUrls));
        toast.success("URL updated successfully");
    }

    const deleteUrl = () => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const updatedShortUrls = shortURLs.filter((item: IShortURL) => item.id !== id);
                        setShortURLs(updatedShortUrls);
                        localStorage.setItem("shortURLs", JSON.stringify(updatedShortUrls));
                        toast.success("URL deleted successfully");
                        navigate("/");
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log("no")
                }
            ]
        });

    }

    useEffect(() => {

        setShortURLs(data);
        const url = data.find((item: IShortURL) => item.id === id);
        if (url) {
            setLongURL(url.longURL);
        }
    }, [id])


    return (
        <>
            <h1 className="text-3xl font-bold text-center">Edit URL</h1>
            <form onSubmit={updateURL}>
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
                        Update
                    </Button>
                </div>
                <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">

                    Short URL : http://localhost:5173/{id}
                </Typography>
                <div className="text-center mt-8">
                    <Button color="red" size="sm" onClick={deleteUrl}>
                        Delete
                    </Button>


                </div>


                <div className="text-center my-20">
                    <Button color="indigo" size="sm" onClick={() => navigate(-1)}>
                        Go Back
                    </Button>


                </div>
            </form>

        </>
    );
};

export default EditPage;
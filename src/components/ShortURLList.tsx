import { IShortURL } from "../interface";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { confirmAlert } from 'react-confirm-alert';

type IShortURLListProps = {
    shortURLs: IShortURL[];
    setShortURLs: (shortURLs: IShortURL[]) => void;
    limit?: number;
    buttonLink?: string;
};
const ShortURLList = ({ shortURLs, setShortURLs, limit, buttonLink }: IShortURLListProps) => {


    const link = buttonLink ? buttonLink : "/react-link-shortner";
    const data = limit ? shortURLs.slice(0, limit) : shortURLs;

    const navigate = useNavigate();

    const openLongUrl = (url: string) => {
        window.open(url, '_blank');
    };

    const deleteUrl = (id: string) => {

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
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log("no")
                }
            ]
        });


    }




    return (

        <>

            <ul className="flex flex-col gap-2">
                {data?.map((shortUrl) => (
                    <li className="p-2 px-3 bg-indigo-50 flex justify-between items-center" key={shortUrl.id}>

                        <span className="cursor-pointer" onClick={() => openLongUrl(shortUrl.longURL)}>   http://localhost:5173/{shortUrl.id}</span>
                        <div className="flex text-lg gap-3">
                            <Link to={`/react-link-shortner/edit/${shortUrl.id}`}>
                                <AiOutlineEdit className="cursor-pointer" />
                            </Link>
                            <AiOutlineDelete className="cursor-pointer" onClick={() => deleteUrl(shortUrl.id)} />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="text-center mt-8">
                <Button color="indigo" size="sm" onClick={() => navigate(link)}>
                    {
                        limit ? "See All" : "Go Back"
                    }
                </Button>


            </div>
        </>
    );
};

export default ShortURLList;
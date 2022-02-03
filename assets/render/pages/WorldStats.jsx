import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const WorldStats = () => {
    const [world, setWorld] = useState({});
    let {worldSlug} = useParams();

    useEffect(() => {
        const getData = async () => {
            let token = localStorage.getItem("token");
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            try {
                const res = await axios.get(
                    `/api/worlds/${worldSlug}`,
                    config
                )
                setWorld(res.data.content);
            } catch (err) {
                setWorld(null);
            }
        }
        getData();
    }, []);

    const {name, createdAt, description, url, isPublic} = world;

    return (
        <div>
            {name}
        </div>
    );
};

export default WorldStats;

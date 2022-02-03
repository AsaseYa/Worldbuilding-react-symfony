import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import SideNavbar from "../components/navbar/SideNavbar";
import OptionBar from "../components/navbar/OptionBar";

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

    return (
        <div className={'page__container'}>
            <SideNavbar/>
            <div className="world__stats__page__container">
                <OptionBar open={open} setOpen={setOpen}/>
                <div className="world__stats__dashboard">
                    {world &&
                        <div className="world__stats__card">
                            <img src={world.url} alt={world.name}/>
                            <div className="world_card_informations">
                                <div className="world_card_name">{world.name}</div>
                                <div className="world_card_content">
                                    <div className="world_card_description">{world.description}</div>
                                    {/*<div className="world_card_creation">{new Intl.DateTimeFormat("fr-FR", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                        hour12: false,
                                    }).format(new Date(world.createdAt.date))}</div> //@TODO ne fonctionne pas et je ne sais pas pourquoi*/}
                                </div>
                            </div>
                        </div>
                    }
                    <div className={'world__stats__dashboard'}>
                        <div className={'world__stats__dashboard__container'}>
                            <div>Nombre de personnages</div>
                            <div>0</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorldStats;

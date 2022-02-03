import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import SideNavbar from "../components/navbar/SideNavbar";
import OptionBar from "../components/navbar/OptionBar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faEye} from '@fortawesome/free-solid-svg-icons'

const WorldStats = () => {
    const [world, setWorld] = useState({});
    const [character, setCharacter] = useState(null);
    let {worldSlug} = useParams();

    useEffect(() => {
        const getWorldData = async () => {
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
        getWorldData();
    }, []);

    useEffect(() => {
        const getCharacterData = async () => {
            let token = localStorage.getItem("token");
            const config = {
                headers: {Authorization: `Bearer ${token}`},
            };
            try {
                const res = await axios.get(
                    `/api/worlds/${worldSlug}/characters`,
                    config
                )
                setCharacter(res.data.content);
            } catch (err) {
                /*setCharacter(null);*/
            }
        }
        getCharacterData();
    }, [world]);

    return (
        <div className={'page__container'}>
            <SideNavbar/>
            <div className="world__stats__page__container">
                <OptionBar/>
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
                    <div className={'world__stats__character__container'}>
                        {character &&
                            character.map(({id, firstname, lastname, nickname}) => (
                                    <a key={id} className={'world__stats__character__card'}>
                                        <img className='card_picture_background'
                                             src="https://pbs.twimg.com/media/FJPTNGlWQAIG0-p?format=jpg&name=large"
                                             alt={firstname}/>
                                        <img className='card_picture_profil' src="https://i.imgur.com/mRrUTSL.png"
                                             alt={firstname}/>
                                        <div className="card_favored_container">
                                            <div className="card_favored_items">
                                                <div>1264</div>
                                                <FontAwesomeIcon icon={faHeart}/>
                                            </div>
                                            <div className="card_favored_items">
                                                <div>70135</div>
                                                <FontAwesomeIcon icon={faEye}/>
                                            </div>
                                        </div>
                                        <div className="card_profil_container">
                                            <div className="card_name">
                                                {firstname}-{lastname}
                                            </div>
                                            <div className="card_nickname">
                                                "{nickname}"
                                            </div>
                                        </div>
                                    </a>
                                )
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorldStats;

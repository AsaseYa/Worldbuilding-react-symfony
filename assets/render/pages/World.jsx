import React, {useEffect, useState} from 'react';
import SideNavbar from "../components/navbar/SideNavbar";
import axios from "axios";
import {NavLink} from "react-router-dom";

const World = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            let token = localStorage.getItem("token");
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            const res = await axios.get(
                '/api/worlds/',
                config
            );
            setData(res.data.content);
        }
        getData();
    }, []);

    return (
        <div className={'page__container'}>
            <SideNavbar/>
            <div className="world__page__container">
                <div className="world__card__container">
                    {data &&
                        data.map(({id, name, isPublic, url, createdAt, description}) => (
                                <NavLink className="world__card" key={id} to={'/worlds'}>
                                    {/*<div className="world_status"></div>*/}
                                    <img src={url} alt={name}/>
                                    <div className="world_card_informations">
                                        <div className="world_card_name">{name}</div>
                                        <div className="world_card_content">
                                            <div className="world_card_description">{description}</div>
                                            <div className="world_card_creation">{new Intl.DateTimeFormat("fr-FR", {
                                                year: "numeric",
                                                month: "long",
                                                day: "2-digit",
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric',
                                                hour12: false,
                                            }).format(new Date(createdAt.date))}</div>
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        )}
                </div>
            </div>
        </div>
    );
};

export default World;

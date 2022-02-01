import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(
                    '/api/news/'
                );
                setData(res.data.content);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    return (
        <>
            <div className="page__container">
                <div className="news__container">
                    {error && (
                        <div>{`There is a problem fetching the post data - ${error}`}</div>
                    )}
                    {loading && <div>A moment please...</div>}
                    {data &&
                        data.map(({id, title, createdAt, content}) => (
                                <div className="news__item" key={id}>
                                    <div className="news_title">{title}</div>
                                    <div className="news_date">{new Intl.DateTimeFormat("fr-FR", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                        hour12: false,
                                    }).format(new Date(createdAt.date))}</div>
                                    <div className="news_text">
                                        <p>{content}</p>
                                    </div>
                                </div>
                            )
                        )}
                </div>
            </div>
        </>
    )

}

export default Home;
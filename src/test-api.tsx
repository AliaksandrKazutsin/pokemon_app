import React, { useEffect, useState } from 'react';
import { InnerContent } from './inner-content';
import { DataList, DataListElements } from './interfaces/pokemon';
import { upScroll } from './scroll';
import { Spinner } from './spinner/spinner';
import './test-api.scss';

export const TestApi: React.FunctionComponent = () => {
    const [getData, setGetData] = useState<Array<DataList>>([]);
    const [loader, setLoader] = useState<boolean>(true);

    const fetchData = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`)
            .then(response => response.json())
            .then(data => {
                const results = data.results.map(res => {
                    return fetch(res.url)
                        .then(response => response.json());
                });

                return Promise.all<unknown[] | any>(results);

            }).then((pokeData) => {
                console.log(pokeData);
                const allResults = pokeData.map((el: DataListElements) => {

                    const ability: string[] = el?.types?.map(ability => ability?.type?.name.toUpperCase());

                    const dataElements = {
                        id: el?.id || null,
                        image: el?.sprites.front_shiny || null,
                        name: el?.name.toUpperCase() || null,
                        ability: ability || null
                    } as DataList;

                    return dataElements || null;
                });

                return Promise.all<DataList>(allResults);

            }).then(pokemon => {
                console.log(pokemon);
                setGetData(() => pokemon);
            })

            .catch((err) => {
                console.error('ERROR', err);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
            fetchData();
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            { loader && <Spinner /> }
            {!loader &&
                <div className='wrapper-items'>
                    <InnerContent getData={ getData } />
                    <div className="wrapper-items__wrapper-button">
                        <button
                            type="button"
                            onClick={ upScroll }
                            className="wrapper-items__scroll-button"
                        >
                            <i className="fa fa-chevron-up" aria-hidden="true"></i>
                        </button>
                    </div>
                </div> }
        </>
    );
};
import React, { useEffect, useState } from 'react';
import { InnerContent } from './inner-content';
import { Pokemons } from './interfaces/pokemon';
import { upScroll } from './scroll';
import { Spinner } from './spinner/spinner';
import './test-api.scss';

export const TestApi: React.FunctionComponent = () => {
    const [getData, setGetData] = useState<Pokemons>([]);
    const [loader, setLoader] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            const getAllList = await Promise.all(
                await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`)
                    .then(response => response.json())
                    .then(data => {
                        const results = data.results.map(async res => {
                            return (await fetch(res.url)).json();
                        });

                        return results;
                    })
            );

            return console.log(getAllList);
        } catch (error) {
            console.error("ERROR", error);
        }
    };

    /*const fetchData = async () => {
        const response = (await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`)).json();

        response.then(data => {
            const results = data.results.map(async res => {
                return (await fetch(res.url)).json();
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
                } as Pokemon;

                return dataElements || null;
            });

            return Promise.all<Pokemon>(allResults);

        }).then(list => {
            console.log(list);
            setGetData(() => list);
        })

            .catch((err) => {
                console.error('ERROR', err);
            });
    };*/

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
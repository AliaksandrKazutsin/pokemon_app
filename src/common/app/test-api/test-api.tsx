import React, { useEffect, useState } from 'react';
import { DataListElements, Pokemons } from '../../../interfaces/pokemon';
import { InnerContent } from '../inner-content/inner-content';
import { upScroll } from '../scroll';
import { Spinner } from '../spinner/spinner';
import './test-api.scss';

export const TestApi: React.FunctionComponent = () => {
    const [getData, setGetData] = useState<Pokemons>([]);
    const [loader, setLoader] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            const getListOfPokemons = await (await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=3`)).json();
            const getPoke = await Promise.all<unknown[] | any>(
                getListOfPokemons.results.map(async res => {
                    return await (await fetch(res.url)).json();
                })
            );

            const getResult = getPoke.map((el: DataListElements) => {

                const ability: string[] = el?.types?.map(ability => ability?.type?.name.toUpperCase());

                const dataElements = {
                    id: el?.id || null,
                    image: el?.sprites.front_shiny || null,
                    name: el?.name.toUpperCase() || null,
                    ability: ability || null
                };

                return dataElements || null;
            });

            return setGetData(() => getResult);

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
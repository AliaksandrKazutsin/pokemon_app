import React, { useEffect, useState } from 'react';
import './test-api.scss';
// export interface ArrayData {
//     id: number,
//     name: string,
//     ability: Ability[],
//     image: string
// } 

export const TestApi = () => {
    const [getData, setGetData] = useState([]);
    const [loader, setLoader] = useState<boolean>(true);

    const fetchData = async () => {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
        let result = response.json();
        if (result) {
            result.then((data) => {
                data.results.forEach(pokemon =>
                    pokemonData(pokemon)
                );
            }).catch((err) => {
                console.error('ERROR', err);
            });
        }
    };

    const pokemonData = (pokemon) => {
        try {
            const url = pokemon.url;
            fetch(url)
                .then(response => response.json())
                .then((pokeData) => {
                    const ability = pokeData.types.map((el => el.type.name));

                    const getAllData = {
                        id: pokeData.id,
                        name: pokeData.name,
                        ability: ability,
                        image: pokeData.sprites.front_shiny
                    };

                    console.log(getAllData);
                    setGetData(() => [getAllData]);

                });
        } catch (error) {
            console.error('ERROR', error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
            fetchData();
        }, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            { loader && <span>Loading...</span> }
            {!loader &&
                <div className='container'>
                    <ul>
                        { getData.map((el => {
                            return <li key={ el.id }>
                                <img src={ el.image } alt="poke" style={ { width: "150px", height: "150px" } } />
                                <div>
                                    <p>{ el.name }</p>
                                    <p>{ el.ability }</p>
                                </div>
                            </li>;
                        })) }
                    </ul>
                </div> }
        </>
    );
};

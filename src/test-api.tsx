import React, { useEffect, useState } from 'react';
import { InnerContant } from './inner-contant';
import { Spinner } from './spinner/spinner';
import './test-api.scss';
// export interface ArrayData {
//     id: number,
//     name: string,
//     ability: Ability[],
//     image: string
// } 


export const TestApi: React.FunctionComponent = () => {
    const [getData, setGetData] = useState([]);
    const [loader, setLoader] = useState<boolean>(true);

    const fetchData = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`)
            .then(response => response.json())
            .then(data => {
                let results = data.results.map(res => {
                    return fetch(res.url).then(response => response.json());
                });
                return Promise.all(results);
            }).then((pokeData) => {
                console.log(pokeData);
                setGetData(() => pokeData);
            }).catch((err) => {
                console.error('ERROR', err);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
            fetchData();
        }, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPokeInfo = () => {
        console.log('Info');
    };

    return (
        <>
            { loader && <Spinner /> }
            {!loader &&
                <div className='wrapper-items' onClick={ getPokeInfo }>
                    <InnerContant getData={ getData } />
                </div> }
        </>
    );
};
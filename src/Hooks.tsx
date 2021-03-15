import React, { useState, useEffect } from 'react';

export const TestHook = () => {
    const [getData, setGetData] = useState([])

    const fetchData = async () => {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        let result = response.json()
        result.then((data) => {
            console.log(data)
            return setGetData(() => data.results)
        }).catch((err) => {
            console.error('ERROR',err)
        })
    }

    useEffect(() => {

    },[])
    setTimeout(() => {
        fetchData()
    },2000)
 
    return(
        <>
            <div>
                <ul>
                    {getData.map((el, idx) => {
                        return <li key={idx}>{el.name}<img src={el.url} style={{width:"150px",height:"150px"}}/></li>
                    })}
                </ul>
            </div>
        </>
    )
}

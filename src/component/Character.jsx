import React, { useState, useEffect } from 'react';
import './Character.css';

const GetDataComponent = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getDataHandler = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json();
            setCharacters(data.results);
        };
        getDataHandler();
    }, [page]);

    const nextPageHandler = () => {
        setPage(prevPage => prevPage + 1);
    };

    const prevPageHandler = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const splitArrayIntoChunks = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const characterChunks = splitArrayIntoChunks(characters, 2);

    return (
        <React.Fragment>
            <div className='container'>
                <h2>Rick And Morty</h2>
            </div>
            <div className='characters'>
                {characterChunks && characterChunks.map((chunk, index) => (
                    <div key={index} className='character-column'>
                        {chunk.map(character => (
                            <div key={character.id} className='character-card'>
                                <img src={character.image} alt={character.name} className='character-image' />
                                <div className='character-info'>
                                    <h3>{character.name}</h3>
                                    <p>{character.status} - {character.species}</p>
                                    <p>Last seen on</p>
                                    <p>{character.location.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='container'>
                <button className='prev' onClick={prevPageHandler} disabled={page === 1}>Previous</button>
                <button className='next' onClick={nextPageHandler}>Next</button>
            </div>
        </React.Fragment>
    );
}

export default GetDataComponent;

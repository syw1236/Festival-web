import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import festivalsData from '../data/festivalsData';

const SearchList = () => {
  const [festivals, setFestivals] = useState(festivalsData);
  const [userInput, setUserInput] = useState('');

  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };

  const handleLike = (id) => {
    setFestivals((prevFestivals) =>
      prevFestivals.map((festival) => {
        if (festival.id === id) {
          return {
            ...festival,
            likes: festival.liked ? festival.likes - 1 : festival.likes + 1,
            liked: !festival.liked,
          };
        }
        return festival;
      })
    );
  };

  const searched = festivals.filter((item) =>
    item.name.toLowerCase().includes(userInput)
  );

  function Card({ id, name, location, likes, liked, poster }) {
    return (
      <div className='cardContainer' style={{ display: 'inline-block', margin: '10px' }}>
        <Link to={`/festival_detail/${id}`}>
          <img src={poster} alt={name} style={{ width: '200px', height: '200px' }} />
        </Link>
        <h2>{name}</h2>
        <p>{location}</p>
        <button onClick={() => handleLike(id)}>
          <FaHeart style={{ color: liked ? 'red' : 'grey' }} />
          {likes}
        </button>
      </div>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Festival List</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input onChange={getValue} style={{ width: '300px', height:'50px' }}placeholder='궁금한 축제를 입력하세요' />
      </div>
      {searched.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </>
  );
};

export default SearchList;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import festivalsData from '../data/festivalsData';
import '../css/SearchList.css';

const SearchList = () => {
  const [festivals, setFestivals] = useState(festivalsData);
  const [userInput, setUserInput] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

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

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    if (e.target.value !== '') {

      setFestivals(
        festivalsData.filter((festival) =>
          festival.location.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setFestivals(festivalsData);
    }
  };

  const searched = festivals.filter((item) =>
    item.name.toLowerCase().includes(userInput)
  );

  function Card({ id, name, location, detail_location, likes, liked, poster }) {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        className={`cardContainer ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/festival_detail/${id}`}>
          <img src={poster} alt={name} />
          {isHovered && (
            <div className='overlay'>
              <p>{detail_location}</p>
            </div>
          )}
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
    <div className='searchListContainer'>
      <h1 className='searchListTitle'> Festival List</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input onChange={getValue} className="search-box" placeholder='궁금한 축제를 입력하세요' />
      </div>
      <div className="select-container">
        <select
          name="searchArea"
          id="searchArea"
          title="지역 선택"
          value={selectedArea}
          onChange={handleAreaChange}>
          <option value="">지역</option>
          <option value="서울">서울</option>
          <option value="인천">인천</option>
          <option value="대전">대전</option>
          <option value="대구">대구</option>
          <option value="광주">광주</option>
          <option value="부산">부산</option>
          <option value="울산">울산</option>
          <option value="세종">세종</option>
          <option value="경기">경기도</option>
          <option value="강원">강원도</option>
          <option value="충북">충청북도</option>
          <option value="충남">충청남도</option>
          <option value="경북">경상북도</option>
          <option value="경남">경상남도</option>
          <option value="전북">전라북도</option>
          <option value="전남">전라남도</option>
          <option value="제주">제주도</option>
        </select>
      </div>
      <div className='searchResultsContainer'>
        {searched.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SearchList;
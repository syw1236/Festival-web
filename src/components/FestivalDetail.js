import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import festivalsData from '../data/festivalsData';
import { FaHeart } from 'react-icons/fa';
import '../css/FestivalDetail.css';

const FestivalDetail = () => {
  const { id } = useParams();
  const festival = festivalsData.find((item) => item.id === parseInt(id));

  const [festivalStatus, setFestivalStatus] = useState('');

  const [liked, setLiked] = useState(false); // Added state for liked status
  const [likes, setLikes] = useState(festival.likes);

  useEffect(() => {
    if (!festival) {
      // Handle the case where the festival is not found.
      return;
    }
    console.log('Festival ID:', festival.id);

    const currentDate = new Date();
    const startDate = new Date(festival.date[0]);
    const endDate = new Date(festival.date[1]);

    let status = '';

    if (currentDate < startDate) {
      status = '축제 예정';
    } else if (currentDate > endDate) {
      status = '축제 종료';
    } else {
      status = '축제 진행 중';
    }

    setFestivalStatus(status);
  }, [festival]);

  if (!festival) {
    return <div>Festival not found</div>;
  }
  const handleLike = () => {
    setLiked((prevLiked) => !prevLiked);
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
  };

  return (
    <div className="yellow-section">
      <div className='content-margin'>
        <div className='center'>국내 축제</div>
        <span className='bold-text-main'>축제 메인으로</span>
        <div style={{ display: 'flex', marginBottom: '30px' }}>
          <div className='inline_block'>
            <div className='sub_title'>{festival.description}</div>
            <div className='bold-title'>{festival.name}</div>
            <div>{festivalStatus}</div>
            <div className='bold-text'>{Array.isArray(festival.date) ? festival.date.join(' ~ ') : festival.date}</div>
          </div>
          <div className='inline_block_img'><img src={festival.poster} alt={festival.name} className="poster-image" /></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <img src={festival.image1} alt="축제 이미지1" className="festival-image" />
          <img src={festival.image2} alt="축제 이미지2" className="festival-image" />
          <img src={festival.image3} alt="축제 이미지3" className="festival-image" />
        </div>
        <p>{festival.detail_description}</p>
        <p>좋아요 수: <button onClick={handleLike}>
          <FaHeart style={{ color: liked ? 'red' : 'grey' }} />
          {likes}
        </button></p>
        <p>위치: {festival.location}</p>
        <p>상세 위치: {festival.detail_location}</p>
        <p>전화번호: {festival.tel}</p>
        <p>시간: {festival.time}</p>
        <p>입장료: {festival.pay}</p>
      </div>
    </div>
  );
}

export default FestivalDetail;
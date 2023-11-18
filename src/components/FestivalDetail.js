import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import festivalsData from '../data/festivalsData';
import { FaHeart } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";
import '../css/FestivalDetail.css';

const FestivalDetail = () => {
    const { id } = useParams();
    const festival = festivalsData.find((item) => item.id === parseInt(id));

    const [festivalStatus, setFestivalStatus] = useState('');

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(festival.likes);

    useEffect(() => {
        if (!festival) {
        return;
    }

    const currentDate = new Date();
    const startDate = new Date(festival.date[0]);
    const endDate = new Date(festival.date[1]);

    let status = '';

    if (currentDate < startDate) { // 현재 날짜가 시작 날짜보다 이전이면
        status = '축제 예정';
    } else if (currentDate > endDate) { // 현재 날짜가 종료 날짜보다 이후이면
        status = '축제 종료'; 
    } else { // 그 외의 경우 (즉, 현재 날짜가 시작 날짜와 종료 날짜 사이에 있으면)
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
                <span className='bold-text-main'><IoHome /> 축제 메인으로</span>
                <div style={{display: 'flex', marginBottom: '30px'}}>
                    <div className='inline_block'>
                        <div className='sub_title'>{festival.description}</div>
                        <div className='bold-title'>{festival.name}</div>
                        <div className='festival-status' style={{ backgroundColor: festivalStatus === '축제 진행 중' ? 'red' : 'grey' }}>{festivalStatus}</div>
                        <div className='bold-text'>{festival.date.join(' ~ ')}</div>
                        <button onClick={handleLike}>
                        <FaHeart style={{ color: liked ? 'red' : 'grey' }} />{likes}
                        </button>
                    </div>
                    <div className='inline_block_img'><img src={festival.poster} alt={festival.name} className="poster-image" /></div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <img src={festival.image1} alt="축제 이미지1" className="festival-image" />
                    <img src={festival.image2} alt="축제 이미지2" className="festival-image" /> 
                    <img src={festival.image3} alt="축제 이미지3" className="festival-image" /> 
                </div>
                <p>{festival.detail_description}</p>
                <p>위치: {festival.location}</p>
                <p>상세 위치: {festival.detail_location}</p>
                <p>전화번호: {festival.tel}</p>
                <p>시간: {festival.time}</p>
                <p>입장료: {festival.pay}</p>
            </div>
        </div>
    );
};

export default FestivalDetail;

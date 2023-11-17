import React from 'react';
import { festivalsData } from '../data/festivalsData';  // 수정된 부분

import '../css/FestivalDetail.css';

const FestivalDetail = () => {
    const festival = festivalsData[1];  // 수정된 부분

    return (
        <div>
            <div className="yellow-section">
            {/* 노란색 배경을 적용하려는 내용 */}
            <p>{festival.description}</p>
            <h1>{festival.name}</h1>
            <img src={festival.poster} alt={festival.name} />
            <p>날짜: {festival.date.join(', ')}</p>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <img src={festival.image1} alt="축제 이미지1" style={{width: '200px'}} /> {/* CSS 추가 */}
                <img src={festival.image2} alt="축제 이미지2" style={{width: '200px'}} /> {/* CSS 추가 */}
                <img src={festival.image3} alt="축제 이미지3" style={{width: '200px'}} /> {/* CSS 추가 */}
            </div>
            <p>{festival.detail_description}</p>
            <p>좋아요 수: {festival.likes}</p>
            <p>위치: {festival.location}</p>
            <p>상세 위치: {festival.detail_location}</p>
            <p>전화번호: {festival.tel}</p>
            <p>시간: {festival.time}</p>
            <p>입장료: {festival.pay}</p>
            
        </div>
        </div>
    )
}

export default FestivalDetail;

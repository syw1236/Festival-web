// FestivalDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import festivalsData from '../data/festivalData';

function FestivalDetail() {
  // useParams 훅을 사용하여 라우팅 매개변수(id)를 가져옵니다.
  const { id } = useParams();
  const festivalId = parseInt(id);
  const festival = festivalsData.find((item) => item.id === festivalId);

  if (!festival) {
    return <div>해당하는 축제가 없습니다.</div>;
  }

  return (
    <div>
      <h1>{festival.name}</h1>
      <p>{festival.location}</p>
      <p>{festival.date}</p>
      {/* 다른 필요한 정보 출력 */}
    </div>
  );
}

export default FestivalDetail;

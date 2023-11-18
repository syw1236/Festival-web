import React from "react";
import festivalsData from "./data/festivalsData";
import examData from "./data/examData";
import { useState, useMemo } from "react";
import Main from "./components/MainPage/Main";
/*
** 한번 읽어주세요!
: 더미데이터 양이 많기 때문에 <App>에서 더미데이터를 상태값으로 가지고,
  <App>에서 데이터를 선별해서 하위 컴포넌트로 전달하는 편이 데미데이터 전체를 전달하는 것보다 효율적일 것 같습니다.
  (추가로 데이터를 선별하는 코드를 useMemo()후크 안에 넣어서 더미데이터가 변경될때만 다시 계산하도록 해놓으면 매우 효율적일 것 같습니다.)
: 변경의견을 주시면 언제든 변경가능합니다.
*/

function App() {
  // 축제데이터
  const [fullData, setFestivalData] = useState(examData);

  // 현재 날짜기준 진행중인 축제데이터 배열을 구한다.
  // (상태값 fullData가 변할때만 다시 계산하도록 useMemo 훅크사용)
  const todayFestivals = useMemo(() => {
    return fullData.filter((el, ix) => {
      // 시작날짜 세팅
      let startDate = new Date(el.date[0]);
      startDate.setHours(0);
      // 끝날짜 세팅
      let endDate = new Date(el.date[1]);
      endDate.setDate(endDate.getDate() + 1); // (축제기간 :11/15 ~ 11/17)이면 (11/18 00:00)으로 세팅함으로써 11/17일 전체가 기간에 포함되도록 한다.
      endDate.setHours(0);
      // 현재날짜 세팅
      let today = new Date();

      // 날짜 디버깅용
      // console.log(`시작 : ${startDate}`);
      // console.log(`끝 : ${endDate}`);
      // console.log(`현재 : ${today}`);
      // console.log("=================");

      return today >= startDate && today <= endDate;
    });
  }, [fullData]);

  // 좋아요 수가 가장 많은 6개의 축제데이터를 계산한다.
  // (상태값 fullData가 변할때만 다시 계산하도록 useMemo 훅크사용)
  const likedFestivals = useMemo(() => {
    return fullData.sort((a, b) => b.likes - a.likes).slice(0, 6);
  }, [fullData]);

  // 데이터 검색 기능
  // (양이 많은 더미데이터를 props로 복사해 전달하는 것보다 현재 위치에서 검색함수를 만들고 함수를 props로 전달하는 것이 효율적인 것 같습니다. )
  const searchData = (token) => fullData.filter((item) => item.name.toLowerCase().includes(token));

  
  return <Main todayFestivals={todayFestivals} likedFestivals={likedFestivals} searchData={searchData} />;
}

export default App;

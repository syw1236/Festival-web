import styled from "styled-components";
import SearchBox from "./SearchBox";
import TodayFestivalBox from "./TodayFestivalBox";
import FamousFestivalBox from "./FamousFestivalBox";
import MainBanner from "./MainBanner";
import { useState, useMemo } from "react";
import examData from "../../data/examData";

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 50rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to bottom, #b8d0de 18rem, white 0%);
`;

const MainBannerArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 25rem;
  padding: 1rem;
  padding-top: 1.8rem;
`;

const SearchArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 4rem;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const TodayFestivalArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 1.8rem 2rem 1.8rem;
`;

const FamousFestivalArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 1.8rem;
  background-color: #f2f2f2;
`;

function Main() {
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

      return today >= startDate && today <= endDate;
    });
  }, [fullData]);

  // 좋아요 수가 가장 많은 6개의 축제데이터를 계산한다.
  // (상태값 fullData가 변할때만 다시 계산하도록 useMemo 훅크사용)
  const likedFestivals = useMemo(() => {
    const newData = [...fullData];
    return newData.sort((a, b) => b.likes - a.likes).slice(0, 6);
  }, [fullData]);

  // 데이터 검색 기능
  // (양이 많은 더미데이터를 props로 복사해 전달하는 것보다 현재 위치에서 검색함수를 만들고 함수를 props로 전달하는 것이 효율적인 것 같습니다. )
  const searchData = (token) => fullData.filter((item) => item.name.toLowerCase().includes(token));

  return (
    <Wrapper>
      <MainBannerArea>
        <MainBanner festivalDatas={likedFestivals} />
      </MainBannerArea>
      <SearchArea>
        <SearchBox searchData={searchData} />
      </SearchArea>
      <TodayFestivalArea>
        <TodayFestivalBox todayFestivals={todayFestivals} />
      </TodayFestivalArea>
      <FamousFestivalArea>
        <FamousFestivalBox likedFestivals={likedFestivals} />
      </FamousFestivalArea>
    </Wrapper>
  );
}

export default Main;
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

  // 랜덤데이터 선별
  const randomFestivals = useMemo(() => {
    const randomArr = [];
    var tmp = 0;
    for (var i = 0; i < 6; i++) {
      while (true) {
        tmp = Math.floor(Math.random() * fullData.length);
        if (randomArr.indexOf(tmp) === -1) {
          randomArr[i] = tmp;
          break;
        }
      }
    }
    return randomArr.map((el, ix) => fullData[el]);
  }, [fullData]);

  // 좋아요 수가 가장 많은 6개의 축제데이터를 계산한다.
  const likedFestivals = useMemo(() => {
    const newData = [...fullData];
    return newData.sort((a, b) => b.likes - a.likes).slice(0, 6);
  }, [fullData]);

  return (
    <Wrapper>
      <MainBannerArea>
        <MainBanner festivalDatas={randomFestivals} />
      </MainBannerArea>
      <SearchArea>
        <SearchBox />
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

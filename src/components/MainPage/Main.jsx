import styled from "styled-components";
import SearchBox from "./SearchBox";
import TodayFestivalBox from "./TodayFestivalBox";
import FamousFestivalBox from "./FamousFestivalBox";
import MainBanner from "./MainBanner";

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

function Main({ todayFestivals, likedFestivals, searchData }) {
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

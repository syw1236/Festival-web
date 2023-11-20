import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/MainBanner.css";

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 20rem;
`;

const SlideContentWrapper = styled.div`
  box-sizing: border-box;
  width: 48rem;
  height: 23.3rem;
  display: grid;
  grid-template-columns: 11fr 14fr;
`;

const BannerTitleWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 1rem 0rem 3rem;
  display: flex;
  flex-direction: column;
`;

const LocalLabel = styled.div`
  box-sizing: border-box;
  width: 5rem;
  height: 2.3rem;
  line-height: 2.2rem;
  text-align: center;
  border-radius: 2rem;
  font-size: 1rem;
  color: white;
  background-color: #2b2424;
`;

const SubTitle = styled.div`
  box-sizing: border-box;
  width: 16.5rem;
  max-height: 7rem;
  font-size: 1.1rem;
  font-weight: 600;
  word-break: keep-all;
  overflow-wrap: break-word;
  overflow: hidden;
  margin-top: 2rem;
`;

const Title = styled.div`
  box-sizing: border-box;
  width: 16.5rem;
  max-height: 6rem;
  font-size: 1.4rem;
  font-weight: 700;
  word-break: keep-all;
  overflow-wrap: break-word;
  overflow: hidden;
`;

const ShowDetailButt = styled(Link)`
  box-sizing: border-box;
  width: 16.5rem;
  color: grey;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: underline;
  margin-top: 1.5rem;
`;

const ImgWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

const BannerImg = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 21rem;
  object-fit: cover;
  object-position: center;
  border-radius: 0.4rem;
  display: block;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
`;

function MainBaanerContent({ festivalData }) {
  return (
    <SlideContentWrapper>
      <BannerTitleWrapper>
        <LocalLabel>{festivalData.location}</LocalLabel>
        <SubTitle>{festivalData.description}</SubTitle>
        <Title>{festivalData.name}</Title>
        <ShowDetailButt to={`/festival_detail/${festivalData.id}`}>{"자세히 보기"}</ShowDetailButt>
      </BannerTitleWrapper>
      <ImgWrapper>
        <BannerImg src={festivalData.image1} />
      </ImgWrapper>
    </SlideContentWrapper>
  );
}

function MainBanner({ festivalDatas }) {
  // 이미지가 없는 데이터는 제거
  const newData = festivalDatas.filter((el) => {
    if (el.image1.trim() === "" || el.image1.trim() === null) return false;
    else return true;
  });
  return (
    <Wrapper>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="first-slide"
      >
        {newData.map((el, ix) => (
          <SwiperSlide key={ix}>
            <MainBaanerContent festivalData={el} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}

export default MainBanner;

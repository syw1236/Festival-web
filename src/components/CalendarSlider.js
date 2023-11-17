import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledSlider = styled(Slider)`
  height: 20%; // 슬라이드 컨테이너 영역

  .slick-list {
    // 슬라이드 스크린
    width: 50%;
    height: 50%;
    background: green;
    top: 500px;
  }

  .slick-slide {
    cursor: pointer;
  }

  .slick-dots {
    // 슬라이드의 위치
    top: 2px;
  }

  .slick-slide img {
    width: 30px;
    height: 10px;
  }
`;

const CalendarSlider = ({ festivals }) => {
  // console.log(`week = > ${week}`);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section>
      <StyledSlider {...settings}>
        {festivals.map((festival, i) => (
          <div key={i} className="imgContainer">
            <img
              src={festival.poster}
              width={100}
              height={100}
              alt={`festival-${i}`}
            />
          </div>
        ))}
      </StyledSlider>
    </section>
  );
};

export default CalendarSlider;

import React, { useEffect, useState } from "react";
import RepFestivalList from "./RepFestivalList";
import PopularFestival from "./PopularFestival";
import Calendar from "./Calendar";
import "../css/CountryDetail.css";
import data from "../data/FestivalsData";

const Countrys = [
  {
    region: "서울",
    image: "/image/logo/seoulLogo.png",
  },
  {
    region: "부산",
    image: "/image/logo/busanLogo.png",
  },
  {
    region: "대구",
    image: "/image/logo/daeguLogo.png",
  },
  {
    region: "인천",
    image: "/image/logo/incheonLogo.png",
  },
  {
    region: "광주",
    image: "/image/logo/gwangjuLogo.png",
  },
  {
    region: "대전",
    image: "/image/logo/daejeonLogo.png",
  },
  {
    region: "울산",
    image: "/image/logo/ulsanLogo.png",
  },
  {
    region: "세종",
    image: "/image/logo/sejongLogo.png",
  },
  {
    region: "경기",
    image: "/image/logo/gyeonggiLogo.png",
  },
  {
    region: "강원",
    image: "/image/logo/gangwonLogo.png",
  },
  {
    region: "충북",
    image: "/image/logo/chungbukLogo.png",
  },
  {
    region: "충남",
    image: "/image/logo/chungnamLogo.png",
  },
  {
    region: "전북",
    image: "/image/logo/jeonbukLogo.png",
  },
  {
    region: "전남",
    image: "/image/logo/jeonnamLogo.jpg",
  },
  {
    region: "경북",
    image: "/image/logo/gyeongbukLogo.png",
  },
  {
    region: "경남",
    image: "/image/logo/gyeongnamLogo.png",
  },
  {
    region: "제주",
    image: "/image/logo/jejuLogo.png",
  },

  // "제주",
];
function CountryDetail() {
  const [activeIndex, setActiveIndex] = useState(0);
  //선택한 지역에 대한 인덱스 useState
  const [festivalArray, setFestivalArray] = useState(data);
  //축제 데이터에 대한 useState

  const handleCountryClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const filterlocationArray = data.filter(
      (item) => item.location === Countrys[activeIndex].region
    );
    setFestivalArray(filterlocationArray);
  }, [activeIndex]);

  return (
    <div className="centerContainer">
      <div className="divideContainer">
        <div className="countryContainer">
          <ul className="countryul">
            {/* 지역 이름 표시*/}
            {Countrys.map((country, i) => (
              <li
                className={`countryli ${activeIndex === i ? "active" : ""}`}
                key={i}
                onClick={() => handleCountryClick(i)}
              >
                {country.region}
              </li>
            ))}
          </ul>
        </div>
        {/* 클릭한 지역 표시*/}
        <div className="clickCountryContainer">
          <div className="clickCountry">
            <img
              src={activeIndex == null ? "" : Countrys[activeIndex].image}
              width={20}
              height={20}
              alt={activeIndex == null ? "" : Countrys[activeIndex].region}
              className="countryImage"
            />
            <p className="clickCountryName">
              {activeIndex !== null && Countrys[activeIndex].region}
            </p>
            <img
              className="arrow"
              src="/image/icon/arrow.png"
              width={30}
              height={30}
              alt="arrow.png"
            />
          </div>
        </div>
        <div className="repFestival">
          {/* 클릭한 지역의 축제 D-day 표시*/}
          <RepFestivalList
            data={festivalArray}
            country={Countrys[activeIndex].region}
          />
        </div>
      </div>

      {/* 클릭한 지역의 인기 축제 나열*/}
      <div className="currentContainer">
        <PopularFestival festivals={festivalArray} />
      </div>
      {/* 달력 및 해당 날짜에 맞는 포스터 나타내는 부분 */}
      <div>
        <Calendar festivals={festivalArray} />
      </div>
    </div>
  );
}

export default CountryDetail;

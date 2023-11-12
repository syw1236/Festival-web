import React, { useState } from "react";
import RepFestivalList from "./RepFestivalList";
import FestivalSimple from "./FistivalSimple";
import "./CountryDetail.css";
const Countrys = [
  {
    region: "서울",
    image: "/image/seoulLogo.png",
  },
  {
    region: "부산",
    image: "/image/busanLogo.png",
  },
  {
    region: "대구",
    image: "/image/daeguLogo.png",
  },
  {
    region: "인천",
    image: "/image/incheonLogo.png",
  },
  {
    region: "광주",
    image: "/image/gwangjuLogo.png",
  },
  {
    region: "대전",
    image: "/image/daejeonLogo.png",
  },
  {
    region: "울산",
    image: "/image/ulsanLogo.png",
  },
  {
    region: "세종",
    image: "/image/sejongLogo.png",
  },
  {
    region: "경기",
    image: "/image/gyeonggiLogo.png",
  },
  {
    region: "강원",
    image: "/image/gangwonLogo.png",
  },
  {
    region: "충북",
    image: "/image/chungbukLogo.png",
  },
  {
    region: "충남",
    image: "/image/chungnamLogo.png",
  },
  {
    region: "전북",
    image: "/image/jeonbukLogo.png",
  },
  {
    region: "전남",
    image: "/image/jeonnamLogo.jpg",
  },
  {
    region: "경북",
    image: "/image/gyeongbukLogo.png",
  },
  {
    region: "경남",
    image: "/image/gyeongnamLogo.png",
  },
  {
    region: "제주",
    image: "/image/jejuLogo.png",
  },

  // "제주",
];
function CountryDetail({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const filterlocationArray = data.filter(
    (item) => item.location === Countrys[activeIndex].region
  );

  //const array = Array(3);
  const handleCountryClick = (index) => {
    setActiveIndex(index);
  };

  const dividedArrays = [];
  for (let i = 0; i < filterlocationArray.length; i += 3) {
    dividedArrays.push(filterlocationArray.slice(i, i + 3));
  }

  // console.log(diviedArrays[0]);

  return (
    <div className="centerContainer">
      <div className="colorDiv">
        <ul className="countryul">
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
            src="/image/arrow.png"
            width={30}
            height={30}
            alt="arrow.png"
          />
        </div>
        <RepFestivalList
          data={filterlocationArray}
          country={Countrys[activeIndex].region}
        />
      </div>

      <div className="currentContain">
        <p className="currentpopularity">
          <span className="region">{Countrys[activeIndex].region} </span>
          <span className="regionDes">현재 인기 축제</span>
        </p>
        {dividedArrays.map((row, rowIndex) => (
          <div key={rowIndex} className="festivalSimpleContain">
            {row.map((item, itemIndex) => (
              //<span>{item.name}</span>
              <FestivalSimple key={itemIndex} festival={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryDetail;
//끝나는 날이 얼마 남지 않은 날을 RepFestival에다가 보내는 것

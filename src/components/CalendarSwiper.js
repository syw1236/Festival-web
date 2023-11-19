import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/CalendarSwiper.css";
// import "./CalendarSwiper.css";

import { Pagination, Navigation } from "swiper/modules";

const CalendarSwiper = ({ festivals }) => {
  if (festivals.length === 0) {
    festivals = [
      {
        poster: "/image/icon/noimage.png",
      },
      {
        poster: "/image/icon/noimage.png",
      },
      {
        poster: "/image/icon/noimage.png",
      },
    ];
  }
  return (
    <div className="swiperContainer">
      <Swiper
        slidesPerView={3}
        spaceBetween={40}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        style={{ width: "61%" }}
        className="mySwiper"
      >
        <div className="posterContainer">
          {festivals.map((festival, i) => {
            if (festival.id === -1) {
              return (
                <div>
                  <SwiperSlide key={i} className="imgContainer">
                    <img
                      className="image"
                      src={festival.poster}
                      alt={`festival-${i}`}
                    />
                  </SwiperSlide>
                </div>
              );
            } else {
              return (
                <div>
                  <SwiperSlide key={i} className="imgContainer">
                    <Link to={`/festival_detail/${festival.id}`}>
                      <img
                        src={festival.poster}
                        alt={`festival-${i}`}
                        className="image"
                      />
                    </Link>
                  </SwiperSlide>
                </div>
              );
            }
          })}
        </div>
      </Swiper>
    </div>
  );
};
export default CalendarSwiper;

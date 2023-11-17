// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CalendarSwiper.css";

// import "./styles.css";

// import required modules
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
        spaceBetween={50}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        style={{ width: "1050px" }}
        className="mySwiper"
      >
        {festivals.map((festival, i) => (
          <SwiperSlide key={i} className="imgContainer">
            <img
              src={festival.poster}
              width={350}
              height={450}
              alt={`festival-${i}`}
              className="image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default CalendarSwiper;

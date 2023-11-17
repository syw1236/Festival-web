import React, { useState, useEffect, useRef } from "react";
//import CalendarSlider from "./CalendarSlider";
import CalendarSwiper from "./CalendarSwiper";
import "./Calendar.css";

const Calendar = ({ festivals }) => {
  //const [festivalArray, setFestivalArray] = useState(festivals);
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // const [festivalArray, setFestivalArray] = useState([]);
  const [isNextBtnClicked, setIsNextBtnClicked] = useState(false);
  //const [filteringArray, setFilteringArray] = useState([]); // state로 변경
  const filteredFestivalArrayRef = useRef([]); // useRef로 변수 선언
  //setFestivalArray(festivals);
  const handleCountryClick = (index) => {
    setActiveIndex(index);
    setIsNextBtnClicked(false);
    //filteredFestivalArrayRef.current = filtering();
    const filteredFestival = festivals.filter((festival) => {
      const festivalStartDate = new Date(festival.date[0]);
      const festivalEndDate = new Date(festival.date[1]);
      const clickedDate = new Date(week[index][1]);

      // 시간을 무시하고 년, 월, 일만을 비교
      festivalStartDate.setHours(0, 0, 0, 0);
      festivalEndDate.setHours(0, 0, 0, 0);
      clickedDate.setHours(0, 0, 0, 0);

      console.log(
        `new Date(festival.date[0]) => ${new Date(festival.date[0])}`
      );
      console.log(
        `new Date(festival.date[1]) => ${new Date(festival.date[1])}`
      );
      console.log(`week[index][1] => ${week[index][1]}`);
      console.log(`festival name => ${festival.name}`);

      return (
        week[index][1] &&
        festivalStartDate <= clickedDate &&
        clickedDate <= festivalEndDate
      );
    });

    if (filteredFestival.length < 3) {
      while (true) {
        if (filteredFestival.length === 3) break;
        console.log("inputing image...");
        filteredFestival.push({ poster: "/image/icon/noimage.png" });
      }
    }

    filteredFestivalArrayRef.current = filteredFestival;
  };

  useEffect(() => {
    let now = new Date();
    let currentDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    let currentWeek = makeWeekArr(currentDate);

    const currentDayIndex = currentWeek.findIndex(
      ([index, day]) =>
        day.getFullYear() === currentDate.getFullYear() &&
        day.getMonth() === currentDate.getMonth() &&
        day.getDate() === currentDate.getDate()
    );

    // if (activeIndex !== -1 && activeIndex !== currentDayIndex) return;

    setWeek(currentWeek);
    setDate(currentDate);
    setActiveIndex(currentDayIndex);

    const filteredFestival = festivals.filter((festival) => {
      const festivalStartDate = new Date(festival.date[0]);
      const festivalEndDate = new Date(festival.date[1]);
      const clickedDate = new Date(currentWeek[currentDayIndex][1]);

      // 시간을 무시하고 년, 월, 일만을 비교
      festivalStartDate.setHours(0, 0, 0, 0);
      festivalEndDate.setHours(0, 0, 0, 0);
      clickedDate.setHours(0, 0, 0, 0);

      return (
        currentWeek[currentDayIndex][1] &&
        festivalStartDate <= clickedDate &&
        clickedDate <= festivalEndDate
      );
    });
    if (filteredFestival.length < 3) {
      console.log("filteredFfestival.length is 부족");
      while (true) {
        if (filteredFestival.length === 3) break;
        console.log("inputing image...");
        filteredFestival.push({ poster: "/image/icon/noimage.png" });
      }
    }

    filteredFestivalArrayRef.current = filteredFestival;

    console.log("useEffect");
    console.log(`useEffect in currentDayIndex => ${currentDayIndex}`);
  }, [festivals]);

  const makeWeekArr = (date) => {
    let day = date.getDay();
    let week = [];
    for (let i = 0; i < 14; i++) {
      let newDate = new Date(date.valueOf() + 86400000 * (i - day));
      week.push([i, newDate]);
    }
    return week;
  };

  const onPressArrowLeft = () => {
    let newDate = new Date(date.valueOf() - 86400000 * 14);
    let newWeek = makeWeekArr(newDate);
    setWeek(newWeek);
    setDate(newDate);
    for (let i; i < newWeek.length; i++) {
      if (newWeek[i] === newDate) {
        setActiveIndex(i);
      }
    }
    setIsNextBtnClicked(true);
    console.log("onPressArrowLeft");
  };

  const onPressArrowRight = () => {
    let newDate = new Date(date.valueOf() + 86400000 * 14);
    let newWeek = makeWeekArr(newDate);
    setWeek(newWeek);
    setDate(newDate);
    for (let i; i < newWeek.length; i++) {
      if (newWeek[i] === newDate) {
        setActiveIndex(i);
      }
    }
    setIsNextBtnClicked(true);
    console.log("onPressArrowRight");
  };

  return (
    <div className="tatalCalendarContainer">
      <div className="Year-Month-dayContainer">
        <button className="nextBtn" onClick={onPressArrowLeft}>
          {"<"}
        </button>
        <span className="period">
          {week[0] &&
            `${week[0][1].toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })} - ${week[13][1].toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}`}
        </span>
        <button className="nextBtn" onClick={onPressArrowRight}>
          {">"}
        </button>
      </div>
      {week.map(([index, day]) => (
        <div className="calendarContainer" key={index}>
          <ul
            className={`calendarul ${activeIndex === index ? "active" : ""} ${
              isNextBtnClicked ? "nextBtnClicked" : ""
            }`}
            onClick={() => handleCountryClick(index)} // 수정된 부분
          >
            <li
              className={`dayofweekli ${day.getDay() === 6 ? "saturday" : ""} ${
                day.getDay() === 0 ? "sunday" : ""
              }`}
              style={{
                color:
                  day.getDay() === 6
                    ? "blue"
                    : day.getDay() === 0
                    ? "red"
                    : "inherit",
              }}
            >
              {new Intl.DateTimeFormat("ko-KR", { weekday: "long" })
                .format(day)
                .slice(0, 1)}
            </li>
            <li className={"dayli"}>
              {day.getDate().toString().padStart(2, "0")}
            </li>
          </ul>
        </div>
      ))}
      {/* <CalendarSlider festivals={festivals} week={week} index={activeIndex} /> */}
      {/* <CalendarSlider festivals={festivalArray} /> */}
      <CalendarSwiper festivals={filteredFestivalArrayRef.current} />
    </div>
  );
};

export default Calendar;

//(함수로 축소한 파일 useState버전) Calendar.js 파일
import React, { useState, useEffect } from "react";
import CalendarSwiper from "./CalendarSwiper";
// import "./Calendar.css";
import "../css/Calendar.css";

const Calendar = ({ festivals }) => {
  const [date, setDate] = useState(new Date()); //오늘의 날짜에 대한 useState
  const [week, setWeek] = useState([]); //한 주에 대한 useState
  const [activeIndex, setActiveIndex] = useState(0); //클릭한 index에 대한 useState
  const [isNextBtnClicked, setIsNextBtnClicked] = useState(false); //달력 옆으로 넘기는 버튼 클릭 여부에 대한 useState
  const [filteredFestivalArray, setFilteredFestivalArray] = useState([]); // 클릭한 날짜에 진행 중인 축제들에 대한 배열 useRef
  //날짜를 클릭할 시 호출되는 함수
  const getFestivalsByDate = (date, festivals) => {
    const filteredFestival = festivals.filter((festival) => {
      const festivalStartDate = new Date(festival.date[0]);
      const festivalEndDate = new Date(festival.date[1]);
      const clickedDate = new Date(date);

      // 시간을 무시하고 년, 월, 일만을 비교
      festivalStartDate.setHours(0, 0, 0, 0);
      festivalEndDate.setHours(0, 0, 0, 0);
      clickedDate.setHours(0, 0, 0, 0);
      return (
        clickedDate &&
        festivalStartDate <= clickedDate &&
        clickedDate <= festivalEndDate
      );
    });

    // 해당 날짜에 진행하는 축제가 3개 미만이면 배열의 length가 3개가 될 때까지 noimage.png를 넣음
    if (filteredFestival.length < 3) {
      while (true) {
        if (filteredFestival.length === 3) break;
        filteredFestival.push({ poster: "/image/icon/noimage.png", id: -1 });
      }
    }

    return filteredFestival;
  };
  const handleCountryClick = (index) => {
    setActiveIndex(index);
    setIsNextBtnClicked(false);
    const filteredFestival = getFestivalsByDate(week[index][1], festivals);
    setFilteredFestivalArray(filteredFestival);
  };

  useEffect(() => {
    let now = new Date();
    let currentDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    //오늘 날짜를 기준으로 한 주를 만듦
    let currentWeek = makeWeekArr(currentDate);

    const currentDayIndex = currentWeek.findIndex(
      ([index, day]) =>
        day.getFullYear() === currentDate.getFullYear() &&
        day.getMonth() === currentDate.getMonth() &&
        day.getDate() === currentDate.getDate()
    );

    setWeek(currentWeek);
    setDate(currentDate);
    setActiveIndex(currentDayIndex);

    const filteredFestival = getFestivalsByDate(
      currentWeek[currentDayIndex][1],
      festivals
    );
    setFilteredFestivalArray(filteredFestival);
  }, [festivals]);

  //오늘 날짜를 기준으로 한 주를 계산함
  const makeWeekArr = (date) => {
    let day = date.getDay();
    let week = [];
    for (let i = 0; i < 14; i++) {
      let newDate = new Date(date.valueOf() + 86400000 * (i - day));
      week.push([i, newDate]);
    }
    return week;
  };

  //달력의 왼쪽 버튼을 누를 시에 전 주를 나타냄
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
  };

  //달력의 오른쪽 버튼을 누를 시에 다음주를 나타냄
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
  };

  return (
    <div className="tatalCalendarContainer">
      <div className="festivalschedule">
        <span className="scheduleregion">{festivals[0].location} </span>
        <span className="schedulDes">축제 일정</span>
      </div>
      <div className="CalendarContainer">
        <div className="Year-Month-dayContainer">
          {/* 전 주로 넘어가는 버튼 */}
          <button className="nextBtn" onClick={onPressArrowLeft}>
            {"<"}
          </button>
          {/* 이번 한 주의 기간을 나타내는 부분 */}
          <div className="period">
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
          </div>
          {/* 다음주로 넘어가는 버튼 */}
          <button className="nextBtn" onClick={onPressArrowRight}>
            {">"}
          </button>
        </div>
        {week.map(([index, day]) => (
          <div className="calendar" key={index}>
            <ul
              className={`calendarul ${activeIndex === index ? "active" : ""} ${
                isNextBtnClicked ? "nextBtnClicked" : ""
              }`}
              onClick={() => handleCountryClick(index)}
            >
              <li
                className={`dayofweekli ${
                  day.getDay() === 6 ? "saturday" : ""
                } ${day.getDay() === 0 ? "sunday" : ""}`}
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
      </div>
      <CalendarSwiper festivals={filteredFestivalArray} />
    </div>
  );
};

export default Calendar;

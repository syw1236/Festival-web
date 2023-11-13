import React, { useState, useEffect } from "react";
import CalendarSlider from "./SimpleSlider";
import "./Calendar.css";
const Calendar = ({ festivals }) => {
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleCountryClick = (index) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    let now = new Date();
    let currentDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    let currentWeek = makeWeekArr(currentDate);
    setWeek(currentWeek); //오늘을 기준으로 일주일치 날짜 들어있는 배열
    setDate(currentDate);
    const currentDayIndex = currentWeek.findIndex(
      ([index, day]) =>
        day.getFullYear() === currentDate.getFullYear() &&
        day.getMonth() === currentDate.getMonth() &&
        day.getDate() === currentDate.getDate()
    );
    setActiveIndex(currentDayIndex);
  }, []);

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
    //왼쪽 버튼 누를 시에
    let newDate = new Date(date.valueOf() - 86400000 * 14);
    let newWeek = makeWeekArr(newDate);
    setWeek(newWeek);
    setDate(newDate);
  };

  const onPressArrowRight = () => {
    //오른쪽 버튼 누를시에
    let newDate = new Date(date.valueOf() + 86400000 * 14);
    let newWeek = makeWeekArr(newDate);
    setWeek(newWeek);
    setDate(newDate);
  };

  // 나머지 컴포넌트 로직 및 JSX 부분을 추가하십시오.

  return (
    <div className="tatalCalendarContainer">
      <div className="Year-Moth-dayContainer">
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
        <div className="calendarContainer">
          <ul
            className={`calendarul ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleCountryClick(index)}
          >
            {/* <li key={index} className="dayofweekli"> */}
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
            <li key={index} className={"dayli"}>
              {day.getDate().toString().padStart(2, "0")}
            </li>
          </ul>
        </div>
      ))}
      <CalendarSlider festivals={festivals} />
    </div>
  );
};

export default Calendar;

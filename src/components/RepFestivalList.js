import RepFestival from "./RepFestival";
// import "./RepFestivalList.css";
import "../css/RepFestivalList.css";
function RepFestivalList({ data = [] }) {
  const today = new Date();
  // 오늘보다 축제 마지막 날짜가 큰 것으로 데이터 필터링
  const filterDateArray = data.filter((item) => new Date(item.date[1]) > today);
  // 랜덤값 3개를 고름
  const getRandomIndexes = (max, count) => {
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };
  const randomIndexes = getRandomIndexes(filterDateArray.length, 3);
  return (
    <div className="repFestivalContainer">
      {randomIndexes.map((index) => (
        <RepFestival data={filterDateArray[index]} />
      ))}
    </div>
  );
}

export default RepFestivalList;

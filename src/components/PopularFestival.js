import FestivalSimple from "./FistivalSimple";
// import "./PopularFestival.css";
import "../css/PopularFestival.css";
const PopularFestival = ({ festivals }) => {
  const dividedArrays = [];
  //좋아요가 많은 순으로 배열에 넣음
  const sortedArray = festivals.sort((a, b) => b.likes - a.likes);
  const top6Array = sortedArray.slice(0, 6);
  for (let i = 0; i < festivals.length; i += 3) {
    dividedArrays.push(top6Array.slice(i, i + 3));
  }

  return (
    <div className="currentpopularity">
      <div className="popularityContain">
        {/* 클릭한 지역의 현재 인기 축제 */}
        <span className="region">{festivals[0].location} </span>
        <span className="regionDes">현재 인기 축제</span>
      </div>
      <div className="festivalSimpleContain">
        {/* 클릭한 지역의 인기 축제 6개를 한 줄에 3개씩 나타냄 */}
        {dividedArrays.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((item, itemIndex) => (
              <FestivalSimple key={itemIndex} festival={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularFestival;

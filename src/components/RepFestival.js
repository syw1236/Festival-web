import "./RepFestival.css";
import LookFestivalDetail from "./LookFestivalDetail";
//import FestivalSimple from "./FistivalSimple";
function RepFestival({ data }) {
  //const array = data;
  const today = new Date();
  var dateArray = data.date[1].split("-");
  var enddayArray = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

  const timeDiff = enddayArray.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return (
    <div className="RepFestivalDiv">
      <ul>
        <li>
          <span className="dayRemain">D-{daysLeft}</span>
        </li>
        <li>
          <span className="name">{data.name}</span>
        </li>
        <li>
          <span className="description">{data.description}</span>
        </li>
        <li>
          <LookFestivalDetail festival={data} />
        </li>
      </ul>
    </div>
  );
}
export default RepFestival;

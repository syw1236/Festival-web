// import "./FestivalSimple.css";
import "../css/FestivalSimple.css";
import { Link } from "react-router-dom";
function FestivalSimple({ festival }) {
  return (
    <div className="festivalContain">
      <Link
        to={`/festival_detail/${festival.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img
          className="festivalImage"
          src={festival.poster}
          alt="festival.poster"
        />

        <div className="festivalName">{festival.name}</div>
        <div className="festivalLocation">{festival.detail_locations}</div>
      </Link>
    </div>
  );
}
export default FestivalSimple;

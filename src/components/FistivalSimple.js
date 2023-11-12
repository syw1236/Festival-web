import "./FestivalSimple.css";
function FestivalSimple({ festival }) {
  return (
    <div className="festivalContain">
      <img
        className="festivalImage"
        width={250}
        height={250}
        src={festival.poster}
        alt="festival.poster"
      />
      <div className="festivalName">{festival.name}</div>
      <div className="festivalLocation">{festival.detail_locations}</div>
    </div>
  );
}
export default FestivalSimple;

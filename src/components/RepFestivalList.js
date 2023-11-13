import RepFestival from "./RepFestival";

function RepFestivalList({ data = [], country }) {
  const today = new Date();
  console.log(`today => ${today}`);
  //const filterlocationArray = data.filter((item) => item.location === country);
  const filterDateArray = data.filter((item) => new Date(item.date[1]) > today);
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
    <table>
      <tr>
        {randomIndexes.map((index) => (
          <td key={index}>
            <RepFestival data={filterDateArray[index]} />
          </td>
        ))}
      </tr>
    </table>
  );
}

export default RepFestivalList;
//data에서 지역명이 같은 배열을 만들고 배열의 size-1까지 랜덤으로 돌려서 3개를 뽑음
//그 3개를 각각의 컴포넌트에서 만들면 될 듯

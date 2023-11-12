import RepFestival from "./RepFestival";

function RepFestivalList({ data = [], country }) {
  const today = new Date();
  console.log(`today => ${today}`);
  //const filterlocationArray = data.filter((item) => item.location === country);
  const filterDateArray = data.filter((item) => new Date(item.date[1]) > today);
  // console.log(`dataArray = ${dataArray2.length}`);
  const randomNum = () => {
    let indexs = [];
    var num = null;
    for (let i = 0; i < 3; i++) {
      var random = Math.floor(Math.random() * filterDateArray.length);
      if (num !== random) {
        indexs.push(filterDateArray[random]);
      }
      // } else {
      //   indexs.pop();
      //   i = -1;
      // }
      num = random;
    }
    return indexs;
  };

  return (
    <table>
      <tr>
        {randomNum().map((random, i) => (
          <td>
            <RepFestival key={i} data={random} />
          </td>
        ))}
      </tr>
    </table>
  );
}

export default RepFestivalList;
//data에서 지역명이 같은 배열을 만들고 배열의 size-1까지 랜덤으로 돌려서 3개를 뽑음
//그 3개를 각각의 컴포넌트에서 만들면 될 듯

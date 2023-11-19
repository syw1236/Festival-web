import styled from "styled-components";

const InputPart = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.15rem solid #313131;
  border-radius: 2rem;
  padding-left: 1rem;
  font-weight: 700;
  &::placeholder {
    color: rgb(171, 171, 171);
    font-weight: 700;
  }
  &:focus {
    outline: 0;
  }
`;

// ***************** 메인페이지의 검색파트 내부 input 컴포넌트
function SearchInput({ searchData, setUserInput }) {
  // 검색창 input 업데이트 함수
  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };

  return <InputPart placeholder="어떤 축제로 떠나볼까요?" onChange={getValue}></InputPart>;
}

export default SearchInput;

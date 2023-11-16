import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

const SearchForm = styled.form`
  box-sizing: border-box;
  width: 29rem;
  height: 2.2rem;
  position: relative;
`;

const Searchinput = styled.input`
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

const SearchButt = styled.div`
  box-sizing: border-box;
  position: absolute;
  size: 1rem;
  top: 0.3rem;
  right: 0.8rem;
  cursor: pointer;
`;

function SearchBox({ searchData }) {
  const [userInput, setUserInput] = useState("");

  // 검색창 input 업데이트 함수
  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };

  // 돋버기 버튼 클릭시, 검색후 결과를 검색페이지에 넘긴다.
  const cllickSearchcButton = () => {
    const data = searchData(userInput);
    console.log(data);
    // 검색페이지에 데이터 전달
  };

  return (
    <SearchForm>
      <Searchinput placeholder="어떤 축제로 떠나볼까요?" onChange={getValue}></Searchinput>
      <SearchButt>
        <IoSearch size={27} color="#313131" onClick={cllickSearchcButton} />
      </SearchButt>
    </SearchForm>
  );
}

export default SearchBox;

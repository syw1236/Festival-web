import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import SearchInput from "./SearchInput";

const SearchForm = styled.form`
  box-sizing: border-box;
  width: 29rem;
  height: 2.2rem;
  position: relative;
`;

const SearchButt = styled.div`
  box-sizing: border-box;
  position: absolute;
  size: 1rem;
  top: 0.3rem;
  right: 0.8rem;
  cursor: pointer;
`;
// ***************** 메인페이지의 검색파트 컴포넌트
function SearchBox({ searchData }) {
  // 검색창에 입력된 문자열을 저장하는 상태변수
  const [userInput, setUserInput] = useState("");

  // 돋버기 버튼 클릭시, 검색후 결과를 검색페이지에 넘긴다.
  const cllickSearchcButton = () => {
    const data = searchData(userInput);
    console.log(data);
    // 검색페이지에 데이터 전달
  };

  return (
    <SearchForm>
      <SearchInput searchData={searchData} setUserInput={setUserInput} />
      <SearchButt>
        <IoSearch size={27} color="#313131" onClick={cllickSearchcButton} />
      </SearchButt>
    </SearchForm>
  );
}

export default SearchBox;

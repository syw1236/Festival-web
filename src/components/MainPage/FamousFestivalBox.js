import styled from "styled-components";
import FamousFestivalListItem from "./FamousFestivalListItem";

const Header = styled.div`
  box-sizing: border-box;
  margin-bottom: 0.6rem;
  font-size: 1rem;
  font-weight: 900;
`;

const ListWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
`;

const ItemWrapper = styled.div`
  box-sizing: border-box;
  margin-bottom: 1.5rem;
`;

function FamousFestivalBox({ likedFestivals }) {
  return (
    <>
      <Header>{"현재 인기높은 국내축제"}</Header>
      <ListWrapper>
        {likedFestivals.map((el, ix) => {
          return (
            <ItemWrapper key={ix}>
              <FamousFestivalListItem data={el} />
            </ItemWrapper>
          );
        })}
      </ListWrapper>
    </>
  );
}

export default FamousFestivalBox;
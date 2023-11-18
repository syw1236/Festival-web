import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

const ListItem = styled.div`
  box-sizing: border-box;
`;

const Poster = styled.img`
  box-sizing: border-box;
  display: block;
  width: 14.5rem;
  height: 13rem;
  cursor: pointer;
`;

const LikePrint = styled.div`
  box-sizing: border-box;
  width: 14.5rem;
  height: 2rem;
  padding: 0.2rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  cursor: pointer;
`;

const LikeCount = styled.div`
  box-sizing: border-box;
  padding-left: 1rem;
  font-weight: 700;
`;

function FamousFestivalListItem({ data }) {
  // 현재 좋아요 개수
  const [likes, setLikes] = useState(data.likes);
  // 좋아요 버튼이 눌렸는지 여부
  const [liked, setLiked] = useState(false);

  // 좋아요 버튼 클릭 함수
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  // 포스터 클릭시 축제상세 페이지로 이동
  const clikPoster = () => {
    console.log("축제상세페이지로 이동");
    //navigate("/축제상세페이지", { state: { festivalData: data } });
  };
  return (
    <ListItem onClick={clikPoster}>
      <Poster src={data.poster} />
      <LikePrint onClick={handleLike}>
        <FaHeart size={25} color={liked ? "red" : "grey"} />
        <LikeCount>{likes}</LikeCount>
      </LikePrint>
    </ListItem>
  );
}

export default FamousFestivalListItem;
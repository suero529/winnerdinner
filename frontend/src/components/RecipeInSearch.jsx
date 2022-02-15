import React from "react";
import styled from "styled-components";

const RecipeinSearchContainer = styled.div`
  width: 100%;
  height: 2em;
  display: flex;
  border-bottom: 1px solid #d8d8d852;
  padding: 6px 8px;
`;

const Thumbnail = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex: 1 img {
    width: auto;
    height: 100%;
  }
`;

const Name = styled.h3`
  font-size: 20px;
  color: #000;
  margin-left: 10px;
  display: flex;
  flex: 2;
`;

export function RecipeinSearch(props) {
  const { thumbnailSrc, name } = props;

  return (
    <RecipeinSearchContainer>
      <Thumbnail>
        <img src={thumbnailSrc} alt="food" />
      </Thumbnail>
      <Name>{name}</Name>
    </RecipeinSearchContainer>
  );
}

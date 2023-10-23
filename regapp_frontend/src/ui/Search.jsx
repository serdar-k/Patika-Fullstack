/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Input from "./Input";
import { TbSearch } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import { getVehiclesByQuery } from "../services/apiVehicle";
import { useNavigate } from "react-router-dom";
import {
  AuthDispatchContext,
  useAuthDispatch,
  useSearchState,
} from "../context/AuthenticationContext";
import { delay } from "../helpers/helpers";

const SearchContainer = styled.div`
  font-size: 1rem;
  position: relative;
`;

const Icon = styled.span`
  position: absolute;
  scale: calc(1.5);
  transform: translateY(-25%);
  top: 50%;
  left: 5%;
`;

const SearchInput = styled.input`
  border: none;
  border-bottom: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-100);
  padding: 0.6rem 0.8rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.5s;
  padding-left: 15%;
`;

function Search() {
  const [searchQuery, setSearhQuery] = useState("");
  const navigate = useNavigate();
  const { searchDispatch } = useSearchState();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await getVehiclesByQuery(searchQuery);

    if (data.status === 200) {
      console.log(data.data.content);
      searchDispatch({ type: "search-success", payload: data.data });
      navigate("/searchresults");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <SearchContainer>
        <Icon>
          <TbSearch />
        </Icon>
        <SearchInput
          placeholder="Search"
          type="text"
          onChange={(e) => setSearhQuery(e.target.value)}
        />
      </SearchContainer>
    </form>
  );
}

export default Search;

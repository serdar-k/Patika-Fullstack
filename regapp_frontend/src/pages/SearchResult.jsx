// import { useAuthDispatch } from "../context/AuthenticationContext";

// function SearchResult() {
//   const { searchResults } = useAuthDispatch();
//   const data = searchResults.content;

//   return (
//     <div>
//       <ul>
//         {data.map((data, index) => {
//           return <li key={index}>{data.brand}</li>;
//         })}
//       </ul>
//     </div>
//   );
// }

// export default SearchResult;

/* eslint-disable no-unused-vars */
import { styled } from "styled-components";
import CarRow from "../features/cars/VehicleRow";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import http, { setToken } from "../lib/http";
import { loadToken } from "../context/localStore";
import { useAuthDispatch } from "../context/AuthenticationContext";
import { delay } from "../helpers/helpers";
import { useSearchState } from "../context/AuthenticationContext";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.2rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1rem 1.8rem;
`;

const PaginationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;

function SearchResult() {
  const { searchState } = useSearchState();
  const [page, setPage] = useState(0);
  const searchArray = searchState.searchResult.content;

  return (
    <>
      <h3>Search Results</h3>
      <Table>
        <TableHeader>
          <div>Name</div>
          <div>Brand</div>
          <div>Model</div>
          <div>Year</div>
          <div>Plate</div>
        </TableHeader>
        {searchArray.map((vehicle, index) => {
          return <CarRow key={index} searchState={vehicle} />;
        })}
        {/* <PaginationRow>
        <Button
          onClick={() =>
            setPage((prev) => {
              return Math.max(prev - 1, 0);
            })
          }
          size={"xsmall"}
          variation={isFirstPage ? "disabled" : "primary"}
          disabled={isFirstPage}
        >
          Previous
        </Button>

        <ButtonContainer>
          {array.map((el, index) => {
            return (
              <Button
                onClick={() => setPage(index)}
                key={index}
                size={"xsmall"}
                variation={"pagination"}
              >
                {index + 1}
              </Button>
            );
          })}
        </ButtonContainer>

        <Button
          onClick={() =>
            setPage((prev) => {
              return prev + 1;
            })
          }
          size={"xsmall"}
          variation={isLastPage ? "disabled" : "primary"}
          disabled={isLastPage}
        >
          Next
        </Button>
      </PaginationRow> */}
      </Table>
    </>
  );
}

export default SearchResult;

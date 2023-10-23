/* eslint-disable no-unused-vars */
import { styled } from "styled-components";
import CarRow from "./VehicleRow";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import http, { setToken } from "../../lib/http";
import { loadToken } from "../../context/localStore";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.2rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
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

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;

function VehicleTable() {
  const queryClient = useQueryClient();

  async function getVehicles(page = 0) {
    const response = await http.get("/api/v1/vehicles", {
      params: { page: page, size: 10 },
    });
    return response;
  }

  const [page, setPage] = useState(0);

  const {
    status,
    data: vehicleData,
    error,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["cars", page],
    queryFn: () => getVehicles(page),
  });
  const isFirstPage = vehicleData?.data.first;
  const isLastPage = vehicleData?.data.last;
  const totalPages = vehicleData?.data.totalPages;

  const array = Array.from({ length: totalPages }, (_, i) => i + 1);

  // ! ARAC EKLENDIGI ANDA SAYFA GUNCELLENMIYOR, HERHANGI BIR DEGISIMDE SAYFA GUNCELLENIYOR
  useEffect(() => {
    if (vehicleData?.hasMore) {
      queryClient.prefetchQuery(["cars", page + 1], () =>
        getVehicles(page + 1)
      );
    }
  }, [vehicleData, page, queryClient]);

  if (status === "loading") return <div>Loading</div>;

  // if (data === null) return <div>There no vehicles!</div>;

  return (
    <Table>
      <TableHeader>
        <div>Name</div>
        <div>Brand</div>
        <div>Model</div>
        <div>Year</div>
        <div>Plate</div>
        <div>Actions</div>
      </TableHeader>
      {vehicleData?.data.content.map((vehicle, index) => {
        return <CarRow key={index} vehicle={vehicle} />;
      })}
      {
        <PaginationRow>
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
        </PaginationRow>
      }
    </Table>
  );
}

export default VehicleTable;

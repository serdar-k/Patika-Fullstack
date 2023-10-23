import http from "../lib/http";

export async function getVehicles(page) {
  // ! SIZE DEGISKENINI ILGILI DOSYAYA YAZ
  const response = await http.get("/api/v1/vehicles", {
    params: { page: page, size: 10 },
  });
  return response;
}

export async function getVehicle(id) {
  const response = await http.get(`/api/v1/vehicles/${id.queryKey[1]}`);
  return response;
}

export async function getVehiclesByUserId(id) {
  const response = await http.get(
    `/api/v1/vehicles/user-vehicles/${id.queryKey[1]}`
  );
  return response;
}

export async function getVehiclesByQuery(query) {
  const response = http.get(`/api/v1/vehicles/query`, {
    params: { query },
  });
  return response;
}

export async function addVehicle({ vehicleData, userId }) {
  const { vehicleName, brand, model, modelYear, plate } = vehicleData;

  const response = await http.post(
    `/api/v1/vehicles`,
    {
      vehicleName,
      brand,
      model,
      modelYear,
      plate,
    },
    {
      params: { userId },
    }
  );
  return response;
}

export async function addVehicleImage({ formData }) {
  console.log(formData);
  const response = await http.post("/api/v1/image/upload", formData);

  return response;
}

export async function deleteVehicle(vehicleId) {
  const response = http.delete(`/api/v1/vehicles/${vehicleId}`);
  return response;
}

export async function updateVehicle(vehicleData) {
  const response = http.put(`/api/v1/vehicles/${vehicleData.editCarId}`, {
    ...vehicleData.updatedVehicleData,
  });
  return response;
}

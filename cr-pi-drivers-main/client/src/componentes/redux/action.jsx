import axios from "axios";

export const getDrivers = () => {
  return async (dispatch) => {
    try {
      const apiEndpoint = 'http://localhost:5000/drivers';
      const apiResponse = await axios.get(apiEndpoint);
      const apiDrivers = apiResponse.data.map((driver, index) => ({
        id: `api_${driver.id}`, // Asignar IDs en el formato api_id
        forename: driver.name.forename,
        surname: driver.name.surname,
        nationality: driver.nationality,
        image: driver.image ? driver.image : "../../../F1.svg",
        teams: driver.teams,
        dob: driver.dob,
        description: driver.description,
      }));

      const dbEndpoint = 'http://localhost:3001/driversDB';
      const dbResponse = await axios.get(dbEndpoint);
      const dbDrivers = dbResponse.data.map((driver, index) => ({
        id: `db_${index + apiDrivers.length}`, // Asignar nuevos IDs para los conductores de la base de datos
        forename: driver.forename,
        surname: driver.surname,
        nationality: driver.nationality,
        image: driver.image ? driver.image : "../../../F1.svg",
        teams: driver.teams,
        dob: driver.dob,
        description: driver.description,
      }));

      const combinedDrivers = [...apiDrivers, ...dbDrivers];

      dispatch({
        type: "GET_DRIVERS",
        payload: combinedDrivers,
      });
    } catch (error) {
      console.error(error.message);
      alert("No se pudieron obtener los conductores.");
    }
  };
};


export const filterByTeam = (team) => ({
  type: "FILTER_BY_TEAM",
  payload: team,
});

export const applyFilters = () => ({
  type: "APPLY_FILTERS",
});

export const resetFilters = () => ({
  type: "RESET_FILTERS",
});

export const getByName = (name) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();

            const dbDrivers = state.drivers.filter(driver => {
        const fullName = `${driver.forename} ${driver.surname}`.toLowerCase();
        return fullName.includes(name.toLowerCase());
      });

      const combinedDrivers = [...dbDrivers];

      const uniqueDrivers = combinedDrivers.filter((driver, index, self) =>
        index === self.findIndex(t => (
          t.id === driver.id
        ))
      );

      const limitedResults = uniqueDrivers.slice(0, 15);

      dispatch({
        type: "GET_BY_NAME",
        payload: limitedResults,
      });
    } catch (error) {
      console.error(error.message);
      alert("No se pudieron obtener los conductores.");
    }
  };
};

export const getById = (id) => {
  return (dispatch, getState) => {
    const { drivers } = getState();

    let driver = drivers.find(driver => driver.id === id);

    if (!driver) {
      driver = drivers.find(driver => driver.id === `api_${id}`);
      if (!driver) {
        driver = drivers.find(driver => driver.id === `db_${id}`);
      }
    }

    if (driver) {
      dispatch({
        type: "GET_BY_ID",
        payload: driver,
      });
    } else {
      console.error(`Conductor con ID ${id} no encontrado.`);
      alert("No se pudo obtener el conductor.");
    }
  };
};




export const addDriver = (driver) => {
  return async (dispatch) => {
    try {
      const endpoint = 'http://localhost:3001/drivers';
      const response = await axios.post(endpoint, driver);
      const newDriver = response.data;
      dispatch({
        type: "ADD_DRIVER",
        payload: newDriver,
      });
    } catch (error) {
      console.error(error.message,);
      alert("No se pudo crear el conductor.");
    }
  };
};


export const sortByAlphabetical = (order) => {
  return {
    type: "SORT_BY_ALPHABETICAL",
    payload: order,
  };
};

export const sortByBirthYear = (order) => {
  return {
    type: "SORT_BY_BIRTH_YEAR",
    payload: order,
  };
};

export const filterByApi = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/drivers');
      const drivers = response.data.map(driver => ({
        forename: driver.name.forename,
        surname: driver.name.surname,
        id: `api_${driver.id}`,
        image: driver.image,
        nationality: driver.nationality,
        teams: driver.teams,
        description: driver.description,
        dob: driver.dob,
        createdAt: driver.createdAt,
        updatedAt: driver.updatedAt,
      }));

      dispatch({
        type: "FILTER_BY_API",
        payload: drivers,
      });
    } catch (error) {
      console.error('Error fetching drivers from API:', error);
    }
  };
};

export const filterByBaseDeDatos = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/driversDB');
      const drivers = response.data;

      dispatch({
        type: "FILTER_BY_BASE_DE_DATOS",
        payload: drivers,
      });
    } catch (error) {
      console.error('Error fetching drivers from database:', error);
    }
  };
};

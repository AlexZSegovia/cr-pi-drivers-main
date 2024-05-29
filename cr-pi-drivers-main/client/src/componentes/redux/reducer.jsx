const initialState = {
  drivers: [],
  copia: [],
  appliedFilters: {
    api: false,
    baseDeDatos: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DRIVERS":
      return {
        ...state,
        drivers: action.payload,
        copia: action.payload, 
      };

    case "FILTER_BY_TEAM":
      const teamFilter = action.payload 
        ? state.copia.filter(driver => driver.teams && driver.teams.includes(action.payload)) 
        : state.copia;
      return {
        ...state,
        drivers: teamFilter,
      };

    case "SORT_BY_ALPHABETICAL":
      const alphabeticalDrivers = [...state.drivers].sort((a, b) => {
        const nameA = `${a.forename} ${a.surname}`.toUpperCase();
        const nameB = `${b.forename} ${b.surname}`.toUpperCase();
        if (nameA < nameB) return action.payload === "ASC" ? -1 : 1;
        if (nameA > nameB) return action.payload === "ASC" ? 1 : -1;
        return 0;
      });
      return {
        ...state,
        drivers: alphabeticalDrivers,
      };

    case "SORT_BY_BIRTH_YEAR":
      const birthYearDrivers = [...state.drivers].sort((a, b) => {
        const dateA = new Date(a.dob);
        const dateB = new Date(b.dob);
        return action.payload === "ASC" ? dateB - dateA : dateA - dateB;
      });
      return {
        ...state,
        drivers: birthYearDrivers,
      };

    case "FILTER_BY_API":
      return {
        ...state,
        drivers: action.payload,
        copia: action.payload, 
        appliedFilters: {
          ...state.appliedFilters,
          api: true,
          baseDeDatos: false,
        },
      };

    case "FILTER_BY_BASE_DE_DATOS":
      return {
        ...state,
        drivers: action.payload,
        copia: action.payload, 
        appliedFilters: {
          ...state.appliedFilters,
          api: false,
          baseDeDatos: true,
        },
      };

    case "GET_BY_NAME":
      return {
        ...state,
        drivers: action.payload,
      };

    case "GET_BY_ID":
      return {
        ...state,
        drivers: [action.payload],
      };

    case "ADD_DRIVER":
      return {
        ...state,
        drivers: [...state.drivers, action.payload],
        copia: [...state.copia, action.payload],
      };

    case "APPLY_FILTERS":
      let filteredDrivers = state.copia;
      if (state.appliedFilters.api) {
        filteredDrivers = filteredDrivers.filter(driver => driver.id.startsWith('api_'));
      }
      if (state.appliedFilters.baseDeDatos) {
        filteredDrivers = filteredDrivers.filter(driver => driver.id.startsWith('db_'));
      }
      return {
        ...state,
        drivers: filteredDrivers,
      };

    case "RESET_FILTERS":
      return {
        ...state,
        drivers: state.copia,
        appliedFilters: {
          api: false,
          baseDeDatos: false,
        },
      };

    case "":
      return initialState;

    default:
      return state;
  }
};

export default reducer;

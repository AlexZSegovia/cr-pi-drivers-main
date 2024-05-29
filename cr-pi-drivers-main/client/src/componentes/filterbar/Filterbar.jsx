import { useDispatch } from "react-redux";
import { filterByTeam, sortByAlphabetical, sortByBirthYear, filterByApi, filterByBaseDeDatos } from "../redux/action";
import { useState } from "react";
import style from "./FilterBar.module.css";

const FilterBar = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const [filter, setFilter] = useState("");
  const [birthYearOrder, setBirthYearOrder] = useState("");
  const [teams, setTeams] = useState("");

  const handleOrderChange = (e) => {
    const value = e.target.value;
    setOrder(value);
    if (value === "") {
      dispatch(sortByAlphabetical(null));
    } else if (value === "ASC") {
      dispatch(sortByAlphabetical(value));
    } else if (value === "DESC") {
      dispatch(sortByAlphabetical(value));
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value === "") {
      return "";
    } else if (value === "API") {
      dispatch(filterByApi());
    } else if (value === "BD") {
      dispatch(filterByBaseDeDatos());
    }
  };

  const handleBirthYearOrderChange = (e) => {
    const value = e.target.value;
    setBirthYearOrder(value);
    if (value === "") {
      dispatch(sortByBirthYear(null));
    } else if (value === "ASC" || value === "DESC") {
      dispatch(sortByBirthYear(value));
    }
  };

  const handleTeamChange = (e) => {
    const value = e.target.value;
    setTeams(value);
    dispatch(filterByTeam(value));
  };

  return (
    <div className={style.filterBar}>
      <div>
        <select name="order" value={order} onChange={handleOrderChange}>
          <option value="">Ordenar</option>
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
        </select>
        <select name="filter" value={filter} onChange={handleFilterChange}>
          <option value="">Filtrar</option>
          <option value="API">API</option>
          <option value="BD">Base de Datos</option>
        </select>
        <select name="birthYearOrder" value={birthYearOrder} onChange={handleBirthYearOrderChange}>
          <option value="">Ordenar por fecha de nacimiento</option>
          <option value="ASC">De mayor a menor</option>
          <option value="DESC">De menor a mayor</option>
        </select>
        <select name="team" value={teams} onChange={handleTeamChange}>
          <option value="">Seleccionar equipo</option>
          <option value="Red Bull">Red Bull</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Ferrari">Ferrari</option>
          <option value="McLaren">McLaren</option>
          <option value="Aston Martin">Aston Martin Aramco</option>
          <option value="Alpine">Alpine</option>
          <option value="Williams">Williams</option>
          <option value="RB">RB</option>
          <option value="Sauber">Kick Sauber</option>
          <option value="Haas">Haas</option>
          <option value="Honda">Honda RBPT</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;

const axios = require("axios");
const URL = "http://localhost:5000/drivers";

const getDriverName = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await axios.get(`${URL}?name.forename=${name}`);
    const drivers = response.data.drivers;

    const filteredDrivers = drivers.filter(driver =>
      driver.name.forename.toLowerCase().includes(name.toLowerCase())
    );

    if (filteredDrivers.length === 0) {
      return res.status(404).send("Corredor no encontrado");
    }

    const formattedDrivers = filteredDrivers.slice(0, 15).map(driver => ({
      id: driver.id,
      onename: driver.name.forename,
      twoname: driver.name.surname,
      nationality: driver.nationality,
      image: driver.image,
      team: driver.teams,
      number: driver.number,
      dob: driver.dob,
      description: driver.description,
    }));

    return res.status(200).json(formattedDrivers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getDriverName,
};

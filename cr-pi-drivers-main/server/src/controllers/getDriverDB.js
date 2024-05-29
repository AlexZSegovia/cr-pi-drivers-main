const { Driver } = require("../db");

const getDriverDB = async (req, res) => {
  try {
    const drivers = await Driver.findAll();

    const formattedDrivers = drivers.map(driver => ({
        id: `DB_${driver.id}`,
      forename: driver.forename, // Cambiar a forename para que coincida con la estructura de la API
      surname: driver.surname, // Cambiar a surname para que coincida con la estructura de la API
      nationality: driver.nationality,
      image: driver.image ? driver.image : "../../../F1.svg", // Asumiendo que image es la URL de la imagen
      teams: driver.teams, // Asumiendo que teams es un string
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
  getDriverDB,
};

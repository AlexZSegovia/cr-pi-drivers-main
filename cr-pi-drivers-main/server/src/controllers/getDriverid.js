const axios = require('axios');
const API_URL = 'http://localhost:5000/drivers';

const getDriverByID = async (req, res) => {
  const { idDriver } = req.params;

  try {
    const response = await axios.get(`${API_URL}/${idDriver}`);
    const driver = response.data;
    
    // Si la API devuelve un objeto con el equipo del conductor
    const team = driver.team ? driver.team : "Sin equipo";
    
    const driverWithTeam = {
      id: driver.id,
      name: driver.name,
      nationality: driver.nationality,
      image: driver.image ? driver.image.url : "../../../F1.svg",
      team: team,
      dob: driver.dob,
      description: driver.description,
    };

    return res.status(200).json(driverWithTeam);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getDriverByID,
};

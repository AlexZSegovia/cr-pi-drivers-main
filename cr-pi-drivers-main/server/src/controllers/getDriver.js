const axios = require("axios");
const URL = "http://localhost:5000/drivers";

const getDriver = async (req, res) => {
  try {
    const response = await axios.get(URL);
    const drivers = response.data.map(driver => ({
      id: driver.id,
      onename: driver.name.forename,
      twoname: driver.name.surname,
      nationality: driver.nationality,
      image: driver.image ? driver.image.url : "../../../F1.svg",
      team: driver.teams,
      dob: driver.dob,
      description: driver.description,
    }));
    return res.status(200).json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getDriver,
};

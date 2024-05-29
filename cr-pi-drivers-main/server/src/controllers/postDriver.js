const axios = require("axios");
const { Driver, Teams } = require("../db");

const postDriver = async (req, res) => {
  try {
    const { forename, surname, nationality, image, dob, description, teams } = req.body;

    if (!teams) {
      return res.status(400).send("El campo 'teams' es requerido");
    }

    // Buscar el equipo por nombre
    const teamNames = teams.split(',').map(teamName => teamName.trim());
    const teamIds = [];

    for (const teamName of teamNames) {
      const team = await Teams.findOne({ where: { name: teamName } });
      if (!team) {
        return res.status(400).send(`No se encontró el equipo '${teamName}'`);
      }
      teamIds.push(team.id);
    }

    // Verificar si el conductor ya existe en la base de datos
    let existingDriver = await Driver.findOne({ 
      where: { 
        forename: forename, 
        surname: surname 
      } 
    });
    if (existingDriver) {
      return res.status(400).send("El conductor ya existe");
    }

    // Crear el nuevo conductor en la base de datos
    let newDriver = await Driver.create({
      forename,
      surname,
      nationality,
      image,
      teams,
      dob,
      description,
    });
    
    // Relacionar el conductor con los equipos
    await newDriver.addTeams(teamIds);

    return res.status(201).json(newDriver);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  postDriver,
};

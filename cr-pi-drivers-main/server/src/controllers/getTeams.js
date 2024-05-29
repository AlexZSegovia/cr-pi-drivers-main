const axios = require("axios");
const { Team } = require("../db");

const getTeams = async () => {
  try {
    const response = await axios.get("http://localhost:5000/teams");
    const teams = response.data.teams;

    await Promise.all(teams.map(async (team) => {
      await Team.findOrCreate({ where: { name: team.name }, defaults: team });
    }));

    console.log("Teams saved successfully.");
  } catch (error) {
    console.error("Error saving teams:", error);
  }
};

module.exports = {
  getTeams,
};

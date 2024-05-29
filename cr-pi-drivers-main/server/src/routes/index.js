const { Router } = require("express");
const {getDriver}=require("../controllers/getDriver")
const {getTeams}  = require('../controllers/getTeams')
const { getDriverByID } = require('../controllers/getDriverid');
const  { getDriverName}=require('../controllers/GetDriverName');
const   {postDriver}=require( "../controllers/postDriver")
const {getDriverDB}=require("../controllers/getDriverDB")
const router = Router();



router.get('/drivers',getDriver);
router.get('/driversDB',getDriverDB);

router.get('/:idDriver', getDriverByID);
router.get("/drivers/name", getDriverName);
router.post("/drivers",postDriver);
router.get( "/teams",getTeams);

module.exports = router;

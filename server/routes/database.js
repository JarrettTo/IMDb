

import express from "express";
import {
  insert,deleteRecord,updateRecord,viewRecords,viewRecord, setUncommited, setCommited, setRepeatable, setSerializable
} from "../controllers/database.js";
const router = express.Router();

router.post("/insert", insert);
router.get("/delete/:id", deleteRecord);
router.post("/update", updateRecord);
router.get("/viewall/:id", viewRecords);
router.get("/view/:id", viewRecord);
router.get("/uncommited", setUncommited);
router.get("/commited", setCommited);
router.get("/repeatable", setRepeatable);
router.get("/serializable", setSerializable);
//router.post("/:id/update", updateUser);
export default router;

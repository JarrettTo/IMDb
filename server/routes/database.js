

import express from "express";
import {
  insert,deleteRecord,updateRecord,viewRecords,viewRecord
} from "../controllers/database.js";
const router = express.Router();

router.get("/insert", insert);
router.get("/delete", deleteRecord);
router.get("/update/:id", updateRecord);
router.get("/viewall", viewRecords);
router.get("/view/:id", viewRecord);
//router.post("/:id/update", updateUser);
export default router;

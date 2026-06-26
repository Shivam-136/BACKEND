import express from "express"
import {
    createEmployeeControler,
    getAllEmployeeControler,
    getSingleEmployeeControler,
    updateEmployeeControler,
    deleteEmployeeControler,
} from "../controller/employee.controller.js"

const router = express.Router()

router.post("/create", createEmployeeControler)
router.get("/", getAllEmployeeControler)
router.get("/empId", getsingleEmployeeControler)
router.patch("/update/:empId", updateEmployeeControler)
router.delete("/delete/:empId", deleteEmployeeControler)

export default router
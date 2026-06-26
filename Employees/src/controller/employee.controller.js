import EmployeeModel from "../models/employee.model.js";

export const createEmployeeControler = async (req, res) => {
  try {
    let {
      employeeName,
      email,
      mobile,
      designation,
      address,
      company,
      employeeId,
    } = req.body

    if (!employeeName || !email || !employeeId) 
      return res.status(400).json({
        success: false,
        Message: "All fields are required"
      })

    const newEmployee = await EmployeeModel.create({
      employeeName,
      email,
      mobile,
      designation,
      address,
      company,
      employeeId,
    })
       
    return res.status(201).json({
      success: true,
      message: "Employee created",
      data: newEmployee,
    })
  } catch (error) {
    console.log("error in creation", error)
    return res.status(500).json({
      success: false,
      Message: "Something went wrong"
    })
  }
}
////////////////////////////

 export const getAllEmployeeControler = async (req, res) => {
  try {
    const allEmployee = await EmployeeModel.find()

    return res.status(200).json({
      success: true,
      message: "Employees fatched",
      data: allEmployee
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
}
/////////////////////////////

export const getSingleEmployeeControler = async (req, res) => {
  try {
    let {empId}=req.params

    const employee = await EmployeeModel.findById(empId)

    return res.status(200).json({
      success: true,
      Message: "Employee fatched",
      data: employee,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}

///////////////////////////

export const updateEmployeeControler = async (req, res) => {
  try {
    let { empId } = req.params

    let {
      employeeName,
      email,
      mobile,
      designation,
      address,
      company,
      employeeId,
    } = req.body;

    const employee = await EmployeeModel.findByIdAndUpdate(
      empId,
      {
        employeeName,
        email,
        mobile,
        designation,
        address,
        company,
        employeeId,
      },
      {
        new: true,
        runValidators: true,
      }
    )

    return res.status(200).json({
      success: true,
      message: "Employee Updated",
      data: employee,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}


/////////////////////////////

export const deleteEmployeeControler = async (req, res)=>{
  try {
    let {empId} = req.params
    await EmployeeModel.findByIdAndDelete(empId)

    return res.status(200).json({
      success:true,
      message:"Employee deleted"
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Something went wrong"
    })
  }
}
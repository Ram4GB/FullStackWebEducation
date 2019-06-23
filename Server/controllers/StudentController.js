const XLSX = require('xlsx');

const Student = require('../models').Student;
const SchoolClass = require('../models').SchoolClass;

module.exports.getAll = async (req, res, next) => {
    let students = await Student.findAll({
        include: [SchoolClass]
    });
    res.status(200).json(students);
};

module.exports.getByID = async (req, res, next) => {
    let student = await Student.findOne({
        where: {
            id: req.params.id
        },
        include: [SchoolClass]
    });
    res.status(200).json(student);
};

module.exports.create = async (req, res, next) => {
    const { id, fname, lname, SchoolClassId } = req.body;
    let student = await Student.create({
        id: id,
        fname: fname,
        lname: lname,
        SchoolClassId: SchoolClassId
    })
    res.status(200).json({
        message: 'Student was created',
        student_created: student
    });
};

module.exports.update = async (req, res, next) => {
    let { fname, lname, SchoolClassId } = req.body;
    let student = await Student.findOne({
        where: {
            id: req.params.id
        }
    });
    student.fname = fname;
    student.lname = lname;
    student.SchoolClassId = SchoolClassId;
    await student.save();
    res.status(200).json({
        message: 'Student was updated',
        updatedStudent: student
    });
};

module.exports.delete = async (req, res, next) => {
    let student = await Student.findOne({
        where: {
            id: req.params.id
        }
    });
    await student.destroy();
    res.status(200).json({
        message: 'Student was deleted',
        deletedStudent: student
    });
};

module.exports.exportExcel = async (req, res, next) => {
    let students = await Student.findAll();
    let jsonData = JSON.stringify(students);
    console.log(JSON.parse(jsonData));
    let ws = XLSX.utils.json_to_sheet(JSON.parse(jsonData));
    /* create a new blank workbook */
    var wb = XLSX.utils.book_new();
    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    /* Write file*/
    XLSX.writeFile(wb, "hq.xlsx");
    res.download("hq.xlsx");
};

module.exports.importExcel = async (req, res, next) => {
    let fileUpload = req.files.excel;
    let wb = XLSX.read(fileUpload.data);
    let sheetName = wb.SheetNames[0];
    let ws = wb.Sheets[sheetName];
    let jsonData = XLSX.utils.sheet_to_json(ws);
    console.log(jsonData);
};

module.exports.excelToJSON = async (req, res, next) => {
    let fileUpload = req.files.excel;
    let wb = XLSX.read(fileUpload.data);
    let sheetName = wb.SheetNames[0];
    let ws = wb.Sheets[sheetName];
    let jsonData = XLSX.utils.sheet_to_json(ws);
    res.status(200).json(jsonData);
};
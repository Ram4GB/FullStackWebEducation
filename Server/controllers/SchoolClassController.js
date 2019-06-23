const SchoolClass = require('../models').SchoolClass;

module.exports.getAll = async (req, res, next) => {
    let schoolClasses = await SchoolClass.findAll();
    res.status(200).json(schoolClasses);
};

module.exports.getByID = async (req, res, next) => {
    let schoolClass = await SchoolClass.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(schoolClass);
};

module.exports.create = async (req, res, next) => {
    let schoolClass = await SchoolClass.create({
        name: req.body.name,
    });
    res.status(200).json({
        message: 'Class was created',
        createdClass: schoolClass
    });
};

module.exports.update = async (req, res, next) => {
    let schoolClass = await SchoolClass.findOne({
        where: {
            id: req.params.id
        }
    });
    schoolClass.name = req.body.name;
    await schoolClass.save();
    res.status(200).json({
        message: 'Class was updated',
        updatedClass: schoolClass
    });
};

module.exports.delete = async (req, res, next) => {
    let schoolClass = await SchoolClass.findOne({
        where: {
            id: req.params.id
        }
    });
    await schoolClass.destroy();
    res.status(200).json({
        message: 'Class was deleted',
        deletedClass: schoolClass
    });
};
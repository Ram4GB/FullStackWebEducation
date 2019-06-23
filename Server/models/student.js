'use strict';
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        id: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    Student.associate = function (models) {
        Student.belongsTo(models.SchoolClass);
    };
    return Student;
};
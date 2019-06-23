'use strict';
module.exports = (sequelize, DataTypes) => {
    const SchoolClass = sequelize.define('SchoolClass', {
        name: DataTypes.STRING
    }, {});
    SchoolClass.associate = function (models) {
        SchoolClass.hasMany(models.Student);
    };
    return SchoolClass;
};
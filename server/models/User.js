var bcrypt = require('bcryptjs');

'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        birthdate: DataTypes.DATEONLY,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT,
        address: DataTypes.STRING,
        likehelps: DataTypes.INTEGER
    }, {});
    User.beforeSave((user, options) => {
        if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
    });
    User.prototype.comparePassword = function(passw, cb) {
        bcrypt.compare(passw, this.password, function(err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };
    User.associate = function(models) {
        models.User.hasMany(models.Help, {
            foreignKey: 'idCreator',
            as: 'helps'
        });
        models.User.hasMany(models.HelpResponse, {
            foreignKey: 'idResponder',
            as: 'responses'
        });
    };
    return User;
};

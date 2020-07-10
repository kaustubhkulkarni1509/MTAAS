const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('cmpe287', 'postgres', 'JerryGao', {
    host: 'mtaas.c4kz7f4nvqds.us-east-1.rds.amazonaws.com',
    dialect: 'postgres'
  });

  sequelize.authenticate().then(() => {
      console.log('Successfully connected to database')
  }).catch((e) => {
      console.log('Unsuccessful Connection', e)
  })

  module.exports = {
      Sequelize,
      DataTypes,
      sequelize
  }
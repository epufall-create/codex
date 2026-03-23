const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize for PostgreSQL
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define Weather model
const Weather = sequelize.define('Weather', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  humidity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, { timestamps: true });

// Define FavoriteLocation model
const FavoriteLocation = sequelize.define('FavoriteLocation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, { timestamps: true });

// Queries for Weather data
async function createWeatherRecord(data) {
  return await Weather.create(data);
}

async function getWeatherByLocation(location) {
  return await Weather.findOne({ where: { location } });
}

// Queries for Favorite locations
async function addFavoriteLocation(userId, location) {
  return await FavoriteLocation.create({ userId, location });
}

async function getFavoriteLocations(userId) {
  return await FavoriteLocation.findAll({ where: { userId } });
}

module.exports = { Weather, FavoriteLocation, createWeatherRecord, getWeatherByLocation, addFavoriteLocation, getFavoriteLocations };
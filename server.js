require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Init Postgres */
const sequelize = new Sequelize(process.env.PGURI);
const ReviewModel = sequelize.define(process.env.PGTABLE, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  variation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verified_reviews: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feedback: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

app.use((req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader || !authheader.startsWith('Basic')) {
    return res.status(401).send({
      status: 'error',
      data: null,
      message: 'Unauthorized',
    });
  }

  const auth = new Buffer.from(
    authheader.split(' ')[1],
    'base64',
  ).toString().split(':');
  const [username, password] = auth;

  if ((username !== process.env.BASIC_AUTH_USERNAME) && (password !== process.env.BASIC_AUTH_PASSWORD)) {
    return res.status(401).send({
      status: 'error',
      data: null,
      message: 'Unauthorized',
    });
  }

  next();
});

app.get('/api/v1/reviews', async (req, res) => {
  try {
    const reviews = await ReviewModel.findAll();

    return res.send({
      status: 'success',
      data: { reviews },
      message: 'Get Reviews Success',
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      data: null,
      message: 'Internal Server Error',
    })
  }
});

app.listen(PORT, () => {
  console.log(`App listening to http://127.0.0.1:${PORT} || http://localhost:${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

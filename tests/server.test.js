const expect = require('expect');
const request = require('supertest');
const cors = require('cors');
const express = require('express');

const { app } = require('./../server');
const { capitalizeFirstLetter } = require('../utils/utils');

app.use(cors());
app.use(express.json());

describe('GET /auth/google/callback', () => {
    it ('should insert returned google user oauth data into the database', (done) => {
        request(app)
            .get('/auth/google/callback')
            .expect(200)
            .end(done);
    });
})

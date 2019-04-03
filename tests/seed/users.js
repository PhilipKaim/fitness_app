const { capitalizeFirstLetter } = require('../../utils/utils');
const { connection } = require('../../db/mysql');

const users = [
    {
        email: 'philip@gmail.com',
        password: 'userOnePass',
        name: capitalizeFirstLetter('philip')
    }, {
        email: 'janedoe@gmail.com',
        password: 'userTwoPass',
        name: capitalizeFirstLetter('jane')
    }
];

const removeUsers = (done) => {
    connection.query('DELETE FROM Users', function (error, results, fields) {
        if (error) throw error;
        console.log('dropped all Users');
        done();
    });
}

const populateUsers = (done) => {
    connection.query('INSERT INTO Users SET ?', users, function (error, results, fields) {
        if (error) throw error;
        console.log('inserted:', users);
        done();
    });
}


module.exports = { users, populateUsers, removeUsers };
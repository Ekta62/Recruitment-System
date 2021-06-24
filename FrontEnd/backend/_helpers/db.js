const config = require('config.json');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;


module.exports = {
    User: require('../users/user.model'),
   Staff: require('../users/staff.model'),
   Student:require('../users/student.model'),
   Company:require('../users/company.model'),
   Job:require('../users/job.model'),
   ApplyJob:require('../users/apply-job.model')
}
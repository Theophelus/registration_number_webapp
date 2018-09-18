// const assert = require('assert');
// const Registrations = require('../reg_number');
// const pg = require("pg");
// const Pool = pg.Pool;

// //define a connection string to be able to connect to the database.
// const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/registration_numberDB';

// const pool = new Pool({
//   connectionString
// });
// let newRegistration = Registrations(pool);

// describe('registration number widget', function () {

//   // the Factory Function is called newGreet
//   beforeEach(async () => {
//     // clean the tables before each test run
//     // await pool.query("delete from towns;");
//     await pool.query("delete from registration_numbers;");

//   });
//   it('map should not take a registration number more than once', async () => {
//     // await newRegistration.addRegistration('CA 123-345');
//     // await newRegistration.addRegistration('CJ 567-787');
//     // await newRegistration.addRegistration('CA 123-345');
//     assert.equal(await newRegistration.getReg('CA 123-345', 'CJ 567-787'),
//       [{
//         registration_plates: 'CA 123-456'
//       }, {
//         registration_plates: 'CJ 567-787'
//       }]);
//   });

//   it('should be able to return all registration numbers inside the registrstion numbers table', async () => {
//     await newRegistration.addRegistration('CA 123-345');
//     await newRegistration.addRegistration('CJ 567-787');
//     await newRegistration.addRegistration('CAW 983-785');
//     await newRegistration.addRegistration('CY 689-462');
//     assert.strictEqual(await newRegistration.getReg(), [{
//         registration_plates: 'CA 123-345',
//         town_id: 1
//       },
//       {
//         registration_plates: 'CJ 567-787'
//       },
//       {
//         registration_plates: 'CAW 983-785'
//       },
//       {
//         registration_plates: 'CY 689-462'
//       }
//     ]);
//   });
//   // it('should be able to return registration number from Cape Town', function () {
//   //   var newRegistration = registration();
//   //   newRegistration.setMap('CA 123-456');
//   //   newRegistration.setMap('CA 123-956');
//   //   newRegistration.setMap('CL 123-456');
//   //   newRegistration.setMap('CJ 123-456');
//   //   var getList = newRegistration.getMap()
//   //   assert.deepEqual(newRegistration.getReg(getList, 'CA'), ['CA 123-456', 'CA 123-956']);
//   // });
//   // it('should be able to return registration number from StellenBosch', function () {
//   //   var newRegistration = registration();
//   //   newRegistration.setMap('CA 123-456');
//   //   newRegistration.setMap('CL 123-956');
//   //   newRegistration.setMap('CL 123-456');
//   //   newRegistration.setMap('CJ 123-456');
//   //   newRegistration.setMap('CAW 123-456');
//   //   var getList = newRegistration.getMap()
//   //   assert.deepEqual(newRegistration.getReg(getList, 'CL'), ['CL 123-956', 'CL 123-456']);
//   // });
//   // it('should be able to return registration number from Paarl', function () {
//   //   var newRegistration = registration();
//   //   newRegistration.setMap('CA 123-456');
//   //   newRegistration.setMap('CA 123-956');
//   //   newRegistration.setMap('CL 123-456');
//   //   newRegistration.setMap('CJ 123-456');
//   //   newRegistration.setMap('CAW 123-456');
//   //   var getList = newRegistration.getMap()
//   //   assert.deepEqual(newRegistration.getReg(getList, 'CJ'), ['CJ 123-456']);
//   // });
//   // it('should be able to return registration number from George', function () {
//   //   var newRegistration = registration();
//   //   newRegistration.setMap('CA 123-456');
//   //   newRegistration.setMap('CA 123-956');
//   //   newRegistration.setMap('CL 123-456');
//   //   newRegistration.setMap('CJ 123-456');
//   //   newRegistration.setMap('CAW 123-456');
//   //   var getList = newRegistration.getMap()
//   //   assert.deepEqual(newRegistration.getReg(getList, 'CAW'), ['CAW 123-456']);
//   // });

//   // it('should be able to return all registration numbers from all towns', function () {
//   //   var newRegistration = registration();
//   //   newRegistration.setMap('CA 123-456');
//   //   newRegistration.setMap('CL 123-456');
//   //   newRegistration.setMap('CJ 123-456');
//   //   newRegistration.setMap('CAW 123-456');
//   //   //var getList = newRegistration.getMap()
//   //   assert.deepEqual(newRegistration.getMap('allTown'), ['CA 123-456', 'CL 123-456', 'CJ 123-456', 'CAW 123-456']);
//   // });
// });
const assert = require('assert');
const Registrations = require('../reg_number');
const pg = require("pg");
const Pool = pg.Pool;

//define a connection string to be able to connect to the database.
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/registration_numberDB';

const pool = new Pool({
    connectionString
});
let newRegistration = Registrations(pool);

describe('registration number widget', function () {

    // the Factory Function is called newGreet
    beforeEach(async () => {
        // clean the tables before each test run
        // await pool.query("delete from towns;");
        await pool.query("delete from registration_numbers;");

    });


    it('should be able to return all registration numbers inside the registrstion numbers table', async () => {
        await newRegistration.addRegistration('CA 123-345');
        await newRegistration.addRegistration('CJ 567-787');
        await newRegistration.addRegistration('CAW 983-785');
        await newRegistration.addRegistration('CY 689-462');
        assert.deepEqual(await newRegistration.getReg(), [{
                registration_plates: 'CA 123-345',
            },
            {
                registration_plates: 'CJ 567-787'
            },
            {
                registration_plates: 'CAW 983-785'
            },
            {
                registration_plates: 'CY 689-462'
            }
        ]);
    });
    it('should be able to return registration number from Cape Town', async function () {
     await newRegistration.addRegistration('CA 123-456');
     await newRegistration.addRegistration('CA 123-956');
     await newRegistration.addRegistration('CL 123-456');
     await newRegistration.addRegistration('CJ 123-456');
      assert.deepEqual(await newRegistration.filterRegistrations('CA'), [{town_code:'CA', registration_plates:'CA 123-456'}, {town_code:'CA', registration_plates:'CA 123-956'}]);
    });
    it('should be able to return registration number from StellenBosch', async function () {
     await newRegistration.addRegistration('CA 123-456');
     await newRegistration.addRegistration('CL 123-956');
     await newRegistration.addRegistration('CL 123-456');
     await newRegistration.addRegistration('CJ 123-456');
     await newRegistration.addRegistration('CAW 123-456');
      assert.deepEqual(await newRegistration.filterRegistrations('CL'), [{town_code:'CL', registration_plates:'CL 123-956'}, {town_code:'CL', registration_plates:'CL 123-456'}]);
    });
    it('should be able to return registration number from Paarl', async function () {
      await newRegistration.addRegistration('CA 123-456');
      await newRegistration.addRegistration('CA 123-956');
      await newRegistration.addRegistration('CL 123-456');
      await newRegistration.addRegistration('CJ 123-456');
      assert.deepEqual(await newRegistration.filterRegistrations('CJ'), [{town_code: 'CJ', registration_plates:'CJ 123-456'}]);
    });
    it('should be able to return registration number from George', async function () {
     await newRegistration.addRegistration('CA 123-456');
     await newRegistration.addRegistration('CA 123-956');
     await newRegistration.addRegistration('CL 123-456');
     await newRegistration.addRegistration('CJ 123-456');
     await newRegistration.addRegistration('CAW 123-456');
      assert.deepEqual(await newRegistration.filterRegistrations('CAW'), [{town_code: 'CAW', registration_plates:'CAW 123-456'}]);
    });

    it('should be able to return all registration numbers from all towns', async function () {
        await newRegistration.addRegistration('CA 123-456');
        await newRegistration.addRegistration('CL 123-456');
        await newRegistration.addRegistration('CJ 123-456');
        await newRegistration.addRegistration('CAW 123-456');
        assert.deepEqual(await newRegistration.getReg('allTown'), [{registration_plates:'CA 123-456'}, {registration_plates:'CL 123-456'}, {registration_plates:'CJ 123-456'}, {registration_plates:'CAW 123-456'}]);
    });
});
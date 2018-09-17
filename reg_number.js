module.exports = function (pool) {
    //define a function call setReg with one parameter
    let addRegistration = async (regNumbers) => {
        let getCodes = await townCodes();
        let registrations = regNumbers.substr(0, 3).trim();
        if (regNumbers !== '') {
            //loop through tags and check if it regnumber coming in starts with tag
            for (let i = 0; i < getCodes.length; i++) {
                const element = getCodes[i].town_code;
                //console.log(element);
                if (regNumbers.startsWith(element)) {
                    //Check if registration alread exists
                    let checkReg = await pool.query('select registration_plates from registration_numbers where registration_plates = $1', [regNumbers]);
                    if (checkReg.rowCount === 0) {
                        let regId = await getTownId(registrations);
                        await pool.query('insert into registration_numbers(registration_plates, towns_id) values($1, $2)', [regNumbers, regId.id]);
                    }
                    // break;
                }
            }
        }
    }
    //define a function to get townId
    let getTownId = async (id) => {
        let townId = await pool.query('select id from towns where town_code = $1', [id]);
        return townId.rows[0];
    }
    //define a function to get town codes/tags
    let townCodes = async function () {
        let townCode = await pool.query('select town_code from towns');
        return townCode.rows;
    }
    //define a query to get all towns on load
    let getReg = async () => {
        let selectReg = await pool.query('select registration_plates from registration_numbers');
        return selectReg.rows;
    }

    //define a function to filter by towns
    let filterRegistrations = async (towns) => {
        if (towns === 'AllTown') {
            return getReg();
        } else {
            let returnReg = await pool.query('SELECT towns.town_code, registration_numbers.registration_plates FROM registration_numbers INNER JOIN towns on registration_numbers.towns_id = towns.id WHERE town_code = $1', [towns]);
            return returnReg.rows;
        }
    }
    return {
        addRegistration,
        getTownId,
        townCodes,
        getReg,
        filterRegistrations
    }
}
module.exports = function (pool) {
    //define a function call setReg with one parameter
    let addRegistration = async (regNumbers) => {
        if (regNumbers !== '') {
            let registrations = regNumbers;
            //Define a query to get town codes
            let checkCodes = await pool.query('select town_code from towns where town_code= $1', [registrations]);
            //define a query to get town ID and compare with town_codes
            let townId = await pool.query('select id from towns where town_code = $1',[checkCodes]);
            if (registrations.rowCount === 0) {
                // checkCodes.filter( async function(getTowns){
                    // if(registrations.startsWith(getTowns.rowCount)){
                        await pool.query('insert into registration_numbers(registatation_plates, towns_id) values($1, $2)', [registrations, townId]);
                    }
                // });
                return registrations;
            // }
        }
    }

    return {
        addRegistration
    }
}
module.exports = function (pool) {
    //define a function call setReg with one parameter
    let setReg = async (regNumbers) => {
        //create regEx for numbers
        // let regEx = /^[a-zA-Z]{2,3}(\s)[0-9]{3}(\-)[0-9]{3}$/;
        if (regNumbers !== '') {
            let registrations = await pool.query('select * from towns where town_code = $1', [regNumbers]);
            //define a variable to check if entered registrations fall within our registration scope
            let check = await pool.query('select town-code from towns');
            if (registrations.rowCount === 0) {
                if (gistrations.startsWith(check.rows(0))) {
                    await pool.query('insert into registration_numbers(registration_plates, towns_id) values($1, %2)', [registrations, check]);
                }
                //check if registrations is true within the scope then insert into registation_number table
            }
        }
        return registrations;
    }
    return {
        setReg
    }
}
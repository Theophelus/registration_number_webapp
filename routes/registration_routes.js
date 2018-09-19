module.exports = (regNumber) => {

    let displayHome = async (req, res, next) => {
        try {
            let selectedTown = await regNumber.populateTowns()
            let display = await regNumber.getReg();
            res.render('home', {
                display,
                selectedTown
            });
        } catch (error) {
            console.log(next(error.stack));
        }
    }
    let addReg = async (req, res, next) => {
        try {
            let regex = /^[a-zA-Z]{2,3}(\s)[0-9]{3}(\-)[0-9]{3}$/;

            let enterReg = req.body.inputTxt;

            if (!enterReg && enterReg == '') {
                req.flash('error', 'Please Enter Registration Number');
                return res.redirect('/');
            }
            if (!enterReg.match(regex)) {
                req.flash('error', 'Please Enter The Correct Registration Number Format eg: CA 123-456');
                return res.redirect('/');
            } else {
                if (enterReg.match(regex) !== undefined && await regNumber.townCodes(enterReg)) {
                    let getR = await regNumber.addRegistration(enterReg)
                    console.log(getR);
                    if (getR === 'successfull') {
                        req.flash('success', 'Registration Added successfully..!');
                        res.redirect('/')
                    } else {
                        req.flash('error', 'Registration Number should starts with: CA, CL, CJ and CAW Or Registration Number Already Exists..!');
                        res.redirect('/')
                    }
                }
            }
        } catch (error) {
            console.log(next(error.stack));
        }
    }

    let filterReg = async (req, res, next) => {
        try {
            getTown = req.body.townNames;
            let selectedTown = await regNumber.populateTowns(getTown);
            let display = await regNumber.filterRegistrations(getTown);
            selectedTown = selectedTown.map((element) => {
                if (element.town_code === getTown) {
                    element['selected'] = 'selected';
                }
                return element;
            });
            res.render('home', {
                display,
                selectedTown
            });
        } catch (error) {
            next(error.stack);
        }
    }
    let deleted = async (req, res, next) => {
        try {
            if (await regNumber.getReg() == '') {
                req.flash('error', 'Registration Numbers Empty..!');
                return res.redirect('/');
            } else {
                await regNumber.deleteRegistrations()
                req.flash('success', 'All Registrayions Have Been Deleted Successfull...!');
                res.redirect('/');
            }

        } catch (error) {
            console.log(next(error.stack));
        }
    }
    return {
        addReg,
        filterReg,
        deleted,
        displayHome
    }
}
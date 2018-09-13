// 1) define a function call setRegistrations that that take in one parameter call 

// 2) define a functiuon to check if registration 
        // - write a query to get check the if entered registration falls within our scoped
                // - query: (select town_code from towns);
        // - write a query to get the id of Town: 
                // - query: (select * from towns where id = $1, []);
        // - define a variable to check if registration number fall within our scope.
        // - check if registration corresponds with regex.
        // - then if that condition is true, if true add that registration
        // - else false display a message registreation already exists
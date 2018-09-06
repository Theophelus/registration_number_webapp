//Application logic for Registration NUMBER
var registration = function(initialValue){
  //Declare three variables map, registrationNUmber,
  var registrationMap = {};
  var registrationNumber = '';
  if(initialValue){
    registrationMap = initialValue;
  }
  //Create a function to map all the registration numbers
    var setMap = function(numbers){
      if(numbers !==''){
        registrationNumber = numbers;
        var regList = ['CA', 'CJ', 'CAW', 'CL'];
        //Check if the map is empty, if empty and REGISTRATION NUMBER
        if(registrationMap[registrationNumber]=== undefined){
          for(var i=0; i< regList.length; i++){
            if(registrationNumber.startsWith(regList[i])){
              registrationMap[registrationNumber] = 0;
              for(let key in registrationMap){
                var reg = key;
              }
              return reg;
            }
          }

      }
      }
      //return false;
    }
    /*
    // TODO: create a function call filter that must take in parameters called town.
    // TODO: parameter names  town,
    // TODO: add conditions to check for all getTowns
    // TODO: loop through the list and check,
    */
    var getReg = function(registrations, town) {
      var storedRegistration = [];
      if(town === 'allTown'){
        return registrations;
        console.log(registrations);
      }
        for(var i=0; i< registrations.length; i++){
          var listReg = registrations[i];
          if(listReg.startsWith(town)){
            storedRegistration.push(listReg);
          }
      }
    return storedRegistration;
    console.log(filter(storedRegistration));
    }

    var map = function(){
      return registrationMap;
    }
    console.log(registrationMap);

    var getMap = function(){
      return Object.keys(registrationMap);
    }
    var resetData = function (){
    return registrationMap = {}
  }
    console.log(getMap());
    return{
      setMap,
      getMap,
      getReg,
      resetData,
      map
    }
}

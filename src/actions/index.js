import Parse from 'parse';

export const authInputChange = ({field, value}) => {
    return {
        type: 'AUTH_INPUT_CHANGE',
        payload: {field, value}
    }
}

export const login = ({ email, password}) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING'});
        Parse.User.logIn(email, password)
            .then(user => {
                dispatch({type: 'LOGIN_SUCCESS', payload: user});
            })
            .catch(function(error) {
                dispatch({type: 'LOGIN_FAILURE'});
            });
    }
}

export const getPassengerProfile = () => {
    const currentUser = Parse.User.current();
    const currentUserId = currentUser._getId()
    
    const Passenger = Parse.Object.extend('Passenger');
    const query = new Parse.Query(Passenger);
    query.equalTo("pid", currentUserId);

    return (dispatch) => {
        query.first().then(response => {
            dispatch ({
                type: 'GET_PASSENGER_PROFILE',
                payload: response
            }); 
            console.log("passenger");
            console.log(response);     
        });
    };
}

export const getOutBoundTrains = () => {
    const OutboundTrain = Parse.Object.extend('OutboundTrain');
    const query = new Parse.Query(OutboundTrain);

    return (dispatch) => {
        query.find().then(response => {
            dispatch ({
                type: 'GET_OUTBOUND_TRAINS',
                payload: response
            });
        });
    };
}

export const getInboundTrains = () => {
    const InboundTrain = Parse.Object.extend('InboundTrain');
    const query = new Parse.Query(InboundTrain);
    // query.equalTo("stationTo", destination);
    // console.log('destination: ' + destination);

    return (dispatch) => {
        query.find().then(response => {
            dispatch ({
                type: 'GET_INBOUND_TRAINS',
                payload: response
            });
        });
    };
}

// export const baseLocationInputChange = ({field, value}) => {
//     return {
//         type: 'BASE_LOCATION_INPUT_CHANGE',
//         payload: {field, value}
//     }
// }

// export const outboundTrainTimeInputChange = ({field, value}) => {
//     return {
//         type: 'OUTBOUND_TRAIN_TIME_INPUT_CHANGE',
//         payload: {field, value}
//     }
// }

export const saveSettings = (passenger, train) => {
    const Passenger = Parse.Object.extend('Passenger');
    const query = new Parse.Query(Passenger);
    console.log('...DISPATCH');
    return (dispatch) => {
        console.log('DISPATCH');
        query.get(passenger.objectId).then((passengerToUpdate) => {
            passengerToUpdate.set('baseLocation', train.baseLocation);
            passengerToUpdate.set('outboundStation', train.stationFrom);
            passengerToUpdate.set('outboundTrainTime', train.departureTime);          
            console.log('Saving...');
            passengerToUpdate.save().then((response) => {
               dispatch({
                   type: 'SETTINGS_SAVE_SUCCESS',
                   payload: response
                });
            })
        .catch(function(error) {
                dispatch({type: 'SETTINGS_SAVE_FAILURE'});
            });
            
        })
    }
}

export const setInboundTrain = (inboundTrainId, passengerId) => {
    const PassengersOnTrain = Parse.Object.extend('PassengersOnTrain');
    const myNewObject = new PassengersOnTrain();
    
    myNewObject.set('inboundTrainId', inboundTrainId);
    myNewObject.set('passengerId', passengerId);

    return (dispatch) => {
        myNewObject.save().then((response) => {
            dispatch({
                type: 'SET_INBOUND_TRAIN',
                payload: response
            })
            console.log('SET_INBOUND_TRAIN');
            console.log(response);
        })
    }
}


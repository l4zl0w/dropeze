const initialState = {
    passenger: {},
    baseLocation: '',
    outboundTrains: [],
    outboundTrainTime: '',
    saving: false,
    error: '',
    inboundTrains: [],
    inboundTrain: ''
};

export default(state = initialState, action) => {
    switch(action.type) {
        case 'GET_PASSENGER_PROFILE':
            const k = JSON.parse(JSON.stringify(action.payload));
            return { ...state, passenger: k};
        
        case 'GET_OUTBOUND_TRAINS':
            return { ...state, outboundTrains: action.payload };

        // case 'OUTBOUND_TRAIN_INPUT_CHANGE':
        //     return { ...state, outboundTrainTime: action.payload };

        case 'SETTINGS_SAVE_SUCCESS':
            console.log('reducer');            
            const j = JSON.parse(JSON.stringify(action.payload));
            console.log(j);
            return { ...state, passenger: j};

        // case 'SAVING':
        //     return { ...state, saving: true };

        case 'SETTINGS_SAVE_FAILURE':
            console.log('error!');
            return { ...state, error: 'Authentication Failed', loading: false, baseLocation: '', outboundTrainTime: '' };

        case 'GET_INBOUND_TRAINS':
            console.log('GET_INBOUND_TRAINS');
            console.log(action.payload);
            return { ...state, inboundTrains: action.payload};

        case 'SET_INBOUND_TRAIN':
            const a = JSON.parse(JSON.stringify(action.payload));
            console.log(a.inboundTrainId);
            return { ...state, inboundTrain: a.inboundTrainId};

        default: 
            return state;
    }
}
const initialState = {
    currentUser:''
}


const reducer =(state=initialState, action) =>{
    switch(action.type){
        case "GETUSER":
        return{...state, currentUser: action.value}
    }
    

}


export default reducer
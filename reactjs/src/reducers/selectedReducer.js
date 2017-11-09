const selectedReducer= (state={slid:{},dragged_elt:{}},action) => {
	console.log(action);
	switch (action.type) {
		case 'UPDATE_SELECTED_SLID':
			const newState4={slid:action.obj};
			return newState4;
		case 'UPDATE_SLID':
			const newState5={slid:action.obj};
			return newState5;
		case 'UPDATE_CONTENT':
			console.log(state.slid);
			const newState6={slid:state.slid,dragged_elt:{id:action.obj}};
			console.log(newState6);
			return newState6;
		default:
			return state;
		}
	}
export default selectedReducer;
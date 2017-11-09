// var Tools = require('../services/Tools.js');

const updateModelReducer= (state={presentation:{},content_map:{}, updatepre:false},action) => {
	console.log(action);

	switch (action.type) {
		case 'UPDATE_PRESENTATION':
			// let slidArray=[]
			// for(var i=0; i<action.obj.slidArray.length;i++){
			// 	var newObj = {id:JSON.parse(JSON.stringify(action.obj.slidArray[i].id)),
		 //            title:JSON.parse(JSON.stringify(action.obj.slidArray[i].title)),
		 //            txt:JSON.parse(JSON.stringify(action.obj.slidArray[i].txt)),
		 //            content_id:JSON.parse(JSON.stringify(action.obj.slidArray[i].content_id))}
			// 	slidArray.push(newObj);
			// }
			// var pres_current = {
			// 	id:JSON.parse(JSON.stringify(action.obj.id)),
			// 	description:JSON.parse(JSON.stringify(action.obj.description)),
			// 	slidArray:slidArray

			// }
		// let pres_current=JSON.parse(JSON.stringify(action.obj));
		// pres_current.slidArray=slidArray;
			const newState1={presentation:action.obj,content_map:state.content_map,updatepre:true};
		return newState1;
		// return;
		//TO DO
		case 'UPDATE_PRESENTATION_SLIDS':
			let newSlidArray=[]
			// for(var i=0; i<state.presentation.slidArray.length;i++){

			for(var i=0;i<Object.keys(state.presentation.slidArray).length;i++){
        		var key = Object.keys(state.presentation.slidArray)[i];
				if (state.presentation.slidArray[key].id === action.obj.id){
					var newObj = {id:action.obj.id,
			            title:action.obj.title,
			            txt:action.obj.txt,
			            content_id:action.obj.content_id}
					newSlidArray.push(newObj);
				
				}else{
					newSlidArray.push(state.presentation.slidArray[key]);
				}
			}
			var pres_current = {
				id:state.presentation.id,
				description:state.presentation.description,
				slidArray:newSlidArray

			}

			const newState3={presentation:pres_current,content_map:state.content_map,updatepre:true};
		return newState3;
		// return;
		//TO DO
		case 'UPDATE_CONTENT_MAP':
			const newState2={presentation:state.presentation,content_map:action.obj,updatepre:state.updatepre};
		return newState2;
		//TO DO
		case 'ADD_CONTENT':
			let newContentMap = []

			for (var i = 0; i < Object.keys(state.content_map).length; i++) {
				var key = Object.keys(state.content_map)[i];
				newContentMap.push(state.content_map[key]);
				console.log(key);
			}

			console.log(action.obj);
			let content = {
				id : i,
				title: action.obj.title,
				type: action.obj.type,
				src: action.obj.src
			}


			newContentMap.push(content);
			console.log(newContentMap);

			const newState4 = { presentation: state.presentation, content_map: newContentMap, updatepre: state.updatepre };

		return newState4;

		//TO DO
		default:
		return state;
	}
}
export default updateModelReducer;
export const setSelectedSlid=(slid_obj)=>{
	return {
		type: 'UPDATE_SELECTED_SLID',
		obj:slid_obj
	};
}

export const updateContentMap=(content_map_obj)=>{
	return {
		type: 'UPDATE_CONTENT_MAP',
		obj:content_map_obj
	};
}

export const addContent = (content_obj) => {
	return {
		type: 'ADD_CONTENT',
		obj: content_obj
	};
}

export const updatePres=(pres_obj)=>{
	return {
		type: 'UPDATE_PRESENTATION',
		obj:pres_obj
	};
}

export const updateSlid=(pres_obj)=>{
	return {
		// type: 'UPDATE_PRESENTATION_SLIDS',
		type: 'UPDATE_SLID',
		obj:pres_obj
	};
}

export const updatePresSlids=(pres_obj)=>{
	return {
		type: 'UPDATE_PRESENTATION_SLIDS',
		obj:pres_obj
	};
}

export const updateDraggedElt=(pres_obj)=>{
	console.log("action run");
	console.log(pres_obj);
	
	return {
		type: 'UPDATE_CONTENT',
		obj:pres_obj
	};
}

const objToFormData = (ob) => {
	let data = new FormData();

	Object.keys(ob).forEach(key => {
		data.append(key, ob[key]);
	});
	
	return data;
};

export default objToFormData;
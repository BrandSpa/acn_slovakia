
export function maxLength(val, length) {
	return val.substring(0, length);
}

export function onlyNum(val) {
	return val.replace(/[^0-9]+/, '');
}


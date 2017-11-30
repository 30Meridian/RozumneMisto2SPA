
export const checkJsonResponse = response => {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	if (response.status === 204) {
		return null;
	} else {
		return response.json();
	}
}

export const logErrorConsole = e => {
  console.log(e);
}

export const generateAuthorizationHeader = (getState) => {
	const token = getState().auth.get('token');
	let headers = {};
	if (token) {
		headers = {
      "Authorization": `Token ${token}`
    };
	}
	return headers;
};

export const generateAuthorizationOption = (getState) => {
	let options = {
		'headers': {...generateAuthorizationHeader(getState)}
	};
	return options;
}

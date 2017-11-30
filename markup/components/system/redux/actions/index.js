import { Map, List, fromJS } from 'immutable';
import { browserHistory } from 'react-router';
import history from '../../../history';
import config from '../../../config';
import actions from '../constants';

import { loadUser } from '../../../common/redux/actions/auth';


export const changeCommunitiesIsLoading = (data) => ({
  type: actions.SYSTEM_CHANGE_COMMUNITITES_IS_LOADING,
  data
});

export const fetchCommunities = () => (dispatch) => {
  dispatch(changeCommunitiesIsLoading(true));
  fetch(`${config.apiHost}/community/`)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((json) => {
    const data = json['results'].map(item => new Map(item));
    dispatch({
      type: actions.LOAD_COMMUNITIES,
      data
    });
  })
  .catch(e => console.log(e))
  .then(() => {
    dispatch(changeCommunitiesIsLoading(false));
  });
};

export const redirectToCommunity = (id) => (dispatch) => {
  fetch(`${config.apiHost}/community/${id}/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return console.log('error');
    }
  })
  .then((json) => {
    const data = new Map(json);
    dispatch({
      type: actions.LOAD_COMMUNITY,
      data
    });
    history.push(`/${json.slug}/`);
  })
  .catch((e) => {
    //error
  });
};

export const fetchCommunityBySlug = (slug) => (dispatch) =>  {
  fetch(`${config.apiHost}/community/natural/${slug}/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return console.log('error');
    }
  })
  .then((json) => {
    const data = new Map(json);
    dispatch({
      type: actions.LOAD_COMMUNITY,
      data
    });
    json['community_menu'] && dispatch(fetchCommunityDynamicMenu(json['community_menu']));
    json['office_menu'] && dispatch(fetchCommunityOfficeDynamicMenu(json['office_menu']));
  })
  .catch((e) => {
    //error
  });
};

export const fetchDonors = (slug) => (dispatch) => {
  dispatch(moduleIsLoading(true));
  fetch(`${config.apiHost}/donor/${slug}/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return console.log('error');
    }
  })
  .then((json) => {
    dispatch(moduleIsLoading(false));
    let items = JSON.parse(json);
    const data = items.value.map(item => new Map(item));
    dispatch({
      type: actions.LOAD_DONORS,
      data
    });
  });
};

export const fetchBudgetValue = (slug) => (dispatch) =>  {
  fetch(`${config.apiHost}/externalmodules/${slug}/budget/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return console.log('error');
    }
  })
  .then((json) => {

    const data = json.request_argument;
    dispatch({
      type: actions.LOAD_VALUE,
      data
    });
  })
  .catch((e) => {
    //error
  });
};

export const fetchQueueValue = (slug) => (dispatch) =>  {
  fetch(`${config.apiHost}/externalmodules/${slug}/flats/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return console.log('error');
    }
  })
  .then((json) => {
    const data = json.request_argument;
    dispatch({
      type: actions.LOAD_QUEUE,
      data
    });
  })
  .catch((e) => {
    //error
  });
};

export const loadDrugList = (slug) => (dispatch) =>  {
  fetch(`${config.apiHost}/externalmodules/${slug}/medicines/`)
  .then((response) => {
    if (!response.ok){
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((json) => {
    const data = json.request_argument;
    dispatch({
      type: actions.LOAD_DRUGS_LIST,
      data
    });
  })
  .catch((e) => console.log(e));
};

export const fetchTenders = (slug, offset=0, limit=25) => (dispatch) => {
  dispatch(moduleIsLoading(true));
  dispatch({
    type: actions.LOAD_TENDERS,
    data: undefined,
  });
  fetch(`${config.apiHost}/etendering/${slug}/?offset=${offset}&limit=${limit}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return console.log('error');
    }
  })
  .then((json) => {
    dispatch(moduleIsLoading(false));
    if (json.error) {
      dispatch({
        type: actions.LOAD_TENDERS,
        data: null,
      });
    } else {
      let items = JSON.parse(json);
      const data = items.result;
      dispatch({
        type: actions.LOAD_TENDERS,
        data
      });
    }
  });
};

export const loadDepartments = () => (dispatch) => {
  fetch(`${config.apiHost}/department/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then((json) => {
    const data = json.map(item => new Map({
      id: item.id,
      code: item.code_department,
      value: item.name_department,
      parent: item.parent
    }));
    dispatch({
      type: actions.LOAD_DEPARTMENTS,
      data
    })
  });
};

export const changeInvestDepartment = (data) => ({
  type: actions.INVEST_CHANGE_DEPARTMENT,
  data
});

export const changeInvestName = (data) => ({
  type: actions.INVEST_CHANGE_NAME,
  data
});

export const changeInvestDescrtiption = (data) => ({
  type: actions.INVEST_CHANGE_DESCRIPTION,
  data
});

export const changeInvestPrice = (data) => ({
  type: actions.INVEST_CHANGE_PRICE,
  data
});

export const changeInvestAddress = (data) => ({
  type: actions.INVEST_CHANGE_ADDRESS,
  data
});

export const changeInvestMetrics = (data) => ({
  type: actions.INVEST_CHANGE_METRICS,
  data
});

export const changeInvestContacts = (data) => ({
  type: actions.INVEST_CHANGE_CONTACTS,
  data
});

export const changeInvestInvest = (data) => ({
  type: actions.INVEST_CHANGE_INVEST,
  data
});

export const changeInvestBuilding = (data) => ({
  type: actions.INVEST_CHANGE_BUILDING,
  data
});

export const changeInvestImage = (data) => (dispatch) => {
  const file = data.files[0];

  dispatch({
    type: actions.INVEST_CHANGE_IMAGE,
    data: file,
  });
};

export const changeInvestDocument = (data) => (dispatch) => {
  const file = data.files[0];

  dispatch({
    type: actions.INVEST_CHANGE_DOCUMENT,
    data: file,
  });
};

export const changeInvestMapValue = (data) => ({
  type: actions.INVEST_CHANGE_MAP_VALUE,
  data
});



export const changeInvestMap = (latlng) => {
  const data = new Map(latlng);
  return ({
    type: actions.INVEST_CHANGE_MAP,
    data
  })
};

export const changeInvestMapMarker = (latlng) => {
  const data = [new Map(latlng)];
  return ({
    type: actions.INVEST_CHANGE_MAP_MARKER,
    data
  })
};

export const clearInvestShape = () => {
  const data = new Map();
  return ({
    type: actions.INVEST_CLEAR_SHAPE,
    data
  })
};

export const submitInvest = () => (dispatch, getState) => {
  const formData = new FormData();
  formData.append('department', getState().invest.get('department'));
  formData.append('name', getState().invest.get('name'));
  formData.append('description', getState().invest.get('description'));
  formData.append('price', getState().invest.get('price'));
  formData.append('address', getState().invest.get('address'));
  formData.append('metrics', getState().invest.get('metrics'));
  formData.append('contacts', getState().invest.get('contacts'));
  formData.append('project_type', getState().invest.get('project_type'));
  formData.append('object_type', getState().invest.get('object_type'));
  if (getState().invest.get('map').size > 0) {
    formData.append('map_points', JSON.stringify(getState().invest.get('map').map((item) =>
      ({
        map_lat: item.get('lat'),
        map_lon: item.get('lng')
      })).valueSeq().toArray())
    );
  } else {

  formData.append('map_points', JSON.stringify(getState().invest.get('marker').map((item) =>
  ({
   map_lat: item.get('lat'),
   map_lon: item.get('lng')
 }))
));
}
  if (getState().invest.get('image'))
    formData.append('image', getState().invest.get('image'));
  if (getState().invest.get('document'))
    formData.append('document', getState().invest.get('document'));
  const options = {
    method:"post",
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: formData
  };
  const url = `${config.apiHost}/investmentmap/`;
  fetch(url, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return console.log('error');
      }
  })
  .then((json) => {

  })
  .catch((e) => {
    console.log(e);
  });
};

export const getInvest = (data) => ({
	type: actions.LOAD_INVESTMENTS,
	data
});

export const getInvestList = (data) => ({
  type: actions.LOAD_INVESTMENTS_LIST,
  data
});

export const loadInvests = () => (dispatch) => {
  fetch(`${config.apiHost}/investmentmap/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return console.log('error');
    }
  })
  .then((json) => {
    dispatch(getInvest(fromJS(json)))
  });
};

export const loadInvestsList = (limit, offset) => (dispatch) => {
  dispatch(moduleIsLoading(true));
  fetch(`${config.apiHost}/investmentmap/?limit=${limit}&offset=${offset}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return console.log('error');
    }
  })
  .then((json) => {
    dispatch(moduleIsLoading(false));
    dispatch(getInvestList(fromJS(json)))
  });
};



export const loadInvestDetail = (id) => (dispatch, getState) => {
  fetch(`${config.apiHost}/investmentmap/${id}/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return console.log(error);
    }
  })
  .then((json) => {
    const data = json;
    dispatch({
      type: actions.INVEST_LOAD_DETAIL,
      data
    });
  });
};

export const loadWeather = () => (dispatch) => {
  fetch('http://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=b1b15e88fa797225412429c1c50c122a1')
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('error')
    }
  })
  .then((json) => {
    const data = json;
    dispatch({
      type: actions.LOAD_WEATHER,
      data
    })
  });
};

export const moduleIsLoading = (data) => ({
  type: actions.MODULE_IS_LOADING,
  data
});

export const changeStartDate = (data) => ({
  type: actions.LOAD_START_DATE,
  data
});

export const changeEndDate = (data) => ({
  type: actions.LOAD_END_DATE,
  data
});

export const fetchFinanceInfo = (slug,  limit=15, offset=0) => (dispatch, getState) => {
  dispatch(moduleIsLoading(true));
  const sdate = getState().system.get('startdate');
  const edate = getState().system.get('enddate');
  const startdate = ('0' + (sdate.date() + 1)).slice(-2) + "-" + ('0' + (sdate.month()+1)).slice(-2) + "-" + sdate.year();
  const enddate = ('0' + (edate.date() + 1)).slice(-2) + "-" + ('0' + (edate.month()+1)).slice(-2) + "-" + edate.year();
  const sortedBy = getState().system.get('sortedBy');
  const reversed = getState().system.get('reverseFinanceList');

  const options = {
      method: 'post',
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({
      startdate,
      enddate,

      sortedBy,
      reversed,
    })
  }
  fetch(`${config.apiHost}/publicfinance/edata/${slug}/?limit=${limit}&offset=${offset}`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("error");
    }
  })
  .then((json) => {
    dispatch(moduleIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_FINANCE_INFO,
      data
    });
  });
};

export const loadPayerCodeEdr = (data) => ({
  type: actions.LOAD_PAYER_CODE_EDRPOU,
  data
});

export const loadRecipientName = (data) => ({
    type: actions.LOAD_RECIPIENT_NAME,
    data
});

export const loadRecipientCodeEdr = (data) => ({
  type: actions.LOAD_RECIPIENT_CODE_EDRPOU,
  data
});

export const fetchFinanceRecipient = (slug, limit=15, offset=0) => (dispatch, getState) => {
  dispatch(moduleIsLoading(true));
  const sdate = getState().system.get('startdate');
  const edate = getState().system.get('enddate');
  const startdate = ('0' + (sdate.date() + 1)).slice(-2) + "-" + ('0' + (sdate.month()+1)).slice(-2) + "-" + sdate.year();
  const enddate = ('0' + (edate.date() + 1)).slice(-2) + "-" + ('0' + (edate.month()+1)).slice(-2) + "-" + edate.year();

  const recipientCodeEdr = getState().system.get('recipientCodeEdr');
  const recipientName = getState().system.get('recipientName');

  const sortedBy = getState().system.get('sortedBy');
  const reversed = getState().system.get('reverseFinanceList');

  const options = {
    method: 'post',
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({
      startdate,
      enddate,

      recipientCodeEdr,
      recipientName,

      sortedBy,
      reversed,
    })
  }
  fetch(`${config.apiHost}/publicfinance/edata/${slug}/recipient/?limit=${limit}&offset=${offset}`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("error");
    }
  })
  .then((json) => {
    dispatch(moduleIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_FINANCE_INFO,
      data
    });
  });
};

export const fetchFinancePayer = (slug, limit=15, offset=0) => (dispatch, getState) => {
  dispatch(moduleIsLoading(true));
  const sdate = getState().system.get('startdate');
  const edate = getState().system.get('enddate');
  const startdate = ('0' + (sdate.date() + 1)).slice(-2) + "-" + ('0' + (sdate.month()+1)).slice(-2) + "-" + sdate.year();
  const enddate = ('0' + (edate.date() + 1)).slice(-2) + "-" + ('0' + (edate.month()+1)).slice(-2) + "-" + edate.year();
  const sortedBy = getState().system.get('sortedBy');
  const reversed = getState().system.get('reverseFinanceList');

  const payerCodeEdr = getState().system.get('payerCodeEdr');
  const options = {
    method: 'post',
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({
      startdate,
      enddate,

      payerCodeEdr,

      sortedBy,
      reversed,
    })
  }
  fetch(`${config.apiHost}/publicfinance/edata/${slug}/payer/?limit=${limit}&offset=${offset}`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("error");
    }
  })
  .then((json) => {
    dispatch(moduleIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_FINANCE_INFO,
      data
    });
  });
};

export const sortFinanceBy = (data) => ({
  type: actions.SORT_FINANCE_BY,
  data
});

export const reverseFinanceList = (data) => ({
  type: actions.REVERSE_FINANCE_LIST,
  data
});

export const cabinetDocumentsIsLoading = (data) => ({
  type: actions.CABINET_DOCUMENTS_IS_LOADING,
  data
});


const fetchDocument = (url, dispatch, getState) => {
  dispatch(cabinetDocumentsIsLoading(true));
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(url, options)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log(response.status)
    }
  })
  .then(json => {
    dispatch(cabinetDocumentsIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_DOCUMENTS,
      data
    });
  })
  .catch(e => console.log(e));
};


export const fetchCabinetDocuments = (limit=25, offset=0) => (dispatch, getState) => {
  fetchDocument(`${config.apiHost}/documents/cabinetdocuments/?limit=${limit}&offset=${offset}`, dispatch, getState);
}

export const loadAvailableServices = () => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token "+getState().auth.get('token')
    },
  };
  fetch(`${config.apiHost}/workflowtypes/organisation/`, options)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("Response status " + response.status);
    }
  })
  .then(json => {
    const data = json['results'].map(item => new Map(item));
    dispatch({
      type: actions.LOAD_SERVICES,
      data
    });
  })
  .catch(e => console.log(e));
};

export const servicesIsLoading = (data) => ({
  type: actions.SERVICES_IS_LOADING,
  data
})

export const loadPublicServices = (slug='', limit=25, offset=0) => (dispatch, getState) => {
  dispatch(servicesIsLoading(true));
  fetch(`${config.apiHost}/workflowtypes/community/${slug}/?limit=${limit}&offset=${offset}`)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("Response status " + response.status);
    }
  })
  .then(json => {
    dispatch(servicesIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_SERVICES,
      data
    });
  })
  .catch(e => console.log(e));
};

export const changeSearchValue = (data) => ({
  type: actions.CHANGE_SEARCH_VALUE,
  data
});

export const searchIsLoading = (data) => ({
  type: actions.SEARCH_IS_LOADING,
  data
})

export const searchDocuments = (slug, limit=10, offset=0, page) => (dispatch, getState) => {
  dispatch(searchIsLoading(true));
  const query = getState().system.get('query');
  const community = slug;
  const options = {
    method:"post",
    headers: {
      "Content-type": 'application/json',
      "Authorization": (getState().auth.get('token') ? ("Token " + getState().auth.get('token')) : "")
    },
    body: JSON.stringify({
      query,
      community
    })
  };
  fetch(`${config.apiHost}/search/?limit=${limit}&offset=${offset}`, options)
  .then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      console.log("Response status" + response.status);
    }
  })
  .then(json => {
    dispatch(searchIsLoading(false));
    const data = json;
    if (page == undefined) {
      history.push(`/${slug}/search-documents`);
    } else {
      history.push(`/${slug}/search-documents/${page}`);
    }

    dispatch({
      type: actions.LOAD_SEARCHED_DOCUMENTS,
      data
    });
  })
  .catch(e => console.log(e));
};



export const fetchDynamicMenu = (root_id) => {
  return fetch(`${config.apiHost}/dynamicmenu/full-menu/${root_id}/`)
  .then(response => {
    if (response.status == 200){
      return response.json();
    } else {
      console.log(response.status);
    }
  })
  .catch(e => console.log(e));
};

export const fetchCommunityDynamicMenu = (root_id) => (dispatch) => {
  fetchDynamicMenu(root_id)
  .then(json => {
    dispatch({
      type: actions.LOAD_COMMUNITY_MENU,
      data: fromJS(json)
    });
  });
};

export const fetchCommunityOfficeDynamicMenu = (root_id) => (dispatch) => {
  fetchDynamicMenu(root_id)
  .then(json => {
    dispatch({
      type: actions.LOAD_COMMUNITY_OFFICE_MENU,
      data: fromJS(json)
    })
  });
};


export const changeMobileMenu = () => (dispatch, getState) => {

  const data = !getState().system.get('toggleMobile');

  dispatch({
    type: actions.CHANGE_MOBILE_MENU,
    data
  });
};

export const addBindedCommunity = (data) => ({
  type: actions.BINDED_COMMUNITY_ADD,
  data
})

export const removeBindedCommunity = (data) => ({
  type: actions.BINDED_COMMUNITY_REMOVE,
  data
})

export const saveBindedCommunity = () => (dispatch, getState) => {
  if (!getState().auth.get('user'))
    return

  const data = getState().system.get('binded_community').map(item => item['id']);
  const options = {
    method:"post",
    headers: {
      "Content-type": 'application/json',
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: JSON.stringify(data)
  };
  fetch(`${config.apiHost}/user-utils/bind_community/`, options)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(json => {
    dispatch(loadUser());
  })
  .catch(e => console.log(e));
}

export const changeCitySearchValue = (data) => ({
  type: actions.CHANGE_CITY_SEARCH_VALUE,
  data
});

export const changeCitySearchValueSubmit = (data) => ({
  type: actions.CHANGE_CITY_SEARCH_SUBMIT_VALUE,
  data
});

export const changeCitySearchValueMain = (data) => ({
  type: actions.CHANGE_CITY_SEARCH_MAIN_VALUE,
  data
});

export const clearCitySearchValue = () => ({
  type: actions.CLEAR_CITY_SEARCH_VALUE,
});

export const clearCitySearchValueSubmit = () => ({
  type: actions.CLEAR_CITY_SEARCH_VALUE_SUBMIT,
});

export const clearCitySearchValueMain = () => ({
  type: actions.CLEAR_CITY_SEARCH_VALUE_MAIN,
});

export const submitCitySearch = (slug) => (dispatch, getState) => {
  const query = getState().system.get('cityValue');
  const options = {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query
    })
  };
  fetch(`${config.apiHost}/community/search/`, options)
  .then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      console.log("Response status " + response.status);
    }
  })
  .then(json => {
    const data = json;
    dispatch({
      type: actions.LOAD_SEARCHED_CITIES,
      data
    });
  })
  .catch(e => console.log(e));
}


export const submitCitySearchSubmit = (slug) => (dispatch, getState) => {
  const query = getState().system.get('cityValueSubmit');
  const options = {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query
    })
  };
  fetch(`${config.apiHost}/community/search/`, options)
  .then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      console.log("Response status " + response.status);
    }
  })
  .then(json => {
    const data = json;
    dispatch({
      type: actions.LOAD_SEARCHED_CITIES,
      data
    });
  })
  .catch(e => console.log(e));
}


export const submitCitySearchMain = (slug) => (dispatch, getState) => {
  const query = getState().system.get('cityValueMain');
  const options = {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query
    })
  };
  fetch(`${config.apiHost}/community/search/`, options)
  .then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      console.log("Response status " + response.status);
    }
  })
  .then(json => {
    const data = json;
    dispatch({
      type: actions.LOAD_SEARCHED_CITIES,
      data
    });
  })
  .catch(e => console.log(e));
}

export const signChangeLastName = (data) => ({
  type: actions.SIGN_UP_CHANGE_LAST_NAME,
  data
});

export const signChangeFirstName = (data) => ({
  type: actions.SIGN_UP_CHANGE_FIRST_NAME,
  data
});

export const signChangePhone = (data) => ({
  type: actions.SIGN_UP_CHANGE_PHONE,
  data
});

export const signChangeMiddleName = (data) => ({
  type: actions.SIGN_UP_CHANGE_MIDDLE_NAME,
  data
});

export const loadSignDefaults = (user) => (dispatch) => {
  dispatch(signChangeLastName(user.get('last_name') || ''));
  dispatch(signChangeFirstName(user.get('first_name') || ''));
  dispatch(signChangeMiddleName(user.get('middle_name') || ''));
  dispatch(signChangePhone(user.get('phone') || ''));
}

export const submitSignUpRequiredField = () => (dispatch, getState) => {
  const data = {
    last_name: getState().system.get('signLastName'),
    first_name: getState().system.get('signFirstName'),
    middle_name: getState().system.get('signMiddleName'),
    phone: getState().system.get('signPhone')
  }
  const options = {
    method:"post",
    headers: {
      "Content-type": 'application/json',
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: JSON.stringify(data)
  };
  fetch(`${config.apiHost}/user-utils/sign-up/`, options)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  })
  .then(json => {
    dispatch(loadUser());
  })
  .catch(e => console.log(e));
};

export const loadUserProfileData = (id) => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token')
    },
  };
  fetch(`${config.apiHost}/user/${id}/`, options)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(json => {
    dispatch({
      type: actions.LOAD_PROFILE_DATA,
      data: new Map(json)
    });
  })
  .catch(e => console.log(e));
}

export const changeCommunity = (data) => ({
  type: actions.LOAD_COMMUNITY,
  data
});

export const changeHostLoading = (data) => ({
  type: actions.STANDALONE_HOST_IS_LOADING,
  data
});

export const changeHostEnable = (data) => ({
  type: actions.STANDALONE_HOST_CHANGE_ENABLE,
  data
});

export const checkStandaloneHost = (origin='') => (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({origin})
  }
  fetch(`${config.apiHost}/communityhost/origin/`, options)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(json => {
    if (json && json.status != 404) {
      dispatch(changeCommunity(fromJS(json)));
      dispatch(changeHostEnable(true));
    }

    dispatch(changeHostLoading(false));
  })
  .catch(e => console.log(e));
};

export const newsAreLoading = (data) => ({
  type: actions.NEWS_ARE_LOADING,
  data
});

export const loadLiveStream = (limit, offset) => (dispatch, getState) => {
  dispatch(newsAreLoading(true));
  fetch(`${config.apiHost}/documents/livestream/?limit=${limit}&offset=${offset}`)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((json) => {
    const data = json;
    dispatch(newsAreLoading(false));
    dispatch({
      type: actions.LOAD_LIVE_STREAM,
      data
    })
  })
  .catch(e => console.log(e));
};

export const unsubscribe = (id, email) => (dispatch, getState) => {
  const options = {
    method: "POST",
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      user: id,
      channel: "email",
      is_active: false
    })
  }
  console.log(options)
  fetch(`${config.apiHost}/channels/`, options)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((json) => {
    console.log("success");
  })
  .catch(e => console.log(e));
}

import { List, Map } from 'immutable';
import actions from '../../constants';


const defaultState = () => new Map({
  departments: new List([]),
  categories: new List([]),
  title: '',
  category: '',
  department: '',
  public: true,
  image_option: false,
  formBuilder: undefined,
});

export default (state=defaultState(), action) => {
  switch (action.type) {
    case actions.BUILDER_ONE_CLEAN_STORAGE:
      return defaultState();
    case actions.LOAD_CATEGORY:
      return state.set('categories', new List(action.data));
    case actions.LOAD_DEPARTMENT:
      return state.set('departments', action.data);
    case actions.BUILDER_ONE_CHANGE_TITLE:
      return state.set('title', action.data);
    case actions.BUILDER_ONE_CHANGE_CATEGORY:
      return state.set('category', action.data);
    case actions.BUILDER_ONE_CHANGE_DEPARTMENT:
      return state.set('department', action.data);
    case actions.BUILDER_ONE_CHANGE_PUBLIC:
      return state.set('public', action.data);
    case actions.BUILDER_ONE_CHANGE_IMAGE_OPTION:
      return state.set('image_option', action.data);
    case actions.BUILDER_ONE_GENERATE_BUILDER:
      return state.set('formBuilder', action.data);
    case actions.BUILDER_ONE_LOAD:
      return state.set('title', action.json['type']['title'])
                  .set('category', action.json['type']['category'])
                  .set('department', action.json['owner'])
                  .set('public', action.json['type']['public'])
                  .set('image_option', action.json['type']['image_option'])
    case actions.BUILDER_ONE_UPDATE_BUILDER:
      if (state.get('formBuilder')) {
        state.get('formBuilder').actions.setData(JSON.stringify(action.data));
        return state;
      }
      return state.set('formBuilder', {formData: JSON.stringify(action.data)});
    default:
      return state;
  }
}

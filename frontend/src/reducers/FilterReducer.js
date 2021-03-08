import { SET_ELEMENT_CATEGORY, SET_TASK_TYPE, CLICK_GO_BUTTON} from '../actions/actionTypes'

const initialState = {click_go_button: false};

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASK_TYPE:
            return {...state, task_type: action.payload};
        case SET_ELEMENT_CATEGORY:
            return {...state, element_category: action.payload};
        case CLICK_GO_BUTTON :
            return {...state, click_go_button: action.payload};
      default:
        return state;
    }
}
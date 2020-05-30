const ADD_CHECKBOX = 'ADD_CHECKBOX'
const CHECKED_POST = 'CHECKED_POST'
const DELETE_CHECKBOX = 'DELETE_CHECKBOX'
const UPDATE_HEADING = 'UPDATE_HEADING'

let initialState = {
    items : {
        id: 0,
        heading: 'Задания на сегодня',
        checkboxes: [
            {id: 0, message: 'Встать рано утром', active: false},
            {id: 1, message: 'Скушать вкусный завтрак', active: false},
            {id: 2, message: 'Провести тренировку', active: false},
            {id: 3, message: 'Поработать', active: false},
            {id: 4, message: 'Встретиться с друзьями', active: false}
        ]
    }
}

const todoReducer = (state= initialState, action) => {

    switch (action.type) {
        case ADD_CHECKBOX: {
            let newPost = {
                id: state.items.checkboxes.length, message: action.newCheckboxText, active: false
            }
            return {
                ...state,
                items : {
                    ...state.items,
                    checkboxes: [...state.items.checkboxes, newPost]
                }
            }
        }

        case CHECKED_POST: {
            return {
                ...state,
                items: {
                    ...state.items,
                    checkboxes: state.items.checkboxes.map(n => n.id === action.id
                        ? { ...n, active: !n.active }
                        : n
                    )
                }
            }
        }

        case DELETE_CHECKBOX: {
            return {
                ...state,
                items: {
                    ...state.items,
                    checkboxes: state.items.checkboxes.filter(n => n.id !== action.id)
                }
            }
        }

        case UPDATE_HEADING: {
            return {
                ...state,
                items: {
                    ...state.items,
                    heading: action.heading
                }
            }
        }

        default:
            return state
    }
}

export const addCheckBox = (newCheckboxText) => (dispatch) => dispatch({type: ADD_CHECKBOX, newCheckboxText})
export const checkedPost = (id) => (dispatch) => dispatch({type: CHECKED_POST, id})
export const deleteCheck = (id) => (dispatch) => dispatch({type: DELETE_CHECKBOX, id})
export const updateHeading = (heading) => (dispatch) => dispatch({type: UPDATE_HEADING, heading})


export default todoReducer
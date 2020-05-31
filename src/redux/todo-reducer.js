const ADD_CHECKBOX = 'ADD_CHECKBOX'
const CHECKED_POST = 'CHECKED_POST'
const DELETE_CHECKBOX = 'DELETE_CHECKBOX'
const UPDATE_HEADING = 'UPDATE_HEADING'

let initialState = {
    items: [
        {
            id: 0,
            heading: 'Задания на сегодня',
            checkboxes: [
                {id: 0, message: 'Встать рано утром', active: false},
                {id: 1, message: 'Скушать вкусный завтрак', active: false},
                {id: 2, message: 'Провести тренировку', active: false},
                {id: 3, message: 'Поработать', active: false},
                {id: 4, message: 'Встретиться с друзьями', active: false}
            ]
        },{
            id: 1,
            heading: 'Задания на завтра',
            checkboxes: [
                {id: 0, message: 'Встать рано утром', active: false},
                {id: 1, message: 'Скушать вкусный завтрак', active: false},
                {id: 2, message: 'Провести тренировку', active: false},
                {id: 3, message: 'Поработать', active: false},
                {id: 4, message: 'Встретиться с друзьями', active: false}
            ]
        }
    ]
}

const todoReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_CHECKBOX: {
            debugger
            return {
                ...state,
                items : state.items.map(n => n.id === action.payload.item
            ? {
                    ...n,
                    checkboxes: [n.checkboxes,
                        {
                            id: n.checkboxes.length, message: action.payload.newCheckboxText, active: false
                        }]
                }
            : n)
            }
        }

        case CHECKED_POST: {
            return {
                ...state,
                items: state.items.map(n => n.id === action.payload.item
                ? { ...n,
                        checkboxes: n.checkboxes.map(m => m.id === action.payload.id
                            ? { ...m, active: !m.active }
                            : m
                        )
                  }
                : n  )
            }
        }

        case DELETE_CHECKBOX: {
            return {
                ...state,
                items: state.items.map(n => n.id === action.payload.item
                    ? { ...n,
                        checkboxes: n.checkboxes.filter(n => n.id !== action.payload.id)
                    }
                    : n  )
            }
        }

        case UPDATE_HEADING: {
            return {
                ...state,
                items: state.items.map(n => n.id === action.payload.id
                    ? {...n, heading: action.payload.heading}
                    : n
                )
            }
        }

        default:
            return state
    }
}

export const addCheckBox = (item, newCheckboxText) => (dispatch) => dispatch({type: ADD_CHECKBOX, payload: {item, newCheckboxText}})
export const checkedPost = (item, id) => (dispatch) => dispatch({type: CHECKED_POST, payload: {item, id}})
export const deleteCheck = (item, id) => (dispatch) => dispatch({type: DELETE_CHECKBOX, payload: {item, id}})
export const updateHeading = (heading, id) => (dispatch) => dispatch({type: UPDATE_HEADING, payload: {heading, id}})


export default todoReducer
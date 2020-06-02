const ADD_CHECKBOX = 'ADD_CHECKBOX'
const CHECKED_POST = 'CHECKED_POST'
const DELETE_CHECKBOX = 'DELETE_CHECKBOX'
const UPDATE_HEADING = 'UPDATE_HEADING'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

let initialState = {
    items: [
        {
            id: 0,
            heading: 'New Item',
            checkboxes: []
        }
    ]
}

const todoReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_ITEM: {
            return {
                items: [...state.items,
                    { id: state.items.length, heading: 'New Item', checkboxes: [] }]
            }
        }

        case DELETE_ITEM: {
            return {
                items: state.items.filter(n => n.id !== action.id)
            }
        }

        case ADD_CHECKBOX: {
            return {
                items : state.items.map(n => n.id === action.payload.item
            ? {
                    ...n,
                    checkboxes: [...n.checkboxes,
                        {
                            id: n.checkboxes.length, message: action.payload.newCheckboxText, active: false
                        }]
                }
            : n)
            }
        }

        case CHECKED_POST: {
            return {
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
                items: state.items.map(n => n.id === action.payload.item
                    ? { ...n,
                        checkboxes: n.checkboxes.filter(n => n.id !== action.payload.id)
                    }
                    : n  )
            }
        }

        case UPDATE_HEADING: {
            return {
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
export const addItem = () => (dispatch) => dispatch({type: ADD_ITEM})
export const deleteItem = (id) => (dispatch) => dispatch({type: DELETE_ITEM, id})

export default todoReducer
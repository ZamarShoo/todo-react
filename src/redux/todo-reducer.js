const ADD_CHECKBOX = 'ADD_CHECKBOX';
const CHECKED_POST = 'CHECKED_POST';
const DELETE_CHECKBOX = 'DELETE_CHECKBOX';
const UPDATE_HEADING = 'UPDATE_HEADING';
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const CHANGE_COLOR = 'CHANGE_COLOR'

let initialState = {
    items: [
        {
            id: 0,
            heading: 'New Item',
            checkboxes: []
        }
    ],
    darkColor: false
};

const todoReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_ITEM: {
            return {
                ...state,
                items: [...state.items,
                    { id: state.items.length, heading: 'New Item', checkboxes: [] }]
            }
        }

        case DELETE_ITEM: {
            return {
                ...state,
                items: state.items.filter(n => n.id !== action.id)
            }
        }

        case ADD_CHECKBOX: {
            return {
                ...state,
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

        case CHANGE_COLOR: {
            return {
                ...state,
                darkColor: !state.darkColor
            }
        }

        default:
            return state
    }
};

export const addCheckBox = (item, newCheckboxText) => ({type: ADD_CHECKBOX, payload: {item, newCheckboxText}});
export const checkedPost = (item, id) => ({type: CHECKED_POST, payload: {item, id}});
export const deleteCheck = (item, id) => ({type: DELETE_CHECKBOX, payload: {item, id}});
export const updateHeading = (heading, id) => ({type: UPDATE_HEADING, payload: {heading, id}});
export const addItem = () => ({type: ADD_ITEM});
export const deleteItem = (id) => ({type: DELETE_ITEM, id});
export const changeColor = () => ({type: CHANGE_COLOR})

export default todoReducer
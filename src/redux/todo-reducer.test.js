import React from "react";
import todoReducer, {addCheckBox, addItem, checkedPost, deleteCheck} from './todo-reducer'

const testState = {
    items: [
        {id: 0, heading: 'New Item', checkboxes: [
                {id: 0, message: 'message 0', active: false},
                {id: 1, message: 'message 1', active: true},
                {id: 2, message: 'message 2', active: false},
                {id: 3, message: 'message 3', active: true},
                {id: 4, message: 'message 4', active: false},
                {id: 5, message: 'message 5', active: false},
                {id: 6, message: 'message 6', active: true},
                {id: 7, message: 'message 7', active: false},
                {id: 8, message: 'message 8', active: false}]
        },
        {id: 1, heading: 'New Item #2', checkboxes: [
                {id: 0, message: 'message 10', active: true},
                {id: 1, message: 'message 11', active: true},
                {id: 2, message: 'message 12', active: true},
                {id: 3, message: 'message 13', active: true},
                {id: 4, message: 'message 14', active: true},
                {id: 5, message: 'message 15', active: true}]
        },
        {id: 2, heading: 'New Item #3', checkboxes: [
                {id: 0, message: 'message 20', active: false},
                {id: 1, message: 'message 21', active: false},
                {id: 2, message: 'message 22', active: false},
                {id: 3, message: 'message 23', active: false},
                {id: 4, message: 'message 24', active: false}]
        },
    ],
    darkColor: false
};

describe('todo actions', () => {
    it('length of item should be incremented', () => {
        const action = addItem()
        const newState = todoReducer(testState, action)
        expect(newState.items.length).toBe(4)
    })

    it('length of checkbox should be incremented', () => {
        const action = addCheckBox(1, 'message 16')
        const newState = todoReducer(testState, action)
        expect(newState.items[1].checkboxes.length).toBe(7)
    })

    it('length of checkbox should be -1', () => {
        const action = deleteCheck(2, 3)
        const newState = todoReducer(testState, action)
        expect(newState.items[2].checkboxes.length).toBe(4)
    })

    it('length of checkbox not change', () => {
        const action = deleteCheck(3, 10000)
        const newState = todoReducer(testState, action)
        expect(newState.items.length).toBe(3)
    })

    it('active will change', () => {
        const action = checkedPost(2, 1)
        const newState = todoReducer(testState, action)
        expect(newState.items.length).toBeTruthy()
    })
})
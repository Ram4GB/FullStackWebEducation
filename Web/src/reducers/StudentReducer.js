import * as types from "../constants/ActionTypes";
let initialState = {
  students: [
    {
      id: "3117410207",
      fname: "Trần Lê Huy",
      lname: "Quyền",
      SchoolClassId: 1,
      SchoolClass: {
        id: 1,
        name: "DCT1171"
      }
    }
  ]
};

const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DATA:
      return {
        ...state,
        students: action.students
      };
    case types.REMOVE_DATA:
      let index = state.students.findIndex(u => u.id === action.id);
      let newArr = [
        ...state.students.slice(0, index),
        ...state.students.slice(index + 1)
      ];

      return {
        ...state,
        students: newArr
      };
    case types.ADD_DATA:
      return {
        students: [...state.students, action.newStudent]
      };
    default:
      return state;
  }
};

export default StudentReducer;

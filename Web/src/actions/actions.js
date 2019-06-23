import * as types from "../constants/ActionTypes";
import Axios from "axios";
const fetchData = students => {
  return {
    type: types.FETCH_DATA,
    students
  };
};

export const fetchDataRequest = () => {
  return async dispatch => {
    return await Axios({
      url: "/students",
      type: "GET"
    }).then(data => {
      dispatch(fetchData(data.data));
    });
  };
};

export const removeData = id => {
  return {
    type: types.REMOVE_DATA,
    id
  };
};

export const removeDataRequest = id => {
  return async dispatch => {
    return await Axios({
      url: `/students/${id}`,
      method: "DELETE"
    }).then(data => {
      if (data.status === 200 && data.statusText === "OK")
        dispatch(removeData(id));
    });
  };
};

export const addDataRequest = newStudent => {
  return async dispatch => {
    return await Axios.post(`/students`, newStudent).then(res => {
      if (res.status === 200 && res.statusText === "OK")
        dispatch(addData(newStudent));
    });
  };
};

const addData = newStudent => {
  return {
    type: types.ADD_DATA,
    newStudent
  };
};

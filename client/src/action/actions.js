import * as api from "./api";

export const insert = (post) => async () => {
  console.log("Here");
    try {
      
      const { data } = await api.insert(post);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  export const update = (post) => async () => {
    try {
      const { data } = await api.update(post);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  export const delete1 = (id) => async () => {
    try {
      const { data } = await api.delete1(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

export const saveState = (name,state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(name, serializedState);
    } catch {
      // ignore write errors
    }
  };


  export const loadState = (name) => { 
    try {
        const serializedState = localStorage.getItem(name);
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      } catch (err) {
        return undefined;
      }
  };


  export const clearState = (name) => {
    try {
      localStorage.removeItem(name)
      } catch (err) {
     
      }
  };

  export const clearStateSession = (name) => {
    try {
        sessionStorage.removeItem(name)
      } catch (err) {
     
      }
  };



  export const saveStateSession = (name,state) => {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem(name, serializedState);
    } catch {
      // ignore write errors
    }
  };


  export const loadStateSession = (name) => { 
    try {
        const serializedState = sessionStorage.getItem(name);
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      } catch (err) {
        return undefined;
      }
  };


 
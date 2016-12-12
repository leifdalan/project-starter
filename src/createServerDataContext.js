
const createServerDataContext = () => {
  const actions = {};
  const actionResolutions = {};
  const addAction = (key, action) => {
    actions[key] = action;
  };
  const getActions = () => ({ actions });

  const executeAction = key => actions[key]().then((resolution) => {
    actionResolutions[key] = resolution;
  });

  return {
    addAction,
    getActions,
    executeAction,
    actionResolutions,
  };
};

export default createServerDataContext;

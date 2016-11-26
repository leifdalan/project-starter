
const createServerDataContext = () => {
  const actions = [];
  const actionResolutions = [];
  const addAction = action => {
    actions.push(action);
  }
  const getActions = () => ({ actions });
  const executeAction = action => action().then(resolution => actionResolutions.push(resolution));
  return {
    addAction,
    getActions,
    executeAction,
    actionResolutions,
  };
};

export default createServerDataContext;

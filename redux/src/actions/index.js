export function createAction(actionType) {
  return (payload) => ({
      type: actionType,
      payload
    })
}

export function createApiAction(actionType, func = () => {}) {
  return (
    params = {},
    callback = { success: () => {}, failed: () => {} },
    customActionType = actionType,
  ) => async (dispatch) => {
    try {
      dispatch({ type: `${customActionType  }_request`, params });
      const { data } = await func(params);
      console.error(data)
      dispatch({ type: customActionType, params, payload: data.data });

      callback.success && callback.success({ payload: data.data })
      return data
    } catch (e) {
      dispatch({ type: `${customActionType  }_failure`, params, payload: e })

      callback.failed && callback.failed({ payload: e })
    }
  }
}

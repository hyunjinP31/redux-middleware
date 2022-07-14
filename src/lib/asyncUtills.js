// thunk함수

export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch => {
        dispatch({ type, param })
        try {
            const payload = await promiseCreator(param); //api호출
            dispatch({ type: SUCCESS, payload }) //성공
        }
        catch (e) {
            dispatch({ type: ERROR, payload: e, error: true }) //실패
        }
    }
}

// 리듀서에서 사용할 수 있는 유틸함수
export const reducerUtils = {
    //초기
    initail : (initailData = null)=>({
        loading: false,
        data: initailData,
        error: null,
    }),
    //로딩
    loading : (prevState = null)=>({
        loading: true,
        data: prevState,
        error: null,
    }),
    //성공
    success: payload => ({
        loading: false,
        data: payload,
        error: null,
    }),
    //실패
    error: error =>({
        loading: false,
        data: null,
        error: error,
    })
}
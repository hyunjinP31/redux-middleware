//액션타입, 액션생성함수 => thunk, 초기값, 리듀서
//프로미스가 시작, 성공, 실패했을 때 다른 액션을 디스패치 해야한다.
//각 프로미스마다 thunk함수를 만들어 주어야 합니다.
//리듀서에서 액션에 따라 로딩중, 결과, 에러상태를 변경

import * as postAPI from '../api/posts' //api/posts 안의 함수 모두 불러오기(as 내가 정하는 이름)

//초깃값
const initailState = {
    posts: {
        loading: false,
        data: null,
        error: null,
    },
    post: {
        loading: false,
        data: null,
        error: null,
    }
}
//액션타입
//포스트 여러개 조회하기
const GET_POSTS = "GET_POSTS"; //요청시작
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"; //요청성공
const GET_POSTS_ERROR = "GET_POSTS_ERROR"; //요청실패

//포스트 하나 조회하기
const GET_POST = "GET_POST"; //요청시작
const GET_POST_SUCCESS = "GET_POST_SUCCESS"; //요청 성공
const GET_POST_ERROR = "GET_POST_ERROR"; //요청실패

// thunk함수
export const getPosts = () => async dispatch => {
    dispatch({ type: GET_POSTS })
    try {
        const posts = await postAPI.getPosts(); //api호출
        dispatch({ type: GET_POSTS_SUCCESS, posts }) //성공
    }
    catch (e) {
        dispatch({ type: GET_POSTS_ERROR, error: e, }) //실패
    }
}

export const getPost = (id) => async dispatch => {
    dispatch({ type: GET_POST })
    try {
        const post = await postAPI.getPostsById(id); //api호출
        dispatch({ type: GET_POST_SUCCESS, post }) //성공
    }
    catch (e) {
        dispatch({ type: GET_POST_ERROR, error: e}) //실패
    }
}

//reducer는 export default
export default function posts_test(state = initailState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: {
                    loading:true,
                    data: null,
                    error: null,
                }
            }
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: {
                    loading: false,
                    data: action.posts,
                    error: null,
                }
            }
        case GET_POSTS_ERROR:
            return {
                ...state,
                posts: {
                    loading: false,
                    data: null,
                    error: action.error,
                }
            }
        case GET_POST:
            return {
                ...state,
                post: {
                    loading:true,
                    data: null,
                    error: null,
                }
            }
        case GET_POST_SUCCESS:
            return {
                ...state,
                post: {
                    loading: false,
                    data: action.posts,
                    error: null,
                }
            }
        case GET_POST_ERROR:
            return {
                ...state,
                post: {
                    loading: false,
                    data: null,
                    error: action.error,
                }
            }
        default:
            return state;
    }
}
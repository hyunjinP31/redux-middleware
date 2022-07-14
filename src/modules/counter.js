// 액션타입, 액션생성함수, 초깃값, 리듀서
// 초깃값
const initailState = 0;

// 액션타입
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션생성함수 return 을 바로 적을 때 객체의 중괄호와 함수의 중괄호를 구분짓지 못하기 때문에 return 값으로 바로 객체를 넣고 싶을 때는 소괄호로 한 번 감싸준다.
// 액션을 return 해주는 함수
export const increase = ()=> ({type: INCREASE});
export const decrease = ()=> ({type: DECREASE});

export const increaseAsync = ()=> dispatch =>{
    setTimeout(()=> dispatch(increase()), 1000)
}
export const decreaseAsync = ()=> dispatch =>{
    setTimeout(()=> dispatch(decrease()), 1000)
}

// 리듀서
export default function counter(state = initailState, action){
    switch(action.type){
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}


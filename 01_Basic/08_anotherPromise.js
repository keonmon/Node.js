// 08_anotherPromise.js

// Promise 결과를 별도의 함수안에서 활용할 때 많이 사용하는 방법이다.

const condition = true;

const promise1 = new Promise((resolve, reject)=>{
    if(condition) resolve('성공');
    else reject('실패');
});

// 'await'를 사용한 명령은 반드시 'async'로 만들어진 함수 안에서 사용해야 한다. 
// 'await', 'async', 'try-catch문'은 항상 같이 다니니까 익혀둘 것
async function abcd(){
    try{
        const result = await promise1;  // resolve에서 전달한 값을 result에 저장
        // await : promise의 비동기실행을 기다리다가 필요할 때 꺼내기 위한 키워드
        console.log('1' + result);
    } catch(error){
        console.error('2' + error);
    }
}

abcd();


// await promise의 연속실행
const promise = new Promise((resolve, reject)=>{
    resolve("첫 번째 리졸브");
});

async function func01(){
    try{
        const result = await promise;
        console.log(result);
        return "두 번째 리졸브";    // 새로운 Promise 객체의 resolve 호출
    } catch(err){
        console.error(err);
    }
};

func01().then((result2)=>{
    console.log(result2)})
    
    .catch((error)=>{
    console.error(error);
});






document.getElementById('login-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;
    if(!userid){ return alert("아이디를 입력하셈");}
    if(!pwd){ return alert("비번을 입력하셈");}

    try{
        const res = await axios.post('/members/login', {userid,pwd});
        const mem = res.data;

        let m = document.getElementById('msg');
        if(mem == null){
            m.innerHTML = '아이디가 없습니다';
        }else if(mem.pwd != pwd){
            m.innerHTML = '비밀번호를 확인하세요';
        }else if(mem.pwd == pwd){
            location.href = '/boards';
        }else{
            m.innerHTML = '알 수 없는 오류입니다.';
        }
    }catch(err){

    }
})
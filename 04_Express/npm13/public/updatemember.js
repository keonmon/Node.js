document.getElementById('memberUpdate').addEventListener('submit', async (e)=>{
    e.preventDefault();

    // 폼에서 입력된 값을 변수에 담기
    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;

    // 유효성검사
    if(!pwd) { return alert('비밀번호를 입력하세요');}
    if(!name) { return alert('이름을 입력하세요');}
    if(!phone) { return alert('전화번호를 입력하세요');}
    if(!email) { return alert('이메일을 입력하세요');}

    // axios를 활용해 라우터로 값 전달 후 리턴값 변수에 담기
    try{
        await axios.post('/members/update', {userid,pwd,name,phone,email});
        location.href='/boards';
    }catch(err){

    }
});
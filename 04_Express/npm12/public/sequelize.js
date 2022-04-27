// index.html에 submit했을 때 반응
getUsers();
getComments()

//회원추가 : 사용자 등록 - user-form이 submit이벤트를 일으키면 실행.
document.getElementById('user-form').addEventListener('submit', async (e)=>{
    e.preventDefault();

    // 이름, 나이, 결혼여부를 변수에 저장
    const name = e.target.username.value;
    const age = e.target.age.value;
    const married = e.target.married.checked;

    if(!name){ return alert('이름을 입력하세요');}
    if(!age){ return alert('나이을 입력하세요');}

    try{
        await axios.post('/users',{name, age, married});

        // 레코드를 추가하고 되돌아오면, user를 모두 조회하여 user-list테이블에 모두 표시
        // user들을 조회하여 user-list에 행단위로 추가하는 함수 호출
        getUsers();
    }catch(err){
        console.error(err);
    }
    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
});


async function getUsers(){
    // 모든 user를 조회해서 user-list 테이블을 표시한다.
    try{
        // '/users'의 get 방식으로 모든 사용자 정보를 조회하고 리턴된 데이터를 res에 담는다.
        const res = await axios.get('/users');
        // 결과를 사용하기 위해 변수에 담고 데이터를 추출
        const users = res.data;

        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML='';

        // users에 있는 user들을 하나씩 user변수(함수의 매개변수)에 넣으면서 인원 수 만큼 반복실행한다.
        users.map(function(user){
            const row = document.createElement('tr');   // tr 태그 생성
            let td = document.createElement('td');      // td 태그 생성
            td.textContent = user.id;                   // 생성된 태그에 user의 id 삽입
            row.appendChild(td);                        // tr안에 td 삽입

            td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);
            
            td = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td);
            
            td = document.createElement('td');
            td.textContent = user.married ? '기혼' : '미혼';
            row.appendChild(td);


            // row를 클릭하면 이벤트가 발생하도록 설정
            row.addEventListener('click', ()=>{
                getCommentOne(user.id);
            });


            tbody.appendChild(row);     // 완성된 tr을 tbody에 추가

        });

    }catch(err){

    }
}

// 작성자를 클릭하면 해당 댓글만 표시하는 기능
async function getCommentOne(id){
    try{
        const res = await axios.get(`/comments/search/${id}`); 
        const comments = res.data;
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';
        comments.map(function(comment){
            const row = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = comment.id;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = comment.User.name; //comment 포함된 user모델의 필드를 표시
            row.appendChild(td),

            td = document.createElement('td');
            td.textContent = comment.comment;
            row.appendChild(td);

            // 수정버튼
            const edit = document.createElement('button');
            edit.textContent='수정';
            // 수정버튼 생성
            td = document.createElement('td');  //td버튼 생성
            td.appendChild(edit);               // 버튼을 td에 추가
            row.appendChild(td);                // 버튼이 든 td를 tr에 추가
            
            //삭제버튼
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            //삭제버튼 생성
            td = document.createElement('td');
            td.appendChild(remove);
            row.appendChild(td);

            tbody.appendChild(row);
        });
    }catch(err){
        console.error(err);
    }
}


//댓글 등록 : comment-form이 submit이벤트를 일으키면 실행.
document.getElementById('comment-form').addEventListener('submit', async (e)=>{
    e.preventDefault();

    const userid = e.target.userid.value;
    const comment = e.target.comment.value;

    if(!userid){ return alert('아이디를 입력하세요');}
    if(!comment){ return alert('댓글을 입력하세요');}

    try{
        await axios.post('/comments',{userid, comment});
        getComments();
    }catch(err){
        console.error(err);
    }
    e.target.userid.value = '';
    e.target.comment.value = '';
});


// 저장된 댓글 조회
async function getComments(){
    try{
        const res = await axios.get('/comments');
        const comments = res.data;
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML='';

        comments.map(function(comment){
            const row = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = comment.id;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = comment.User.name; //comment 포함된 user모델의 필드를 표시
            row.appendChild(td),

            td = document.createElement('td');
            td.textContent = comment.comment;
            row.appendChild(td);
            
            // 수정버튼
            const edit = document.createElement('button');
            edit.textContent='수정';
            // 수정버튼 생성
            td = document.createElement('td');  //td버튼 생성
            td.appendChild(edit);               // 버튼을 td에 추가
            row.appendChild(td);                // 버튼이 든 td를 tr에 추가
            
            //삭제버튼
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            //삭제버튼 생성
            td = document.createElement('td');
            td.appendChild(remove);
            row.appendChild(td);

            tbody.appendChild(row);



            // 수정버튼에 이벤트리스너 설정
            edit.addEventListener('click', async ()=>{
                // 댓글 id와 입력받은 내용으로 comment를 수정하시고, 다시 댓글들을 검색하여 댓글을 표시해주세요.
                const newComment = prompt('바꿀 내용을 입력하세요.');
                if(!newComment) { return alert('내용을 반드시 입력해야 합니다.');}

                try{
                    // http://localhost:3000/comments/3
                    await axios.patch(`/comments/update/${comment.id}`, {comment:newComment});
                    getComments();

                }catch(err){
                    console.error(err);
                }
            });
            

            // 삭제버튼 이벤트 리스너 설정
            remove.addEventListener('click', async ()=>{
                try{
                    await axios.delete(`/comments/delete/${comment.id}`);
                    getComments();
                }catch(err){
                    console.error(err);
                }
            });


        });
    }catch(err){
        console.error(err);
    }
};

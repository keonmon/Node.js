document.getElementById('write-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const subject = e.target.subject.value;
    const writer = e.target.writer.value;
    const text = e.target.text.value;
    if(!subject){return alert('제목을 입력히셈');}
    if(!text){return alert('내용을 입력히셈');}

    const formData = new FormData();
    formData.append('image', e.target.image.files[0]);
    formData.append('subject', subject);
    formData.append('writer', writer);
    formData.append('text', text);

    try {
        await axios.post('/boards/writeBoard', formData)
        location.href = '/boards';
    } catch (err) {
        console.error(err);
    }
});
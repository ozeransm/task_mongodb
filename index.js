const refs = {
    form: document.querySelector('.form'),
    list: document.querySelector('.list'),
    // 
}
refs.form.addEventListener('submit', handlerBtn);
const URL_GET = "http://127.0.0.1:3000/api/getAll";
const URL_POST = "http://127.0.0.1:3000/api/question" 
function handlerBtn(evt){
   evt.preventDefault();
   const obj={};
   const formData = new FormData(refs.form);
   for(const el of formData.entries()){
    obj[el[0]]=el[1];
   }
   createPost({method: "POST", body: JSON.stringify(obj), headers: {
    "Content-Type": "application/json; charset=UTF-8",},});
}

function createGet() {
   return fetch(URL_GET).then(res =>{
    if(!res.ok){
        throw new Error(res.statusText);
    };          
return res.json()});
}

function createPost(option){
    fetch(URL_POST, option)
    .then(res=>res.json())
    .then(console.log);
}

function markUp(data){
    
    refs.list.insertAdjacentHTML('beforeend',data.reduce((akk,{_id , name, phone, comment})=>akk+`<div class="list-div"><li>Id: ${_id}</li><li>Name: ${name}</li><li>Phone: ${phone}</li><li>Comment: ${comment}</li></div>`,''));
}

createGet()
    .then(markUp);
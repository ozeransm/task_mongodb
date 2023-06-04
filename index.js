const refs = {
    modalForm: document.querySelector('.modal-form'),
    modal: document.querySelector('.modal'),
    form: document.querySelector('.form'),
    list: document.querySelector('.list'),
    listDiv: document.querySelector('.two'),
    
}
const URL_GET = "http://127.0.0.1:3000/api/getAll";
const URL_POST = "http://127.0.0.1:3000/api/question" 
const URL_MUT = "http://127.0.0.1:3000/api/mutation"
const URL_DEL = "http://127.0.0.1:3000/api/delete"
refs.form.addEventListener('submit', handlerBtn);
refs.listDiv.addEventListener('click', handlerCard);
let idCard = null;
function handlerCard(evt){
    evt.preventDefault();
    if(evt.target.nodeName!=='A'){
        return;
    }
    idCard = evt.target.getAttribute('id');
    refs.modal.style.top = `${evt.clientY}px`;
    refs.modal.style.left = `${evt.clientX}px`;
    refs.modal.removeAttribute('hidden');
    refs.modal.addEventListener('click', handlerBtnModal);
    refs.modalForm.reset();
}

function handlerBtnModal(evt){
    
    if(evt.target.name==='checkbox'){
       evt.target.toggleAttribute('checked');
    }
    
    const obj={};
    obj._id = idCard;
    if(evt.target.nodeName=='A'){
        console.log(obj);
        createDel({method: "DELETE", body: JSON.stringify(obj), headers: {"Content-Type": "application/json; charset=UTF-8"}})
        .then(console.log)
        .finally(refs.modal.setAttribute('hidden',''))
        return;
    }
    
    if(evt.target.nodeName!=='BUTTON'){
        return;
    }
    evt.preventDefault();
    refs.modal.setAttribute('hidden','');
        
   const formData = new FormData(refs.modalForm);
   for(const el of formData.entries()){
    if(el[1]){
        obj[el[0]] = el[1];
    }
    }
        
    if(obj.checkbox){
        
        createMut({method: "PATCH", body: JSON.stringify(obj), headers: {
         "Content-Type": "application/json; charset=UTF-8",},})
         .then(data => console.log(data));
    }
    
    
    
}

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
   refs.list.textContent='';
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

function createMut(option){
   return fetch(URL_MUT, option)
    .then(res=>res.json())
    .then(console.log);
}

function createDel(option){
    return fetch(URL_DEL, option)
     .then(res=>res.json())
     .then(console.log);
 }

function markUp(data){
    
    refs.list.insertAdjacentHTML('beforeend',data.reduce((akk,{_id , name, phone, email, comment})=>akk+`<div class="list-div"><li>Id: ${_id}</li><li>Name: ${name}</li><li>Phone: ${phone}</li><li>Email: ${email}</li><li>Comment: ${comment}</li><a id="${_id}" href="#">Edit</a></div>`,''));
    
}

createGet()
    .then(markUp)
    .catch(console.log);
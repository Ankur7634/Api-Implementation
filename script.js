'use strict';
let repeat=0,imageStatus=true;

document.querySelector('.btn').addEventListener('click',function(){
    const textPattern = /^[a-zA-Z]*$/;
    const word=document.querySelector('.input-field').value;
    if(!word || !textPattern.test(word)){
       const err=`<span class="error" style="color:red;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>Invalid Input!!</span></br>`;
       document.querySelector('.error').innerHTML = err;
    }
    else{
        document.querySelector('.error').innerHTML='';
        if(!repeat){
            document.querySelector('.space').classList.remove('space');
            document.querySelector('.jumbotron').classList.add('animation');
        }
        document.querySelector('.image').innerHTML = '';
        const url='https://api.unsplash.com/search/photos?query='+word+'&client_id=Gi2CekPLrZSA_add5wUdElrMhHR0RU3TonV3PgJ5EZ4&per_page=3';
        fetch(url).then(function (resultJson) {
            resultJson.json().then(function (json) {
                json.results.forEach((photo) => {
                imageStatus=false;
                document.querySelector('.error').innerHTML = '';
                const result = `<img src="${photo.urls.regular}"/>`;
                document.querySelector('.image').innerHTML += result;
                });
            });
        });
        if(imageStatus){
        const err=`<span class="error" style="color:red;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>Picture Not Found!!</span></br>`;
        document.querySelector('.error').innerHTML = err;
        }
        repeat=1;
    }
});

let arra=[];
fetch('words.json')
  .then(response => response.json())
  .then(json => { arra=json});

document.getElementById('data').addEventListener('input',(e)=>{
    let res=[];
    document.querySelector('#huge_list').innerHTML='';
    if(e.target.value.length>2){
        res=arra.filter(el=> el.toLowerCase().includes(e.target.value));
    for(let i=0;i<6;i++){
        const val=`<option value=${res[i]}></option>`;
        document.querySelector('#huge_list').innerHTML+=val;
    }
    }
});
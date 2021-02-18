var send = document.getElementById('send');
var content = document.getElementById('content');
var list = document.getElementById('list');

console.log(send+content+list)

if(send)
send.addEventListener('click', function(e){
    var str = content.value;
    var xhr = new XMLHttpRequest();
    xhr.open('post','/additem');
    xhr.setRequestHeader('Content-type',"application/json")
    var item = JSON.stringify({"content":str})
    xhr.send(item);
    xhr.onload = function(){
        var data = JSON.parse(xhr.responseText)
        console.log('check'+data)
    }


})


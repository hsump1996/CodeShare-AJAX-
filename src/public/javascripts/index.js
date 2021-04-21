// Write your client side Javascript code here

function main() {
    
    const url = 'http://localhost:3000/code_snippets';
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.addEventListener('load', function(event) {
        event.preventDefault();
        if (xhr.status >= 200 && xhr.status < 400) {
            console.log(xhr.responseText);
            let datas = JSON.parse(xhr.responseText);
            let main = document.querySelector('main');
                
            for (const data of datas) {

                const h4 = document.createElement('h1');
                h4.textContent = data.title;

                const pre = document.createElement('pre');
                pre.textContent = data.code;

                const ul = document.createElement('ul');
                ul.textContent = data.comment;

                const commentButton = document.createElement("button");
                commentButton.appendChild(document.createTextNode("Comment"));

                main.appendChild(h4);
                main.appendChild(pre);
                main.appendChild(ul);
                main.appendChild(commentButton);
            };
        } else {
            console.log('error', xhr.status);
        }
    });

    xhr.addEventListener('error', function() {
        console.log('error');
    });

    xhr.send();
}

document.addEventListener('DOMContentLoaded', main);

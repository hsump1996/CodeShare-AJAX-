// Write your client side Javascript code here

function getCode(url) {

    let req = new XMLHttpRequest();

    req.open('GET', url, true);

    req.addEventListener('load', function(event) {
        
        event.preventDefault();
        
        if (req.status >= 200 && req.status < 400) {
            console.log(req.responseText);
            let datas = JSON.parse(req.responseText);
            let main = document.querySelector('main');
                
            for (const data of datas) {
                const h4 = document.createElement('h1');
                h4.setAttribute("id", `${data._id}`);
                h4.textContent = data.title;

                const pre = document.createElement('pre');
                pre.setAttribute("id", `${data._id}`);
                pre.textContent = data.code;

                const ul = document.createElement('ul');
                ul.setAttribute("id", `${data._id}`);
                ul.textContent = data.comment;

                const commentButton = document.createElement("button");
                commentButton.setAttribute("id", "createComment");
                commentButton.appendChild(document.createTextNode("Comment"));

                main.appendChild(h4);
                main.appendChild(pre);
                main.appendChild(ul);
                main.appendChild(commentButton);
            };
        } else {
            console.log('error', req.status);
        }
    });

    req.addEventListener('error', function() {
        console.log('error');
    });

    req.send();
}


function postCodeSnippet() {

    const modal = document.getElementsByClassName("modal")[0];

    modal.style.display = "inline";

    document.getElementById("create-code-snippet").addEventListener('click', function(event) {

        event.preventDefault();

        //Collect the form data(just the Code Snippet's text)
        let code = document.getElementById('code-snippet-code').value;

        let title = document.getElementById('code-snippet-title').value;


        const url = 'http://localhost:3000/code_snippets';

        const req= new XMLHttpRequest();
            
        //Use an AJAX POST to send the Code Snippet's text to the server
        req.open('POST', url, true);
            
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        req.send('code=' + code + '&' + 'title=' + title);

        req.addEventListener('error', function(e) {
            document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
        });

        location.reload();

        modal.style.display = "None";

        document.getElementById('code-snippet-code').value = "";
        document.getElementById('code-snippet-title').value = "";
    
    });
};

function commentButton(event) {

    event.preventDefault();


    const modal2 = document.getElementsByClassName("modal")[1];

    modal2.style.display = "inline";

    modal.style.display = "";

};



function main() {

    const url = 'http://localhost:3000/code_snippets';
    getCode(url);
        
    const addCodeSnippet = document.getElementById("btn-show-modal-code-snippet");
    const addComment = document.getElementById('createComment');

    addCodeSnippet.addEventListener('click', postCodeSnippet);
    addComment.addEventListener('click', commentButton);


}

document.addEventListener('DOMContentLoaded', main);

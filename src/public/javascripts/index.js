// Write your client side Javascript code here

function getCode(url) {

    const req = new XMLHttpRequest();

    req.open('GET', url, true);

    req.addEventListener('load', function(event) {
        
        event.preventDefault();
        
        if (req.status >= 200 && req.status < 400) {

            //Parses JSON 
            const datas = JSON.parse(req.responseText);
            const main = document.querySelector('main');
                
            for (const data of datas) {

                //Appends title 
                const h4 = document.createElement('h1');
                h4.setAttribute("id", `${data._id}`);
                h4.textContent = data.title;
                main.appendChild(h4);

                //Appends code 
                const pre = document.createElement('pre');
                pre.setAttribute("id", `${data._id}`);
                pre.textContent = data.code;
                main.appendChild(pre);

                //Appends comments from comment array
                for (const comment of data.comment) {
                    const li = document.createElement('li');
                    li.setAttribute("id", `${data._id}`);
                    li.textContent = comment;
                    main.appendChild(li);
                }

                //Appends comment buttons
                const commentButton = document.createElement("button");
                commentButton.setAttribute("id", `${data._id}`);
                commentButton.setAttribute("class", 'createComment');
                commentButton.appendChild(document.createTextNode("Comment"));
                main.appendChild(commentButton);

                commentButton.addEventListener('click', function(event) {

                    event.preventDefault();

                    //Extracts form's hidden field for id 
                    const hidden = document.getElementsByClassName('code-snippet-id');
                    

                    //Sets the form's hidden field for id to the _id of the Code Snippet that is being commented
                    hidden.value = `${data._id}`;

                    //Extracts comment popup
                    const modal = document.getElementsByClassName("modal")[1];

                    modal.style.display = "inline";

                });
            }

            //Creates Comment by submitting
            document.getElementById("create-comment").addEventListener('click', function(event) {

                event.preventDefault();
                
                const modal = document.getElementsByClassName("modal")[1];
                const comment = document.getElementById('comment-text').value;

                const hidden = document.getElementsByClassName('code-snippet-id');
                const url = 'http://localhost:3000/code_snippets/' + hidden.value + '/comments';

                const xhr = new XMLHttpRequest();
                                                        
                xhr.open('POST', url, true);

                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                            
                xhr.send('id=' + hidden.value + '&' + 'comment=' + comment);

                xhr.addEventListener('error', function(e) {
                    document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
                });

                location.reload();
                modal.style.display = "None";
            });


            //Cancel comment
            document.getElementsByClassName("close")[1].addEventListener('click', function(event) {

                event.preventDefault();

                const modal = document.getElementsByClassName("modal")[1];

                modal.style.display = "None";

            });
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
        const code = document.getElementById('code-snippet-code').value;

        const title = document.getElementById('code-snippet-title').value;


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


    document.querySelector(".close").addEventListener('click', function(event) {
        
        event.preventDefault();
        modal.style.display = "None";

    });
}

function main() {

    const url = 'http://localhost:3000/code_snippets';
    getCode(url);
    
    const addCodeSnippet = document.getElementById("btn-show-modal-code-snippet");


    addCodeSnippet.addEventListener('click', postCodeSnippet);

}

document.addEventListener('DOMContentLoaded', main);

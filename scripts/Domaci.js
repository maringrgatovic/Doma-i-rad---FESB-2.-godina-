/*a) Search_box*/
document.querySelector("#search_box").addEventListener("keyup", fun);
function fun(e)
{
    let napisano = e.currentTarget.value;
    
    //3. Dohvatiti sve kartice i za svaku karticu
    let user_boxes = document.querySelectorAll(".user_box");
    for(let i = 0; i < user_boxes.length; i++){
        let user_box = user_boxes[i];
        if(user_box.textContent.indexOf(napisano) >= 0){ //sadrži -> kartica ne smi biti skrivena
            user_box.classList.remove("hidden");
        }
        else {//ne sadrži -> kartica treba biti skrivena
            user_box.classList.add("hidden");
        }
    }
}


/*b) Toggle srce on/off */
let svaSrca = document.querySelectorAll(".heart_icon");
for(let i = 0; i < svaSrca.length; i++){
    let Srce = svaSrca[i];
    Srce.addEventListener("click", heartClick);
}

function heartClick(e){
    let Srce = e.currentTarget; 
    if(Srce.classList.contains("fa-heart-o")){ 
        Srce.classList.remove("fa-heart-o");
        Srce.classList.add("fa-heart");
        var broj = Srce.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.lastChild.innerHTML;
        broj = Number(broj)+1;
        Srce.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.lastChild.innerHTML = broj;

        var LikeInfo = document.getElementById('lajkovi');
        var broj1 = LikeInfo.innerHTML;
        broj1 = Number(broj1)+1;
        LikeInfo.innerHTML = broj1;
    }
    else {
        Srce.classList.remove("fa-heart");
        Srce.classList.add("fa-heart-o");
        var broj = Srce.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.lastChild.innerHTML;
        broj = Number(broj)-1;
        Srce.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.lastChild.innerHTML = broj;

        var LikeInfo = document.getElementById('lajkovi');
        var broj1 = LikeInfo.innerHTML;
        broj1 = Number(broj1)-1;
        LikeInfo.innerHTML = broj1;
    }
}

let glavnoSrce = document.getElementById('main_heart');
let user_boxes = document.querySelectorAll(".user_box");
glavnoSrce.addEventListener('click', clickMainHeart);
function clickMainHeart(e){
    let glavnoSrce = e.currentTarget;
    if(glavnoSrce.classList.contains('fa-heart'))
    {
        for(let i=1; i<svaSrca.length; i++)
        {
            let Srce = svaSrca[i];
            let user_box = user_boxes[i-1];
            if(Srce.classList.contains('fa-heart-o'))
                user_box.classList.add('hidden');
            else
                user_box.classList.remove('hidden');
        }
    }
    else
    {
        for(let i=0; i<user_boxes.length; i++){
            user_box = user_boxes[i];
            user_box.classList.remove('hidden');
        }
    }
}



/*c) klikom na ikonu korisnika selektiramo samo njegove postove */
let userIcon = document.getElementById('main_user');
userIcon.addEventListener('click', clickUserIcon);
function clickUserIcon(e)
{
    let userIcon = e.currentTarget;
    if(userIcon.classList.contains("fa-user-times")){ 
        userIcon.classList.remove("fa-user-times");
        userIcon.classList.add("fa-user");

        let user_boxes = document.querySelectorAll(".user_box");
        let names = document.querySelectorAll('.name');
        for(let i=0; i<names.length; i++)
        {
            let user_box = user_boxes[i];
            let name = names[i];
            if(name.textContent.indexOf(document.getElementById('main_name').innerHTML) >= 0)
            user_box.classList.remove('hidden');
            else
            user_box.classList.add('hidden');
        }
    }
    else {
        userIcon.classList.remove("fa-user");
        userIcon.classList.add("fa-user-times");

        let user_boxes = document.querySelectorAll(".user_box");
        for(let i=0; i<user_boxes.length; i++)
        {
            let user_box = user_boxes[i];
            user_box.classList.remove('hidden');        
        }
    }
}



/*d) dodavanje posta*/ 
let button = document.getElementById('add_button');
button.addEventListener('click', addPost);
function addPost(e)
{
    let button = e.currentTarget;

    let location = prompt("Unesi lokaciju slike");
    let ImgUrl = prompt("Unesi URL slike");
    let Tags = prompt("Unesi niz tagova");

    try{
        let serverresponse = await
        fetch(`API.php?action=addPost&lokacija=${location}&imgURL=${ImgURL}&hashes=${Tags}`);
        let responsedata = serverresponse.json();
        if(!responsedata.success)
        {
            alert(`Error liking card: ${responsedata.reason}`);
                return;
        }
    }
    
    catch(e){
        alert("error when liking card");
    }


    let userBoxTemplate = document.querySelector('#user_box_template');
    let userBoxElement = document.importNode(userBoxTemplate.content, true);

    userBoxElement.querySelector("#location").textContent = location;
    userBoxElement.querySelector("#img").src = ImgUrl;
    userBoxElement.querySelector(".hashes").textContent = Tags;

    document.querySelector('#left_column').appendChild(userBoxElement);
}



/*e) Bookmark: */
let sviBookmarki = document.querySelectorAll(".bookmark");
for(let i = 0; i < sviBookmarki.length; i++){
    let bookmark = sviBookmarki[i];
    bookmark.addEventListener("click", bookmarkClick);
}

function bookmarkClick(e){
    let bookmark = e.currentTarget; 
    if(bookmark.classList.contains("fa-bookmark-o")){ 
        bookmark.classList.remove("fa-bookmark-o");
        bookmark.classList.add("fa-bookmark");
        
        var BookmarkInfo = document.getElementById('bookmarki');
        var broj1 = BookmarkInfo.innerHTML;
        broj1 = Number(broj1)+1;
        BookmarkInfo.innerHTML = broj1;
    }
    else{ 
        bookmark.classList.remove("fa-bookmark");
        bookmark.classList.add("fa-bookmark-o");
        
        var BookmarkInfo = document.getElementById('bookmarki');
        var broj1 = BookmarkInfo.innerHTML;
        broj1 = Number(broj1)-1;
        BookmarkInfo.innerHTML = broj1;
    }
}

/*e) komentari 1.dio*/
let komentari = document.querySelectorAll('.comment');
for(let i = 0; i < komentari.length; i++){
    let commentIcon = komentari[i];
    commentIcon.addEventListener("click", commentClick);
}

function commentClick(e){
    let commentIcon = e.currentTarget; 
    var x = commentIcon.parentNode.parentNode.parentNode.lastChild.previousSibling.childNodes[1];
    x.focus();
}


/*e) komentari 2.dio*/
let commentBoxes = document.querySelectorAll('.comments');
for(let i=0; i < commentBoxes.length; i++){
    commentBoxes[i].firstChild.nextSibling.addEventListener('keydown', enter);
}
function enter(e)
{
    let text = e.currentTarget;
    let komentarTemplate = document.querySelector('#comment_template');
    let komentar = document.importNode(komentarTemplate.content, true);
    let key = e.which;
    if (key == 13)
    {
        komentar.querySelector('#a').textContent = "Bugs Bunny: " + text.value; 
        text.parentNode.prepend(komentar);
    }
}



/*f) Micanje predloženih korisnika*/
let closeButtons = document.querySelectorAll(".no_follow");
for(let i = 0; i < closeButtons.length; i++){
    let closeButton = closeButtons[i];
    closeButton.addEventListener("click", deleteNode);
}

function deleteNode(e){
    var closeButton = e.currentTarget; 
    closeButton.parentNode.classList.add('hidden');

    let text = closeButton.parentNode.querySelector('h6').innerHTML;
    let suggestions = document.getElementById('suggestion_box_1').querySelectorAll('div');
    for(var i=0; i<suggestions.length; i++)
    {
        var suggestion = suggestions[i];
        var text1 = suggestion.querySelector('p').firstChild.innerHTML;
        if (text == text1){
           suggestion.firstChild.nextSibling.classList.add('hidden');
           suggestion.firstChild.nextSibling.nextSibling.nextSibling.classList.add('hidden');
           suggestion.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add('hidden');
        }
    }
}


/*f) praćenje ljudi lijevo*/

let followbuttons = document.querySelectorAll(".follow_user");
for(let i = 0; i < followbuttons.length; i++){
    let followbutton = followbuttons[i];
    followbutton.addEventListener("click", followNode);
}

function followNode(e){
    var followbutton = e.currentTarget; 
    followbutton.parentNode.classList.add('hidden');

    let text = followbutton.parentNode.querySelector('h6').innerHTML;
    let suggestions = document.getElementById('suggestion_box_1').querySelectorAll('div');
    for(var i=0; i<suggestions.length; i++)
    {
        var suggestion = suggestions[i];
        var text1 = suggestion.querySelector('p').firstChild.innerHTML;
        if (text == text1){
           suggestion.firstChild.nextSibling.classList.add('hidden');
           suggestion.firstChild.nextSibling.nextSibling.nextSibling.classList.add('hidden');
           suggestion.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.add('hidden');
        }
    }
    var LikeInfo = document.getElementById('korisnici');
    var broj1 = LikeInfo.innerHTML;
    broj1 = Number(broj1)+1;
    LikeInfo.innerHTML = broj1;
}

/*g) praćenje ljudi desno*/
let followrijeci = document.querySelectorAll(".follow");
for(let i = 0; i < followrijeci.length; i++){
    let followrijec = followrijeci[i];
    followrijec.addEventListener("click", followNode1);
}

function followNode1(e){
    var followrijec = e.currentTarget; 
    followrijec.classList.add('hidden');
    followrijec.parentNode.firstChild.nextSibling.classList.add('hidden');
    followrijec.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.classList.add('hidden');

    let text = followrijec.parentNode.querySelector('b').innerHTML;
    let suggestions = document.getElementById('suggested_users').querySelectorAll('div');
    for(var i=0; i<suggestions.length; i++)
    {
        var suggestion = suggestions[i];
        var text1 = suggestion.querySelector('h6').innerHTML;
        if (text == text1){
           suggestion.classList.add('hidden');          
        }
    }
    var LikeInfo = document.getElementById('korisnici');
    var broj1 = LikeInfo.innerHTML;
    broj1 = Number(broj1)+1;
    LikeInfo.innerHTML = broj1;
}






<?php
require_once("baza.php");

function getCardsFromDb(){
    return getDbAccess()->executeQuery("SELECT * FROM Posts ORDER BY ID DESC;");
}

function generateCardsHtml(){
    $html = "";

    $cards = getCardsFromDb();

    foreach($cards as $card){
        $id = $card[0];
        $title = $card[1];
        $userimgURL = $card[2];
        $location = $card[3];
        $imageUrl = $card[4];
        $liked = $card[5];
        $NOL = $card[6];
        $hashes = $card[9];

        $heartClass = $liked == '1' ? "fa-heart" : "fa-heart-o";
        
        $html .= "<div class='user_box' id='$id'>
                    <div class='user_box_2'>
                        <img src='$userimgURL' class='user'>
                        <div class='name'>
                            <p>$title</p>
                        </div>
                     <label id='location'>$location</label>
                    </div>
                    <img id='img' src='$imageUrl' class='picture' >
                    <div class='icons'>
                        <div>
                            <i class='fa fa-heart-o heart_icon'></i>
                            <i class='fa fa-comment-o comment'></i>
                        </div>
                         <i class='fa fa-bookmark-o bookmark'></i>
                    </div>
                    <p class='hashes'>$hashes</p>
                    <p>Sviđa mi se: <var>$NOL</var></p>
                    <div class='comments'>
                    <input type='text' class='comment_box' placeholder='Komentiraj...'>
                    </div>
                </div>";
    }

    return $html;
}

function addPost($lokacija, $imgURL, $hashes){
    getDbAccess()->executeQuery("INSERT INTO Posts (Ime_korisnika,user_imageURL,Lokacija,Put_do_slike,Lajkana,Broj_lajkova,Bookmarkirana,Broj_bookmarka,Hashtagovi) 
    VALUES ('Bugs Bunny', 'images\user_pictures\Bugs_Bunny_User.jpg', '$lokacija', '$imgURL', '0', '0', '0', '0', '$hashes');");
}
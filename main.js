//listen for form submit button and adding function on click
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//saving bookmark 
function saveBookmark(){
    //getting values from form
var siteName=document.getElementById('siteName').value;
var siteUrl=document.getElementById('siteUrl').value;

if(!siteName||!siteUrl){
alert("field cant be empty")
return false;
}


//object
let bookmark={
    name :siteName,
    url:siteUrl
}

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

    //testing if the local storage is empty
if(localStorage.getItem("bookmarks")===null){
    //initialising an arrray
    var bookmarks=[];
    //adding to the array
    bookmarks.push(bookmark);
    //setting to local storage - json string
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))

}
else{
    //getting existing bookmarks from local storage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'))
    //adding to the array
    bookmarks.push(bookmark)
    //re-set local storage
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}

// e.preventDefault();
}

//fetching bookmarks
 function fetchBookmarks(){
     //get bookmarks from the local storage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'))
    //get output id
    var bookmarkResults=document.getElementById('bookmarkResults')

    //build output
    bookmarkResults.innerHTML=''
    for(var i=0; i < bookmarks.length;i++){
        var name=bookmarks[i].name;
        var url=bookmarks[i].url;

        bookmarkResults.innerHTML+='<div class="well">'+
        '<h3>'+name+
        ' <a class="btn btn-default" target="_blank" href="'+(url)+'">Visit</a> ' +
        ' <a onclick= "deleteBookmark (\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
        '</h3>'+
        '</div>';
 }
 }

 //delete bookmark function
 function deleteBookmark(url){
     //get bookmarks from the local storage
     var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
     //loop through bookmarks
     for (var i=0;i<bookmarks.length;i++){
         if(bookmarks[i].url==url){
             //remove from the array
             bookmarks.splice(i,1)
             
         }
     }
     //re-set back to local storage
     localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
     //re-fetch bookmarks
     fetchBookmarks();
 }
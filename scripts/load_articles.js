function load_articles (list) {
  for (article in list){
    var li = document.createElement("li")
    li.innerHTML = "article"
    document.getElementById("list_of_articles").appendChild(li);

    var div = document.createElement("div");
    // div.style.width = "100px";
    // div.style.height = "100px";
    // div.style.background = "red";
    // div.style.color = "white";
    div.innerHTML = '<object type="text/html" data=article></object>';
    document.getElementById("articles").appendChild(div);
  }
}

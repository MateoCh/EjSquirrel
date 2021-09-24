fetch('https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json')
  .then(response => response.json())
  .then(data =>{
    eventos=data;
    let tabEven="";
    eventos.forEach((prov,index) => {
        let msg="<tr> \n";
        msg+="<th scope=\"row\">"+index+"</th> \n";
        msg+="<td>"+prov.events+"</td> \n";
        msg+="<td>"+prov.squirrel+"</td>\n";
        msg+="</tr> \n";
        tabEven+=msg;
    });
    
    let rep1= document.getElementById("replace1");
    rep1.innerHTML=tabEven;
});
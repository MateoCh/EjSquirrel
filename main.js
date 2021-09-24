fetch('https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json')
  .then(response => response.json())
  .then(data =>{
    let dias=data;
    let eventList=[];
    let numEvents=[];
    let tps=[];
    let tns=[];
    let fps=[];
    let fns=[];
    let allMcc=[];
    let totalDias=0;
    let totalSqui=0;
    let tabEven="";
    let tabCor="";
    dias.forEach((dia,index) => {
        totalDias++;
        if(dia.squirrel===true)
        {
            totalSqui++;
            let dayEvents=dia.events.toString().split(",")
            dayEvents.forEach((ev)=>{
                if(eventList.indexOf(ev)==-1)
                {
                    eventList.push(ev);
                    numEvents.push(0);
                    tps.push(0);
                    tns.push(0);
                    fps.push(0);
                    fns.push(0);
                }
                let ind=eventList.indexOf(ev);
                numEvents[ind]++;
                tps[ind]++;
            })
            let msg="<tr class='squi'> \n";
            msg+="<th scope=\"row\">"+index+"</th> \n";
            msg+="<td>"+dia.events+"</td> \n";
            msg+="<td>"+dia.squirrel+"</td>\n";
            msg+="</tr> \n";
            tabEven+=msg;
        }
        else
        {
            let dayEvents=dia.events.toString().split(",")
            dayEvents.forEach((ev)=>{
                if(eventList.indexOf(ev)==-1)
                {
                    eventList.push(ev);
                    numEvents.push(0);
                    tps.push(0);
                    tns.push(0);
                    fps.push(0);
                    fns.push(0);
                }
                let ind=eventList.indexOf(ev);
                numEvents[ind]++;
                fns[ind]++;
            })
            let msg="<tr> \n";
            msg+="<th scope=\"row\">"+(index+1)+"</th> \n";
            msg+="<td>"+dia.events+"</td> \n";
            msg+="<td>"+dia.squirrel+"</td>\n";
            msg+="</tr> \n";
            tabEven+=msg;
        }
    });

    eventList.forEach((eve,index)=>
        {            
            tns[index]=totalDias-totalSqui-numEvents[index]+tps[index];
            fps[index]=totalSqui-tps[index];
            let num1Mcc=tps[index]*tns[index];
            let num2Mcc=fps[index]*fns[index];
            let numMcc=num1Mcc-num2Mcc;
            let den1Mcc=tps[index]+fps[index];
            let den2Mcc=tps[index]+fns[index];
            let den3Mcc=tns[index]+fps[index];
            let den4Mcc=tns[index]+fns[index]
            let denMcc=Math.sqrt(den1Mcc*den2Mcc*den3Mcc*den4Mcc);
            let mcc=numMcc/denMcc;
            let mccObj=[eve,mcc]
            allMcc.push(mccObj);
        })
        allMcc.sort((a,b)=>{
            let amcc= a[1];
            let bmcc= b[1];
            if(amcc<bmcc)
            {
                return 1;
            }
            else if(amcc>bmcc)
            {
                return -1;
            }
            else
            {
                return 0;
            }
        });
        allMcc.forEach((x,index)=>
        {
            let msg2="<tr> \n";
            msg2+="<th scope=\"row\">"+(index+1)+"</th> \n";
            msg2+="<td>"+x[0]+"</td> \n";
            msg2+="<td>"+x[1]+"</td>\n";
            msg2+="</tr> \n";
            tabCor+=msg2;
        })
    
    let rep1= document.getElementById("replace1");
    rep1.innerHTML=tabEven;

    let rep2= document.getElementById("replace2");
    rep2.innerHTML=tabCor;
});
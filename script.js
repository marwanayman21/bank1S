let IDB = document.getElementById('IDB');
let NameB = document.getElementById('NameB');
let Manager = document.getElementById('Manager');
let searchbar = document.getElementById('searchbar');
let addb = document.getElementById('addb');
let branchForm = document.getElementById('branchForm');
mood = 'add';
let temp;
let databr = [];
if (localStorage.branchs != null) {
    databr = JSON.parse(localStorage.branchs)
}else{ databr=[];}

addb.onclick=function() {
    if (IDB.value === '' || NameB.value === '' || Manager.value === '') {return;}
    let newbr = {
        IDB: IDB.value,
        NameB: NameB.value,
        Manager: Manager.value 
    };
    if(mood==='add'){    databr.push(newbr);
        localStorage.setItem( 'branchs',JSON.stringify(databr))
    }else{
        databr[temp]=newbr;
        localStorage.setItem( 'branchs',JSON.stringify(databr))
        mood = 'add';
        addb.innerHTML='ADD BRANCHES';
    }     
    cleardata();
    viewdata();
}; 
//clear inputs
function cleardata() {
    IDB.value='';
    NameB.value='';
    Manager.value='';
}
//read
function viewdata(){
    let table='';
    for (let i = 0; i < databr.length; i++) {
        table +=`
        <tr>
        <td>${databr[i].IDB}</td>
        <td>${databr[i].NameB}</td>
        <td>${databr[i].Manager}</td>
        <td><button class="tbutton" onclick="updatedata(${i})" id="update">Update</button></td>
        <td><button class="tbutton" onclick="deletedata(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbodyb').innerHTML = table;
};
viewdata();  
//delete
function deletedata(i){
databr.splice(i,1);
localStorage.branchs = JSON.stringify(databr);
viewdata();
}
//update
function updatedata(i){
    IDB.value=databr[i].IDB;
    NameB.value=databr[i].NameB;
    Manager.value=databr[i].Manager;
    addb.innerHTML='Update';
    mood = 'update';
    temp = i ;
    document.getElementById('add-branches').scrollIntoView({ behavior: 'smooth' });
}
//search
function searchdata(value){
    let table='';
for(let i=0; i<databr.length;i++){
    if(databr[i].NameB.includes(value)){
        table +=`
        <tr>
        <td>${databr[i].IDB}</td>
        <td>${databr[i].NameB}</td>
        <td>${databr[i].Manager}</td>
        <td><button class="tbutton" onclick="updatedata(${i})" id="update">Update</button></td>
        <td><button class="tbutton" onclick="deletedata(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
}
document.getElementById('tbodyb').innerHTML = table;
}
//clean data

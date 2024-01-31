let IDA = document.getElementById('IDA');
let NameA = document.getElementById('NameA');
let Address = document.getElementById('Address');
let Balance = document.getElementById('Balance');
let Branchename = document.getElementById('Branchename');
let searchbarA = document.getElementById('searchbarA');
let addA = document.getElementById('addA');
let accountform = document.getElementById('accountform');
mood = 'add';
let tmp;
let dataha = [];
if (localStorage.accounts != null) {
    dataha = JSON.parse(localStorage.accounts)
}else{ dataha=[];}

addA.onclick = function() {
    if (IDA.value === '' || NameA.value === '' || Address.value === '' || Balance.value === '' || Branchename.value === '') {
        return;
    }

    let branchExists = checkBranchExistence(Branchename.value);

    if (!branchExists) {
        alert('Branch not found in the database.');
        return false;
    }

    let newah = {
        IDA: IDA.value,
        NameA: NameA.value,
        Address: Address.value,
        Balance: Balance.value,
        Branchename: Branchename.value 
    };

    if (mood === 'add') {
        dataha.push(newah);
        localStorage.setItem('accounts', JSON.stringify(dataha));
    } else {
        dataha[tmp] = newah;
        localStorage.setItem('accounts', JSON.stringify(dataha));
        mood = 'add';
        addA.innerHTML = 'ADD ACCOUNT';
    }

    claerdatah();
    viewdatah();
};

function checkBranchExistence(branchName) {
    for (let i = 0; i < databr.length; i++) {
        if (databr[i].NameB === branchName) {
            return true;
        }
    }
    return false;
}
 
//clear inputs
function claerdatah() {
    IDA.value='';
    NameA.value='';
    Address.value='';
    Balance.value='';
    Branchename.value='';
}
//read
function viewdatah(){
    let table='';
    for (let i = 0; i < dataha.length; i++) {
        table +=`
        <tr>
        <td>${dataha[i].IDA}</td>
        <td>${dataha[i].NameA}</td>
        <td>${dataha[i].Address}</td>
        <td>${dataha[i].Balance}</td>
        <td>${dataha[i].Branchename}</td>
        <td><button class="tbutton" onclick="updateholders(${i})" id="updateh">Update</button></td>
        <td><button class="tbutton" onclick="deleteholders(${i})" id="deleteh">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbodyh').innerHTML = table;
};
viewdatah();  
//delete
function deleteholders(i){
dataha.splice(i,1);
localStorage.accounts = JSON.stringify(dataha);
viewdatah();
}
//update
function updateholders(i){
    IDA.value=dataha[i].IDA;
    NameA.value=dataha[i].NameA;
    Address.value=dataha[i].Address;
    Balance.value=dataha[i].Balance;
    Branchename.value=dataha[i].Branchename;
    addA.innerHTML='Update';
    mood = 'update';
    tmp = i ;
    document.getElementById('add-account').scrollIntoView({ behavior: 'smooth' });
}
//search
function searchdatah(value){
    let table='';
for(let i=0; i<dataha.length;i++){
    if(dataha[i].NameA.includes(value)){
        table +=`
        <tr>
        <td>${dataha[i].IDA}</td>
        <td>${dataha[i].NameA}</td>
        <td>${dataha[i].Address}</td>
        <td>${dataha[i].Balance}</td>
        <td>${dataha[i].Branchename}</td>
        <td><button class="tbutton" onclick="updateholders(${i})" id="updateh">Update</button></td>
        <td><button class="tbutton" onclick="deleteholders(${i})" id="deleteh">Delete</button></td>
        </tr>
        `;
    }
}
document.getElementById('tbodyh').innerHTML = table;
}
//clean data
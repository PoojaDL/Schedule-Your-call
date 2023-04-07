const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const btn = document.querySelector(".btn");
const ul = document.querySelector("#users");


// function to execute after submit
function myfunction(event) {
  event.preventDefault();

  let lname = name.value;
  let lemail = email.value;
  let lphone = phone.value;

  if (lname && lemail) {
    let list = {
      name: lname,
      email: lemail,
      phone:lphone
    }


    document.querySelector('form').reset();
    // showData();

    axios.post("https://crudcrud.com/api/6a7c68fcd64f4993927497689c43f4bf/AppData", list)
      .then((response) => {
        showData(response.data)
      })
      .catch((err) => {
        console.log(err);
      })

  } else {
    alert("Enter data to continue !");
  }
}

function refresh(){
  axios.get("https://crudcrud.com/api/6a7c68fcd64f4993927497689c43f4bf/AppData")
    .then((response) => {

      console.log(response.data)
      for(let i=0;i<response.data.length;i++){
        showData(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

window.addEventListener("DOMContentLoaded",refresh())

// function to print list

function showData(obj) {

  //appending list
  let li = document.createElement('li');
  let content=obj.name+"-"+obj.email+"-"+obj.phone+" ";
  let id=obj._id;
  li.textContent = content;
  ul.appendChild(li);
  //appending delete button
  const editbtn = document.createElement('input');
  editbtn.setAttribute('type', 'button');
  editbtn.setAttribute('value', 'edit');
  editbtn.setAttribute('name', 'edit' + id);
  editbtn.setAttribute('onclick', 'editbutton(event)');
  li.append(editbtn);
  //appending edit button
  const deletebtn = document.createElement('input');
  deletebtn.setAttribute('type', 'button');
  deletebtn.setAttribute('value', 'delete');
  deletebtn.setAttribute('name', 'delete' + id);
  deletebtn.setAttribute('onclick', 'deletebutton(event)');
  li.appendChild(deletebtn);

};

function deletebutton(e){
  console.log(e);
  nameOfbtn = e.target.attributes[2].nodeValue;
  btnNumber = (nameOfbtn.slice(6, ));
  axios
    .delete('https://crudcrud.com/api/6a7c68fcd64f4993927497689c43f4bf/AppData/'+btnNumber)
    .then((res)=>{
      ul.innerHTML=""
      refresh()
    })

    .catch(err=>console.log(err))
}


function editbutton(e) {
  console.log(e);
  nameOfbtn = e.target.attributes[2].nodeValue;
  btnNumber = (nameOfbtn.slice(4, ));

    axios.put('https://crudcrud.com/api/6a7c68fcd64f4993927497689c43f4bf/AppData/'+btnNumber)
      .then(res=>showOutput(res))
      .catch(err=>console.log(err))

}

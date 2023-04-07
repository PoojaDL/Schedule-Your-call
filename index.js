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
    axios.post("https://crudcrud.com/api/0e33b134a57441ccad363945de892b3b/AppData", list)
      .then((response) => {
        showData(response.data)
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    alert("Enter data to continue !");
  }
}


// function to print list

function showData(obj) {

  //appending list
  let li = document.createElement('li');
  let content=obj.name+"-"+obj.email+"-"+obj.phone+" ";
  li.textContent = content;
  ul.appendChild(li);
  //appending delete button
  const editbtn = document.createElement('input');
  editbtn.setAttribute('type', 'button');
  editbtn.setAttribute('value', 'edit');
  li.append(editbtn);
  //appending edit button
  const deletebtn = document.createElement('input');
  deletebtn.setAttribute('type', 'button');
  deletebtn.setAttribute('value', 'delete');
  li.appendChild(deletebtn);

};

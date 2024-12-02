function validateForm() {
    let x = document.forms["contactPage"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
    if (x==" ") {
      alert("Name must be filled out")
    }
  }


function removeSpecialChars() {
    const input = document.getElementById('fname');
    input.value = input.value.replace(/[^A-Za-z ]/g, '');
  }


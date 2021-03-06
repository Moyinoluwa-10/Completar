const email = document.getElementById("email");
const password = document.getElementsByClassName("pass");
const form = document.querySelector("#form");

const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


form.addEventListener('submit', function (e) {
  e.preventDefault();

if(email.value === ''){
  email.classList.add('error');
  alert('Email is required');
}else if (!isValidEmail) {
  alert('Provide a valid email address');
}

if(password.value === ''){
  password.classList.add('error');
  alert('Password is required');
} 

else{
      const prePayload = new FormData(form);
      const payload = new URLSearchParams(prePayload);
      console.log([...payload]);
      fetch('https://todo22a.herokuapp.com/api/v1/user/login', {
        method: 'POST',
        body: payload,
        redirect: 'follow'
      })
        .then(function (res) {
            console.log(res.status);
            if (res.status === 404) {
                alert(`User with email does not exist.`)
            } else if (res.status === 401) {
                alert(`Incorrect password, try again!`)
            } else {
                setTimeout(openNew, 2000)
                function openNew() {
                  if(email.value === '' || password.value === '' ){
                      return false
                  }else{
                    alert("Welcome!");
                    window.open("../skip/index.html", target = "_self")
                  }
            
              }
            }
            // if(!res.ok) {
            //     throw new Error("HTTP status " + res.status);
            // }
            return res.json();
        })
        .then(data => console.log(data))
        .catch(err => console.log('err', err))

    }       
})

const alert = document.querySelector('.alert');
const submit = document.getElementById('submit');
const form = document.getElementById('register');

const alerts = () => {
  alert.classList.add('show');

  setTimeout(function(){
    alert.classList.remove('show');
    form.reset();
  }, 5000)
}

submit.addEventListener('click', function(e){
  e.preventDefault();
  alerts();
});


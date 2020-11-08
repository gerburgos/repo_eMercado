Swal.fire({
  title: "Welcome!",
  text: "I hope you like my website",
  icon: "info",
  backdrop: true,
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false,
  closeOnClickOutside: false,
  allowOutsideClick: false

});

function designSign() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Sign Out Google',
    text: "Are you sure?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',


  }).then((result) => {
    if (result.value) {
      swalWithBootstrapButtons.fire({
        title: 'Signed Out Successfully',
        text: 'Google Sign Out',
        icon: 'success',
        showConfirmButton: false
      })
      location.href = "index.html";
      deleteUser();

    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Successfully Cancelled',
        'Sign Out Cancelled',
        'error'
      );
    }
  })
}

function cancelFunction() {
  Swal.fire({
    title: 'Signed Out Successfully',
    text: 'Google Sign Out',
    icon: 'success',
    showConfirmButton: false
  });
}
function loadingData() {
  let timerInterval
  Swal.fire({
    title: 'User Data',
    text: 'Data successfully modified',
    icon: 'success',
    showConfirmButton: false,
    html: 'I will close in <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    closeOnClickOutside: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getContent()
        if (content) {
          const b = content.querySelector('b')
          if (b) {
            b.textContent = Swal.getTimerLeft()
          }
        }
      }, 100)
    },
    onClose: () => {
      clearInterval(timerInterval);
      window.location.reload();
    }
  })
}

function errUser(e) {
  Swal.fire({
    title: "Error",
    text: "User Unknown",
    icon: "error",
    backdrop: true,
    showConfirmButton: true,
    closeOnClickOutside: false,
    allowOutsideClick: false,
    confirmButtonText: '<a style="color: white;" href="index.html">OK</a>', 
  }),e.preventDefault();
  e.stopPropagation();
}
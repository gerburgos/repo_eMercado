Swal.fire({
    title: "Welcome!",
    text: "I hope you like my website",
    icon: "info",
    backdrop: true,
    timer: 5000,
    timerProgressBar: true,
    showConfirmButton: false,
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

            location.href = "https://gerburgos.github.io/repo_eMercado/login.html";

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

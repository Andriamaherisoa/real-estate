const loginBtn = $('.login-btn');
const signIn = $('.signin-btn');

loginBtn.on('click', ()=> {
    $('#modal-login').modal('show');
})

signIn.on('click', () => {
    $('#modal-signin').modal('show');
});




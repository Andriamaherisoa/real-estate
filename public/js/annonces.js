const deleteBtn = $('.delete');

deleteBtn.on('click', (event)=> {
    $('#confirm-delete').modal('show');
});
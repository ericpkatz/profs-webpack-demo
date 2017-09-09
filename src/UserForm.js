function UserForm(config){
  var container = $(config.id);
  var template = `
    <div>
      <input type='text'>
      <button>Save</button>
    </div>
    `;
  container.empty();
  var $html = $(template);
  $html.on('click', 'button', function(){
    config.onSave({ name: $(this).prev().val()});
  });
  container.append($html);
}

import $ from 'jquery';

function UserForm({ id, onSave }){
  var container = $(id);
  var template = `
    <div>
      <input type='text'>
      <button>Insert</button>
    </div>
    `;
  container.empty();
  var $html = $(template);
  $html.on('click', 'button', function(){
    onSave({ name: $(this).prev().val()});
  });
  container.append($html);
}

export default UserForm;

import $ from 'jquery';

function UserList({ id, onDelete, users }){
  var container = $(id);
  var template = `
    <ul>
    ${ users.map(function(user){
      return `
        <li data-id='${user.id}'>${ user.name }</li>
        `;
    }).join('') }
    </ul>
    `;
  container.empty();
  var $html = $(template);
  $html.on('click', 'li', function(){
    onDelete($(this).attr('data-id')*1);
  });
  container.append($html);

}

export default UserList;

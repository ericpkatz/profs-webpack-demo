function UserList(config){
  var container = $(config.id);
  var template = `
    <ul>
    ${ config.users.map(function(user){
      return `
        <li data-id='${user.id}'>${ user.name }</li>
        `;
    }).join('') }
    </ul>
    `;
  container.empty();
  var $html = $(template);
  $html.on('click', 'li', function(){
    config.onDelete($(this).attr('data-id')*1);
  });
  container.append($html);

}

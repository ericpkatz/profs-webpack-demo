import $ from 'jquery';
import UserForm from './UserForm';
import UserList from './UserList';

var users;



function renderUserList(users){
  UserList({
    id: '#userList',
    users: users,
    onDelete: function(id){
      $.ajax({
        method: 'DELETE',
        url: `/api/users/${id}`
      })
      .then(function(){
        users = users.filter(function(user){
          return user.id !== id;
        });
        renderUserList(users);
      });
    }
  });
}

function renderUserForm(){
  UserForm({
    id: '#userForm',
    onSave: function(data){
      $.post('/api/users', data)
        .then(function(user){
          users.push(user);
          renderUserForm();
          renderUserList(users);
        });
    }
  });
}

$.get('/api/users')
  .then(function(_users){
    users = _users;
    renderUserList(users);
  });

renderUserForm();

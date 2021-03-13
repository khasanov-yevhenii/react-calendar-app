import React, { useState, useRef } from 'react';

import User from '../assets/user';
import Admin from '../assets/admin';

const userNames = ['John', 'Sam', 'Ann', 'Thomas'];
const users = [
  ...userNames.map((name, index) => new User(index + 1, name)),
  new Admin(5, 'Eve'),
];

function LoginPopup(props) {
  const { overlayRef, setIsAdmin } = props;
  const [selectedUser, setSelectedUser] = useState('1');
  const loginPopupRef = useRef();

  const handleChangeUser = ({ target }) => {
    setSelectedUser(target.value);
  };

  const handleOnClick = () => {
    const isAdminParam = users.find(({ id }) => id === +selectedUser).isAdmin;
    setIsAdmin(isAdminParam);
    overlayRef.current.classList.remove('overlay_active');
    loginPopupRef.current.classList.remove('popup_active');
  };

  return (
    <form className="popup" ref={loginPopupRef}>
      <label htmlFor="loginMembers">
        <div className="select app__header-select">
          <select className="select__inner js-auth-select" name="loginMembers" value={selectedUser} onChange={handleChangeUser}>
            <option value="1" defaultValue>John</option>
            <option value="2">Sam</option>
            <option value="3">Ann</option>
            <option value="4">Thomas</option>
            <option value="5">Eve</option>
          </select>
        </div>
        <button className="popup__btn" type="button" onClick={handleOnClick}>Confirm</button>
      </label>
    </form>
  );
}

export default LoginPopup;

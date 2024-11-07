import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../data/repository';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.SID !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error);
    }
  };

  const handleDetails = (id) => {
    navigate(`/users/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.SID}>
            <span>{user.username} - {user.email}</span>
            <div>
              <button className="details-button" onClick={() => handleDetails(user.SID)}>Details</button>
              <button className="delete-button" onClick={() => handleDelete(user.SID)}>Block</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;





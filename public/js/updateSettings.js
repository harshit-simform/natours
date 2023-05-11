import axios from 'axios';
import { showAlert } from './alert';
// type is either 'password' or 'user-data'
export const updateSettings = async (data, type) => {
  try {
    const urlEndPoint = type === 'password' ? 'updateMyPassword' : 'updateMe';
    const result = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/users/${urlEndPoint}`,
      data,
    });

    if (result.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

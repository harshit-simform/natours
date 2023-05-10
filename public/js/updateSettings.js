import axios from 'axios';
import { showAlert } from './alert';
export const updateData = async (name, email) => {
  try {
    const result = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/updateMe',
      data: { name, email },
    });

    if (result.data.status === 'success') {
      showAlert('success', 'data updated successfully');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

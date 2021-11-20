import { toast } from 'react-toastify';

const appToast = {
  info: (message: string): void => {
    toast.info(message);
  },
  error: (message: string): void => {
    toast.error(message);
  },
  success: (message: string): void => {
    toast.success(message);
  },
};

export default appToast;

export const handlingError = (message: string, error: any) => {
  return {
    result: 'ERROR',
    data: error,
    message,
  };
};

export const rgx = (params: string) => {
  return { $regex: new RegExp(`.*${params}.*`), $options: 'i' };
};

export const generateRandomString = (length = 10) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

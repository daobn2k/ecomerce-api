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

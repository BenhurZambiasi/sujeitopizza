export const validateEmail = (value: string): boolean => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(value);
};

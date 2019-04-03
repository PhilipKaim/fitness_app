export const getUser = ({image, firstName, token}) => ({
  type: 'GET_USER',
  image,
  firstName,
  token
});

export const showAlert = (message) => ({
  type: 'SHOW_ALERT',
  message
});
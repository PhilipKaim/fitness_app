export const getUser = ({image, firstName, token, goal}) => ({
  type: 'GET_USER',
  image,
  firstName,
  goal,
  token
});

export const showAlert = (message) => ({
  type: 'SHOW_ALERT',
  message
});
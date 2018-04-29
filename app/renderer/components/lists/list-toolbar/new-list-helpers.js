/* eslint-disable import/prefer-default-export */
export const validateName = (lists, value) => {
  const conflictingName = lists.find(({ name }) => name === value);
  if (conflictingName) return 'A list with this name already exists';
  return undefined;
};

/**
 * This function returns all contacts that match the assignee IDs.
 */
export function getInitials(name: string): string {
  let names = name.split(' ', 2);
  let firstName = names[0];
  if (name === '') {
    return '';
  } else if (names.length === 1) {
    return firstName[0];
  } else {
    let lastName = names[1];
    return firstName[0] + lastName[0];
  }
}

/**
 * This functions returns a random user color.
 */
export function getUserColor(): string {
  let colorNumber = Math.floor(Math.random() * 15);
  return `user-color${colorNumber}`;
}

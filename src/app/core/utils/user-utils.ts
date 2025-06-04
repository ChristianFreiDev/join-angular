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

export function getUserColor(): string {
    let colorNumber = Math.floor(Math.random() * 15);
    return `user-color${colorNumber}`;
}
export const convertDate = (date: string): Date => {
    const dateString = date;
    const dateParts = dateString.split("-"); // Split the string into an array of parts
    const year = parseInt(dateParts[0]); // Extract the year
    const month = parseInt(dateParts[1]) - 1; // Extract the month (Note: JavaScript months are zero-based)
    const day = parseInt(dateParts[2]); // Extract the day

    return new Date(year, month, day);
};
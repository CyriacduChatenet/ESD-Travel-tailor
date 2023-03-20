export const formatDateUtil = (date: Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
}

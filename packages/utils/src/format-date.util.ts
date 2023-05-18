export const formatDateUtil = (date: Date, displayHours: boolean) => {
    const newDate = new Date(date);
    if(displayHours) {
      return newDate.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } else {
      return newDate.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
      });
    }
}

export const sortDatebyASC = (a: { date: Date }, b: { date: Date }) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
}
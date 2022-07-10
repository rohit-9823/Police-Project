var today = new Date();
export const  currenttime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
export const currentdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

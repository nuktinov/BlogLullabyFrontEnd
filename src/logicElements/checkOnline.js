export default function checkOnline(date) {
    const nowDate = new Date();
    const lastVisit = new Date(date);
    if(nowDate - lastVisit < 500000) {
      return "online"
    }
  return "offline";  
}
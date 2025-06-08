import { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";
import Login from "../Login/Login";

const Home = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    handleVerifyLogin();
  }, [])

  const sameDay = (dataISO) => {
    const today = new Date();
    const storageDate = new Date(dataISO);

    return (
      today.getFullYear() === storageDate.getFullYear() &&
      today.getMonth() === storageDate.getMonth() &&
      today.getDate() === storageDate.getDate()
    );
  };


  const handleVerifyLogin = () => {
    const dataStorage = localStorage.getItem('data');
    if (dataStorage) {
      const data = JSON.parse(dataStorage);

      if (!sameDay(data.time)) {
        localStorage.removeItem('data');
      } else {
        setLogged(true)
      }
    }
  }

  return (
    <>
      {logged ? <Calendar setLogged={setLogged} /> : <Login setLogged={setLogged} />}
    </>
  )
}

export default Home;
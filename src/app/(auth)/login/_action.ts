import axios from 'axios';

export async function checkLogin (e:  React.FormEvent<HTMLFormElement>){

   e.preventDefault();
    const data = new FormData(e.currentTarget);

    const email = data.get("email") as string;
    const password = data.get("password") as string;
    try {
      const res = await axios.post("/api/login", { email, password });


      return {res, email}
      
    } catch (error) {
      console.log(error);
    }}
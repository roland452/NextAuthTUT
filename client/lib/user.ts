import axios from 'axios'

export type UserProps = {
  name: string;
  email: string;
}


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000',
  withCredentials: true
})


export function getErrorMessage(err: unknown) : string {
  if(axios.isAxiosError(err)) {
    return err.response?.data.message ?? 'something went wrong'
  }
  return 'something went wrong';
}



export async function login(
  email:string,
  password:string,
): Promise<UserProps> {
  const res = await api.post(`/api/auth/login`,{
    email,
    password
  })
  return res.data.user;
}


export async function signup(
  name:string,
  email:string,
  password:string,
): Promise<UserProps> {
  const res = await api.post(`/api/auth/signup`,{  
    name,
    email,
    password
  })
  return res.data.user;
}



export async function verifyUser() : Promise<UserProps> {
  const res = await api.get(`/api/auth/me`)
  return res.data.user;
}




export async function logoutUser() : Promise<void> {
  await api.post('/api/auth/logout')
}

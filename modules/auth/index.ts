
/**
 * Check the login details
 *
 * @param username
 * @param password
 */

 const uname = "alfie@gmail.com"
 const pass = "password"
export default (username: string, password: string): Promise<boolean> =>{
  console.log(uname, pass)
  return new Promise<boolean>((res,rej) =>
    res(username === uname && password === pass),
  );
}
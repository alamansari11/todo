import { Link } from 'react-router-dom';

function Login() {
  return (
  <div className='login'>
  <section>
    <form action="" method="post">
      <input type="email" name="email" id="" placeholder="Email"/>
      <input type="password" name="password" id="" placeholder="Password"/>
      <button type="submit">Login</button>
      <h4>OR</h4>
      <Link to="/register">Sign up</Link>
    </form>
  </section>

  </div>
  )
}
export default Login;
import Navigate from '../components/Navbar';
// import NavigateLogin from '../components/NavbarLogin';
// import SignIn from '../components/SignIn';
// import SignUp from '../components/SignUp';
import Filter from '../components/Filter';
import Content from '../components/Content';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css";
// import NavigateDetailProperty from '../components/NavbarDetailProperty';
// import Col from 'react-bootstrap/Col';

function home (props) { 
  return (
    // <SignUp />
    <div>
      <Navigate  userSignIn = {props.userSignIn} setUserSignIn={props.setUserSignIn}/>
      <div className='mx-4'>
         <Row>
         <Filter />
         <Content
         className=""/>
         </Row>
      </div>
    </div>
  );
}

export default home;
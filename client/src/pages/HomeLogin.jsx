// import Navigate from '../components/Navbar';
// import DetailProperty from '../components/DetailProperty';
import NavigateLogin from '../components/NavbarLogin';
// import SignIn from '../components/SignIn';
// import SignUp from '../components/SignUp';
// import Filter from '../components/Filter';
// import Content from '../components/Content';
// import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css";
// import Col from 'react-bootstrap/Col';

function homeLogin () {
  return (
    // <SignUp />
    <div>
      {/* <Navigate /> */}
      <NavigateLogin />
      <div>
      {/* <DetailProperty /> */}
      </div>
      {/* <div className='mx-4'>
         <Row>
         <Filter />
         <Content 
         className=""/>
         </Row>
      </div> */}
    </div>
  );
}

export default homeLogin;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice";
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {setCredentials} from '../slices/authSlice'
import Loader from '../components/Loader';

const RegiserScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state) => state.auth);

  const [register, {isLoading}] = useRegisterMutation();

  useEffect(() => {
    if(userInfo){
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error('Password do not match')
      return;
    }
    try {
      const res = await register({email, name, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/');
    } catch (err) {
      toast.error(err?.error.message || err?.message)
    }
  };

  return (
    <FormContainer>
      <h1>Sing Up</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className="my-2" controlId="name">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          ></Form.Control>
          {isLoading &&  <Loader/>}
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>
        <Row className="py-3">
          <Col>
            Already have an accound? <Link to={"/login"}>Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegiserScreen;

import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../Redux/Auth/Action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import wizDriveImage from '../../assets/IMG_5544.png';

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Required"),
});

const Signup = () => {
  const initialValues = { email: "", username: "", password: "", name:"" };
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store);
const navigate=useNavigate();
const toast = useToast();
console.log("auth :-",auth.signup?.username)

  const handleSubmit = (values,actions) => {
    dispatch(signupAction(values))
    console.log("signup",values);
    actions.setSubmitting(false);
  };

  useEffect(()=>{
if(auth.signup?.username){
  
  navigate("/login")
  toast({
    title: 'Account created successfully',
    status: 'success',
    duration: 8000,
    isClosable: true,
  })
}
  },[auth.signup])

  return (
    <div>
        <div className="border border-slate-300 ">
      <Box p={8} display="flex" flexDirection="column" alignItems="center">
        <img
          className="border border-red-800"
         src={wizDriveImage}
          alt=""
        />
        <p className="font-bold opacity-50 text-lg mb-10 text-center">
        🌙 Start sharing your photography adventures today!
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="w-full">
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    mb={4}
                  >
                    <Input
                      className="w-full"
                      {...field}
                      id="email"
                      placeholder="Enter Your Email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                    mb={4}
                  >
                    <Input {...field} id="username" placeholder="Enter username" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    mb={4}
                  >
                    <Input {...field} id="name" placeholder="Enter Full Name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                    mb={4}
                  >
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Enter Password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <p className="text-center">
              
              </p>
              <p className="mt-5 text-center">
              
              </p>
              <Button
                className="w-full"
                mt={4}
                colorScheme="blue"
                type="submit"
                isLoading={formikProps.isSubmitting}
              >
                Sign Up to the system
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
    <div className="w-full border border-slate-300 mt-5">
       <p className="text-center py-2">If You Have Already Account <span onClick={()=>navigate("/login")} className="ml-2 text-blue-700 cursor-pointer">Sign In</span></p>
    </div>
    </div>
  
  );
};

export default Signup;

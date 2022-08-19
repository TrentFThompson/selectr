//
//  File:         SignupForm.tsx
//  Description:  Exports the SignupForm component
//

// Installed imports
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

// Custom imports
import { useMessage } from "@/context/message-context";
import AuthApi from "@/api/auth";

//
//  Component:    SignupForm
//  Description:  A componenet to sign up to the system
//
export default function SignupForm() {
  const { failure, success } = useMessage();
  const [successState, setSuccessState] = useState(false);

  //
  // Function:    onSubmit
  // Description: Handles submitting the sign up form
  // Parameters:  e: SyntheticEvent - the event object
  // Returns:     n/a
  //
  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();

    // Cast target to get params
    const { displayName, email, password, passwordConfirmation } =
      e.target as typeof e.target & {
        displayName: { value: string };
        email: { value: string };
        password: { value: string };
        passwordConfirmation: { value: string };
      };

    // Try to sign up
    try {
      await AuthApi.signup(
        displayName.value,
        email.value,
        password.value,
        passwordConfirmation.value
      );
      success("Account successfully created.");
      setSuccessState(true);
    } catch {
      failure("There was an issue signing up. Try again later.");
    }
  }

  return (
    <Flex
      pl="16"
      pr="16"
      borderRadius={"md"}
      boxShadow={"lg"}
      flexDirection="column"
    >
      {/* Conditional render based on submission status */}
      {successState ? <Success /> : <Form onSubmit={onSubmit} />}
    </Flex>
  );
}

//
//  Component:    Success
//  Description:  The Success component to display on form submit
//
function Success() {
  return (
    <Center flexDirection={"column"} p="10">
      <Heading size={"lg"}>Hooray!</Heading>
      <Text pb="4">Your account has been created!</Text>
      <Link href={"/login"}>
        <a>
          <Text as="u" color={"black"}>
            Click here to log in.
          </Text>
        </a>
      </Link>
    </Center>
  );
}

//
//  Component:    Form
//  Description:  The Form component to display before form submit
//
function Form({ onSubmit }: { onSubmit: (e: SyntheticEvent) => void }) {
  return (
    <Center flexDirection={"column"} p="10">
      <Heading>Selectr Signup</Heading>
      <Flex flexDir={"column"} pt="10">
        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel>Display Name</FormLabel>
            <Input
              name="displayName"
              type={"text"}
              placeholder="display name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" type={"text"} placeholder="email" />
          </FormControl>
          <FormControl pt="2">
            <FormLabel>Password</FormLabel>
            <Input name="password" type={"password"} placeholder="password" />
          </FormControl>
          <FormControl pt="2">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name="passwordConfirmation"
              type={"password"}
              placeholder="password"
            />
          </FormControl>
          <Center pt="4" pb="4">
            <Button type="submit" color={"white"} bg={"brand"} width="100%">
              Sign Up
            </Button>
          </Center>
        </form>
        <Link href={"/login"}>
          <a>
            <Text as="u" color={"black"}>
              Already have an account? Click here to login.
            </Text>
          </a>
        </Link>
      </Flex>
    </Center>
  );
}

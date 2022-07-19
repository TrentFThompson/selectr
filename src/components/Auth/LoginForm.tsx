//
//  File:         LoginForm.tsx
//  Description:  Exports the LoginForm component
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
import { SyntheticEvent } from "react";
import { useRouter } from "next/router";

// Custom imports
import { useMessage } from "@/context/message-context";
import { useAuth } from "@/context/auth-context";

//
//  Component:    LoginForm
//  Description:  A componenet to log in to the system
//
export default function LoginForm() {
  const { failure } = useMessage();
  const { login } = useAuth();
  const router = useRouter();

  //
  // Function:    onSubmit
  // Description: Handles submitting the login form
  // Parameters:  e: SyntheticEvent - the event object
  // Returns:     n/a
  //
  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();

    // Cast target to get params
    const { email, password } = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    // Try to login and show error message if invalid
    try {
      await login(email.value, password.value);
      router.push("/");
    } catch {
      failure("There was an issue logging in. Try again later.");
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
      <Center flexDirection={"column"} p="10">
        <Heading>Selectr Login</Heading>
        <Flex flexDir={"column"} pt="10">
          <form onSubmit={onSubmit}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="email" type={"text"} placeholder="email" />
            </FormControl>
            <FormControl pt="2">
              <FormLabel>Password</FormLabel>
              <Input name="password" type={"password"} placeholder="password" />
            </FormControl>
            <Center pt="4" pb="4">
              <Button type="submit" bg={"green"} width="100%">
                Login
              </Button>
            </Center>
          </form>
          <Link href={"/signup"}>
            <a>
              <Text color={"blue"}>
                Don&apos;t have an account? Click here to sign up.
              </Text>
            </a>
          </Link>
        </Flex>
      </Center>
    </Flex>
  );
}

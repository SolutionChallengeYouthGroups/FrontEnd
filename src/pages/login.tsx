import { Button, Flex, Heading, Icon, VStack } from "@chakra-ui/react";
import firebase from "../firebase";
import { Form, Formik } from "formik";
import React from "react";
import { FaGoogle, FaUserSecret } from "react-icons/fa";
import { useRouter } from "next/router";
import isEmail from "validator/lib/isEmail";
import TextInput from "../components/forms/TextInput";

interface Props {}

const login = () => {
    // page to login
    const router = useRouter();
    const { next: next_query } = router.query;
    let next = "/";
    if (typeof next_query === "string") {
        next = next_query;
    }
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            router.push(next);
        }
    });

    const signInWithGoogle = () => {
        // sign up with google
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(() => {
                // continue to home page
                router.push(next);
            })
            .catch((error) => {
                firebase.auth().signInWithRedirect(provider);
            });
    };

    const signInAnonymously = () => {
        firebase
            .auth()
            .signInAnonymously()
            .then(() => {
                router.push(next);
            })
            .catch((error) => console.log(error));
    };

    return (
        <Flex
            w="100vw"
            h="100%"
            justifyContent="center"
            alignItems="center"
            flexGrow={2}
        >
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values, actions) => {
                    let { email, password } = values;
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(email, password)
                        .then(() => {
                            router.push(next);
                        })
                        .catch((error) => {
                            switch (error.code) {
                                case "auth/invalid-email":
                                    actions.setFieldError(
                                        "email",
                                        "Invalid Email"
                                    );
                                    break;
                                case "auth/wrong-password":
                                    actions.setFieldError(
                                        "password",
                                        "Wrong Password"
                                    );
                            }
                        });
                }}
                validate={(values) => {
                    let errors: any = {};
                    if (!isEmail(values.email)) {
                        errors.email = "Invalid email adress";
                    }
                    return errors;
                }}
            >
                <Form style={{ width: "100%", maxWidth: "300px" }}>
                    <VStack w="100%">
                        <Heading
                            as="h1"
                            size="xl"
                            pb="10px"
                            mb="20px"
                            px="8px"
                            borderBottom="2px solid"
                            borderColor="main"
                        >
                            Login
                        </Heading>
                        <TextInput
                            name="email"
                            type="text"
                            label="Email"
                            placeholder="john.doe@gmail.com"
                            required
                        />
                        <TextInput
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="secretPassword123"
                            required
                        />
                        <Button w="100%" type="submit">
                            Login
                        </Button>
                        <Button
                            w="100%"
                            leftIcon={<Icon as={FaGoogle} />}
                            variant="solid"
                            colorScheme="blue"
                            onClick={signInWithGoogle}
                        >
                            Login with Google
                        </Button>
                        <Button
                            w="100%"
                            leftIcon={<Icon as={FaUserSecret} />}
                            variant="incognito"
                            onClick={signInAnonymously}
                        >
                            Login Anonymously
                        </Button>
                    </VStack>
                </Form>
            </Formik>
        </Flex>
    );
};

export default login;

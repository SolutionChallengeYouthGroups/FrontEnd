import { Flex, VStack, Button, Icon, Box, Heading } from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import firebase from "../firebase";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import TextInput from "../components/forms/TextInput";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { set } from "typesaurus";
import { users } from "../firestoreCollections";

interface form {
    name: string;
    email: string;
    username: string;
    password: string;
}

const createUser = async (
    result: firebase.auth.UserCredential,
    form?: form
) => {
    // after signing up, this funciton will add the user to the User colleciton in firestore
    let user = result.user;
    if (!user) {
        return;
    }
    if (result.additionalUserInfo?.providerId == "password" && form) {
        // if the user used email/password, get the info from the form
        await set(users, user.uid, {
            createdAt: firebase.firestore.Timestamp.now(),
            email: form.email,
            groups: [],
            name: form.name,
            username: form.username,
        });
    }
    if (result.additionalUserInfo?.providerId == "google.com") {
        // if user signed up using google, get info from his google account
        await set(users, user.uid, {
            createdAt: firebase.firestore.Timestamp.now(),
            email: user.email ?? "",
            groups: [],
            name: user.displayName ?? "",
            // there's a bug in types with firebase ignore this:
            username: result.additionalUserInfo?.profile.given_name ?? "",
        });
    }
};

const signup = () => {
    // page to signup with google
    const router = useRouter();

    const signUpWithGoogle = () => {
        // sign up with google
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(async (result) => {
                // create user then continue to home page
                await createUser(result);
                router.push("./");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    username: "",
                    password: "",
                }}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values, actions) => {
                    let { email, password } = values;
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(async (result) => {
                            await createUser(result, values);
                            router.push("./");
                        })
                        .catch((error) => {
                            switch (error.code) {
                                case "auth/email-already-in-use":
                                    actions.setFieldError(
                                        "email",
                                        "Email already used, try to login"
                                    );
                            }
                        });
                }}
                validate={(values) => {
                    let errors: any = {};
                    if (!isEmail(values.email)) {
                        errors.email = "Invalid email adress";
                    }
                    if (
                        !isStrongPassword(values.password, {
                            minLength: 8,
                            minNumbers: 1,
                            minUppercase: 0,
                            minSymbols: 0,
                        })
                    ) {
                        errors.password = "Please use a strong password";
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
                            borderBottom="2px solid"
                            borderColor="main"
                            px="8px"
                        >
                            Sign Up
                        </Heading>
                        <TextInput
                            name="name"
                            label="Name"
                            type="text"
                            placeholder="John Doe"
                            required
                        />
                        <TextInput
                            name="email"
                            label="Email"
                            type="text"
                            placeholder="john.doe@gmail.com"
                            required
                        />
                        <TextInput
                            name="username"
                            label="Username"
                            type="text"
                            placeholder="JohnD23"
                            required
                        />
                        <TextInput
                            name="password"
                            label="Passowrd"
                            type="password"
                            placeholder="superSecretPassword123"
                            required
                        />

                        <Button w="100%" name="signUp" type="submit">
                            Sign Up
                        </Button>

                        <Box
                            h="1px"
                            w="100%"
                            borderBottom="2px"
                            borderColor="#595959"
                        />

                        <Button
                            name="google"
                            w="100%"
                            leftIcon={<Icon as={FaGoogle} />}
                            variant="solid"
                            colorScheme="blue"
                            onClick={signUpWithGoogle}
                        >
                            Sign Up with Google
                        </Button>
                    </VStack>
                </Form>
            </Formik>
        </Flex>
    );
};

export default signup;

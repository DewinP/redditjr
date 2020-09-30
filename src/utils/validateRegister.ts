import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 3) {
    return [
      {
        field: "username",
        message: "username length should be greater than 3",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username cannot include the '@' sign",
      },
    ];
  }

  if (options.email.length === 0) {
    return [
      {
        field: "email",
        message: "Email field can not be empty",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Please use a valid email. eg 'john@gmail.com'",
      },
    ];
  }

  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "password length should be greater than 3",
      },
    ];
  }

  return null;
  //return null if no errors are found
};

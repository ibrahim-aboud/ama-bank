export default function userCredsValidator(userName, Password) {
  var ArrayError = [];

  if (
    userName === null ||
    userName === undefined ||
    Password === null ||
    Password === undefined
  ) {
    if (userName === null) {
      ArrayError.push("Le nom d'utilisateur est a null");
    }
    if (userName === undefined) {
      ArrayError.push("Le nom d'utilisateur est indefini");
    }
    if (Password === null) {
      ArrayError.push("Le mot de passe est a null");
    }
    if (Password === undefined) {
      ArrayError.push("Le mot de passe est indefini");
    }

    return {
      error: true,
      errorList: ArrayError,
    };
  } else {
    if (
      userName.length < 5 ||
      Password.length < 5 ||
      /[^a-zA-Z0-9_-]/g.test(userName) == true ||
      /[^a-zA-Z0-9_-]/g.test(Password) == true
    ) {
      if (userName.length < 5) {
        ArrayError.push("Le nom d'utilisateur contient moins de 5 caracteres");
      }

      if (Password.length < 5) {
        ArrayError.push("Le mot de passe contient moins de 5 caracteres");
      }

      if (/[^a-zA-Z0-9_-]/g.test(userName) == true) {
        ArrayError.push(
          "Le nom d'utilisateur contient des caracteres speciaux"
        );
      }

      if (/[^a-zA-Z0-9_-]/g.test(Password) == true) {
        ArrayError.push("Le mot de passe contient des caracteres speciaux");
      }

      return {
        error: true,
        errorList: ArrayError,
      };
    } else {
      return {
        error: false,
        errorList: [],
      };
    }
  }
}

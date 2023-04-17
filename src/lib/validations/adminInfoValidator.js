import userCredsValidator from "./userCredsValidator";

export default function adminInfoValidator(admin) {
  if (!admin || !admin.id) {
    return {
      error: true,
      errorList: ["invalid admin !!"],
    };
  }

  const checkCreds = userCredsValidator(admin.username, admin.password);
  if (checkCreds.error) {
    return checkCreds;
  }

  if (!admin.role || !["admin", "superadmin"].includes(admin.role)) {
    return {
      error: true,
      errorList: ["Le role de l'admin est invalide"],
    };
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g;
  if (!admin.email || !emailRegex.test(admin.email)) {
    return {
      error: true,
      errorList: ["L'email est invalide"],
    };
  }

  return {
    error: false,
    errorList: [],
  };
}

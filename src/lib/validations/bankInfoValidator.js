export default function bankInfoValidator(bank) {
  let error = false;

  let ArrayError = [];

  if (bank.id === null || bank.id === undefined) {
    error = true;
    ArrayError.push("Le champ bank ID n'a pas été rempli.");
  } else {
    if (isNaN(bank.id)) {
      error = true;
      ArrayError.push("Le champ bank ID ne contient pas un nombre.");
    } else {
      if (bank.id < 0) {
        error = true;
        ArrayError.push("Le champ bank ID contient un nombre négatif.");
      } else {
        if (Number.isInteger(bank.id) == false) {
          error = true;
          ArrayError.push("Le champ bank ID ne contient pas un nombre entier.");
        }
      }
    }
  }
  if (bank.name === null || bank.name === undefined) {
    error = true;
    ArrayError.push("Le nom de la banque n'a pas été saisi.");
  }
  if (bank.description === null || bank.description === undefined) {
    error = true;
    ArrayError.push("La description de la banque n'a pas été saisi.");
  }
  if (bank.visitsCount === null || bank.visitsCount === undefined) {
    error = true;
    ArrayError.push("Le champ bank's visit count n'a pas été rempli.");
  } else {
    if (isNaN(bank.visitsCount)) {
      error = true;
      ArrayError.push("Le champ bank's visit count ne contient pas un nombre.");
    } else {
      if (bank.visitsCount < 0) {
        error = true;
        ArrayError.push(
          "Le champ bank's visit count contient un nombre négatif."
        );
      }
      if (Number.isInteger(bank.visitsCount) == false) {
        error = true;
        ArrayError.push(
          "Le champ bank's visit count ne contient pas un nombre entier."
        );
      }
    }
  }
  if (bank.websiteLink === null || bank.websiteLink === undefined) {
    error = true;
    ArrayError.push("Le site de la banque n'a pas été saisi.");
  } else {
    if (
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
        bank.websiteLink
      ) == false
    ) {
      error = true;
      ArrayError.push(
        "Le champ bank's website ne contient pas un lien vers un site web."
      );
    }
  }
  if (bank.updateDate === null || bank.updateDate === undefined) {
    error = true;
    ArrayError.push("Le champ bank's update date est vide.");
  } else {
    if (/\b\d{4}-\d{2}-\d{2}\b/.test(bank.updateDate) == false) {
      error = true;
      ArrayError.push(
        "Le champ bank's update date ne respecte pas le format YYYY-MM-DD."
      );
    }
  }
  return {
    error,
    errorList: ArrayError,
  };
}

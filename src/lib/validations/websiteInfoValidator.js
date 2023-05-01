export default function websiteInfoValidator(websiteInfos) {
  let error = false;
  let errorList = [];

  const { id } = websiteInfos;
  const { description } = websiteInfos;
  const { phone } = websiteInfos;
  const { fax } = websiteInfos;
  const { email } = websiteInfos;
  const { facebook_link } = websiteInfos;
  const { linkedin_link } = websiteInfos;
  const { twitter_link } = websiteInfos;
  const { instagram_link } = websiteInfos;

  if (!id) {
    error = true;
    errorList.push("Le champ id n'a pas été rempli");
  } else {
    if (isNaN(id) || !Number.isInteger(id) || id < 0) {
      error = true;
      errorList.push("Le champ id est invalide");
    }
  }

  if (!description) {
    error = true;
    errorList.push("Le champ description n'a pas été rempli");
  }

  if (!phone) {
    error = true;
    errorList.push("Le champ phone n'a pas été rempli");
  } else {
    if (
      !/^0\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(phone) &&
      !/^\+(?:[0-9]\s?){6,14}[0-9]$/.test(phone)
    ) {
      error = true;
      errorList.push("le numero du tel est invalide");
    }
  }

  if (!fax) {
    error = true;
    errorList.push("Le champ fax n'a pas été rempli");
  } else {
    if (
      !/^0\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(fax) &&
      !/^\+(?:[0-9]\s?){6,14}[0-9]$/.test(fax)
    ) {
      error = true;
      errorList.push("le numero du fax est invalide");
    }
  }

  if (!email) {
    error = true;
    errorList.push("Le champ email n'a pas été rempli");
  } else {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = true;
      errorList.push("L'email est invalide");
    }
  }

  if (!facebook_link) {
    error = true;
    errorList.push("Le champ du lien facebook n'a pas été rempli");
  } else {
    if (
      !/^https?:\/\/(www\.)?facebook\.com\/([a-zA-Z0-9_\.]+)$/.test(
        facebook_link
      )
    ) {
      error = true;
      errorList.push("Le lien facebook est invalide");
    }
  }

  if (!linkedin_link) {
    error = true;
    errorList.push("Le champ du lien linkedin n'a pas été rempli");
  } else {
    if (
      !/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-z0-9]+\/?$/.test(
        linkedin_link
      )
    ) {
      error = true;
      errorList.push("Le lien linkedin est invalide");
    }
  }

  if (!twitter_link) {
    error = true;
    errorList.push("Le champ du lien twitter n'a pas été rempli");
  } else {
    if (
      !/^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}\/?$/.test(
        twitter_link
      )
    ) {
      error = true;
      errorList.push("Le lien twitter est invalide");
    }
  }

  if (!instagram_link) {
    error = true;
    errorList.push("Le champ du lien instagram n'a pas été rempli");
  } else {
    if (
      !/^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/[a-zA-Z0-9_]+$/.test(
        instagram_link
      )
    ) {
      error = true;
      errorList.push("Le lien instagram est invalide");
    }
  }

  return {
    error,
    errorList,
  };
}

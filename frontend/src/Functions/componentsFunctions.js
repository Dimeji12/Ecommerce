import { SCREEN_SIZES } from "../Data/globalVariables";

export function simpleValidationCheck(inputs) {
  let isFormValid = true;

  inputs.forEach((input) => {
    let addOrRemoveClass;

    if (input.name === "username") {
      const isUserNameContainsTwoWords = input.value.split(" ").length === 2;
      addOrRemoveClass = !isUserNameContainsTwoWords ? "add" : "remove";
    } else {
      addOrRemoveClass = input.value === "" ? "add" : "remove";
    }

    input.classList[addOrRemoveClass]("invalid");

    if (addOrRemoveClass === "add") {
      isFormValid = false;
    }
  });

  return isFormValid;
}


// export function repoStarsForksToolTipLeftPos(lang) {
//   switch (lang) {
//     case "ar":
//       return "55px";
//     case "ja":
//       return "92px";
//   }
//   return "77px";
// }

export function scrollToTopToolTipLeftPos(lang) {
  switch (lang) {
    case "ar":
      return "-55px";
    case "ja":
      return "-86px";
    case "ru":
      return "-84px";
    case "fr":
      return "-80px";
    case "hu":
      return "-104px";
    case "hi":
      return "-73px";
  }
  return "-60px";
}

export function favIconToolTipLeftPos(lang) {
  switch (lang) {
    case "ar":
      return "-40px";
    case "ja":
      return "-51px";
    case "ru":
      return "-52px";
    case "fr":
      return "-35px";
    case "hu":
      return "-43px";
    case "hi":
      return "-37px";
  }
  return "-41px";
}

export function detailsIconToolTipLeftPos(lang) {
  switch (lang) {
    case "ar":
      return "-37px";
    case "ja":
      return "-29px";
    case "ru":
      return "-47px";
    case "fr":
      return "-39px";
    case "hu":
      return "-47px";
    case "hi":
      return "-36px";
  }
  return "-39px";
}

export function trashcanIconToolTipLeftPos(lang) {
  switch (lang) {
    case "ar":
      return "-26px";
    case "ja":
      return "-29px";
    case "ru":
      return "-42px";
    case "fr":
      return "-36px";
    case "hu":
      return "-48px";
    case "hi":
      return "-29px";
  }
  return "-41px";
}

export function wishlistIconToolTipLeftPos(lang) {
  switch (lang) {
    case "ar":
      return "-54px";
    case "ja":
      return "-72px";
    case "ru":
      return "-51px";
    case "fr":
      return "-69px";
    case "hu":
      return "-57px";
    case "hi":
      return "-43px";
  }
  return "-39px";
}

export function sendToolTipLeftPos(lang) {
  switch (lang) {
    case "ar":
      return "-31px";
    case "ja":
      return "68px";
    case "ru":
      return "89px";
    case "fr":
      return "80px";
    case "hu":
      return "75px";
    case "hi":
      return "64px";
  }
  return "70px";
}

export function sendingToolTipLeftPos(lang) {
  switch (lang) {
    case "ar":
      return "-46px";
    case "ja":
      return "75px";
    case "ru":
      return "75px";
    case "fr":
      return "71px";
    case "hu":
      return "75px";
    case "hi":
      return "70px";
  }
  return "80px";
}

export function cartProductToolTipPos(lang) {
  switch (lang) {
    case "ar":
      return "56px";
    case "ja":
      return "-37px";
    case "fr":
      return "-55px";
    case "hu":
      return "-55px";
    case "hi":
      return "-37px";
  }
  return "-50px";
}

export function getElementWidth(element) {
  return element?.getBoundingClientRect()?.width;
}

export function getScrollSliderValue(sliderEle) {
  const GAP = 30;
  const { desktop, laptop } = SCREEN_SIZES;
  const sliderItemEle = sliderEle.children[0];
  const sliderItemEleWidth = getElementWidth(sliderItemEle) + GAP;

  if (window.innerWidth >= desktop + 300) {
    return sliderItemEleWidth * 4;
  }

  if (window.innerWidth >= desktop + 100) {
    return sliderItemEleWidth * 3;
  }

  if (window.innerWidth >= laptop) {
    return sliderItemEleWidth * 2;
  }

  return sliderItemEleWidth;
}

import {NUMPAD_ASCII_WITH_NUMLOCK, NUMPAD_ASCII_WITHOUT_NUMLOCK, NUM_ASCII, ASCII_SPACE, ASCII_ESC, ASCII_ENTER, KEY_VALUE_ASCII_ENTER, KEY_VALUE_ASCII_SPACE, KEY_VALUE_ASCII_ESC} from "../constants/Utile"

export const getValueFromAscii = (value) => {

  for (var i=0; i<=9; i++) {
    if(parseInt(NUM_ASCII[i]) === parseInt(value) || parseInt(NUMPAD_ASCII_WITH_NUMLOCK[i]) === parseInt(value) || parseInt(NUMPAD_ASCII_WITHOUT_NUMLOCK[i]) === parseInt(value)) {
      return i;
    }
  }

  switch (parseInt(value)) {
    case ASCII_ENTER:
      return KEY_VALUE_ASCII_ENTER;
    case ASCII_ESC:
      return KEY_VALUE_ASCII_ESC;
    case ASCII_SPACE:
      return KEY_VALUE_ASCII_SPACE;
    default:
      break;
  }
  return null;
};

export const getAnserIndexFromKeyValue = (value) => {

  switch (value) {
    case 1:
      return 0;
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 3;
    case 5:
      return -1;
    case 6:
      return 4;
    case 7:
      return 5;
    case 8:
      return 6;
    case 9:
      return 7;
    default:
      break;
  }
  return null;
}



/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {

  let choice;
  let str;
  
  while (choice !== 'kóða' && choice !== 'afkóða') {
    choice = prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“');
    if (choice === 'kóða' || choice === 'afkóða') {
      let n = parseInt(prompt('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]'), 10);
      if (n >= 1 && n <= 31) {
        str = prompt('Gefðu upp strenginn sem á að ' + choice +' með hliðrun ' + n + ':');
        if (typeof str !== 'string') {
          alert('Þú gafst ekki upp streng. Reyndu aftur.');
          choice = ''; //Byrjum allt ferlið frá byrjun
        }
        let invalid = new Array();
        let t = 0;
        for (let i = 0; i < str.length; i++) {
          if (LETTERS.includes(str[i].toLocaleUpperCase()) === false) {
            invalid[t] = str[i];
            t++;
          }
        }
        if (invalid.length !== 0) {
           alert('Þú gafst upp stafi sem ekki er hægt að ' + choice + ': ' + invalid.join(', ') + '. Reyndu aftur.');
           choice = ''; //Byrjum allt ferlið frá byrjun
        } 
        else {
          alert(str.toLocaleUpperCase());
          if (choice === 'kóða') {
            alert(encode(str, n).toLocaleUpperCase());
            break;
          }
          else if (choice === 'afkóða') {
            alert(decode(str, n).toLocaleUpperCase())
            break;
          }
        }
      }
      else {
        alert('„' + n + '“ er ekki heiltala á bilinu [1, 31]. Reyndu aftur.');
        choice = ''; //Byrjum allt ferlið frá byrjun
      }
    }
    else alert('Veit ekki hvaða aðgerð ' + choice + ' er. Reyndu aftur.');

  let again = confirm('Aftur?');
  if (again === false) 
    break;
  }
} 

start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  let newLocation = new Array();
  let result = '';
  for (let i = 0; i < str.length; i++) {
    newLocation[i] = LETTERS.indexOf(str[i].toLocaleUpperCase()) + n; //finnum staðsetningu stafanna í stafrófinu, 
                                                                      //hliðrum þeim um n til hægri og geymum í fylki
    if (newLocation[i] > 31) {
      newLocation[i] -= 32; 
    }
    result += LETTERS.charAt(newLocation[i]);
  }
  return result;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let newLocation = new Array();
  let result = '';
  for (let i = 0; i < str.length; i++) {
    newLocation[i] = LETTERS.indexOf(str[i].toLocaleUpperCase()) - n; //finnum staðsetningu stafanna í stafrófinu, 
                                                  //hliðrum þeim um n til vinstri og geymum í fylki
    if (newLocation[i] < 0) {
      newLocation[i] += 32; 
    }
    result += LETTERS.charAt(newLocation[i]);
  }
  return result;
}
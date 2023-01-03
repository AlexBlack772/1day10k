const a = 100;
const b = 200;


function kaitori(a, b) {
  return a + b;
}

function hanbai() {
   var a = 100;
   var b = 200;
   var c = kaitori(a, b);
   return c;
}

var d = hanbai();

getElemtnById("result").innerHTML = d;
getContentById("result").innerHTML = d;
getSelectionById("result").innerHTML = d;
//getSelectionById() means getSelectionById("result").innerHTML = d;



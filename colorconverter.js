function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  //Conversion for F1 2020
  h = (0.6667 * h).toFixed(1);
  s = ((s/100) * 240).toFixed(1);
  l = ((l/100) * 240).toFixed(1)

  return "hsl(" + h + "," + s + "%," + l + "%)";
}
function hexToRGB(h) {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  
  return "rgb("+ +r + "," + +g + "," + +b + ")";
}
function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}



//var testColor = "#A46BBD"
//var testRGBColor = (164,107,189);
//var testHSLColor = (282, 38, 58);
//document.getElementById("output").innerHTML = (hexToHSL(testColor))
var input = document.querySelector('input');
input.addEventListener('keyup', (e) =>{
    testColor = e.target.value;
    negativeTestColor = invertColor(testColor, true)


    hslColor = hexToHSL(testColor)
    rgbColor = hexToRGB(testColor)

    document.getElementById('currentColor').style.backgroundColor = testColor;
    document.getElementById('colorText').innerHTML = testColor;
    document.getElementById('colorText').style.color = negativeTestColor;

    document.getElementById('colorTextRGB').innerHTML = rgbColor;
    document.getElementById('colorTextRGB').style.color = negativeTestColor;

    document.getElementById('colorTextHSL').innerHTML = hslColor;
    document.getElementById('colorTextHSL').style.color = negativeTestColor;
})

function deleteRow(ctl) {
    ctl.parents("tr").remove();
}


document.getElementById("button1").addEventListener("click", function() {
  
  var table = document.getElementById("colorTable");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.innerHTML = testColor;
  cell1.style.backgroundColor = testColor;
  cell1.style.color = negativeTestColor;

  cell2.innerHTML = rgbColor;
  cell2.style.backgroundColor = testColor;
  cell2.style.color = negativeTestColor;

  cell3.innerHTML = hslColor;
  cell3.style.backgroundColor = testColor;
  cell3.style.color = negativeTestColor;

  var button = document.createElement("button");
  button.innerHTML = "Delete";
  button.addEventListener("click", function(){
      var i = this.parentNode.parentNode.rowIndex;
      document.getElementById("colorTable").deleteRow(i);
  });
  cell4.appendChild(button);

});

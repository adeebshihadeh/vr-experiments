var scene = document.querySelector("a-scene");

var eq = new Equalizer();
eq.play("audio.mp3");

var graph_mode = "bar360";

// bar graph
function bar_graph(data) {
  var max_width = 25;

  $(".graph").remove();
  for (var i in data) {
    var el = document.createElement("a-box");

    el.setAttribute("position", {x: i*max_width/data.length - ((max_width-1)/2), y: 0, z: -5});
    el.setAttribute("scale", {x: max_width/data.length, y: data[i]/120, z: 0.1});
    el.setAttribute("color", "red");
    el.className = "graph";

    scene.appendChild(el);
  }
}

function bar2(data) {
  var max_width = 25;

  $(".graph").remove();
  for (var i in data) {
    var el = document.createElement("a-box");

    el.setAttribute("position", {x: i - ((max_width-1)/2), y: 0, z: -5});
    el.setAttribute("scale", {x: max_width/data.length, y: data[i]/120, z: 0.1});
    el.setAttribute("color", "red");
    el.className = "graph";

    scene.appendChild(el);
  }
}


function bar360(data) {
  var radius = 40;


  $(".graph").remove();
  for (var i in data) {
    var el = document.createElement("a-box");

    var angle = 360/data.length * i;

    el.setAttribute("position", {x: radius*Math.sin(angle*(Math.PI / 180)), y: 0, z: radius*Math.cos(angle*(Math.PI / 180))});
    el.setAttribute("scale", {x: (360/data.length > 1 ? 1 : 360/data.length), y: data[i]/3 + 5, z: 0.1});
    el.setAttribute("color", "red");
    el.className = "graph";

    // polar to 2D

    scene.appendChild(el);
  }
}





// spheres
function graph_spheres(data) {
  $("a-sphere").remove();

  var separation = 3;

  $(".graph").remove();
  for (var i in data) {
    var el = document.createElement("a-sphere");

    el.setAttribute("radius", data[i] / 325);
    el.setAttribute("position", {x: (i - (data.length-1)/2)*separation, y: -2.5, z: -7});
    el.setAttribute("color", "purple");
    el.className = "graph";

    scene.appendChild(el);
  }
}


function visualize() {
  switch (graph_mode) {
    case "spheres":
      graph_spheres([eq.getSpectrum()[0], eq.getSpectrum()[1], eq.getSpectrum()[2], eq.getSpectrum()[3]]);
      break;
    case "bar":
      bar2(eq.getSpectrum());
      break;
    case "bar360":
      bar360(eq.getSpectrum());
      break;
    default:
      graph_spheres([eq.getSpectrum()[0], eq.getSpectrum()[1], eq.getSpectrum()[2], eq.getSpectrum()[3]]);
      break;
  }
}

function random() {
  return 5;
}

window.onload = function () {
  scene = document.querySelector("a-scene");
};

window.setInterval(visualize, 15);


$(window).keypress(function(e) {
  switch (e.keyCode) {
    case 98:
      graph_mode = "bar";
      break;
    case 115:
      graph_mode = "spheres";
      break;
    case 51:
      graph_mode = "bar360";
      break;
    default:
      console.log("unimplemented key: " + e.keyCode);
      break;
  }
});


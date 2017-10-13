var ctx = new AudioContext();

var scene = document.querySelector("a-scene");

var eq = new Equalizer();
eq.play("audio.mp3");

// bar graph
function bar_graph(data, min, max) {

  $(".graph").remove();
  for (var i in data) {
    var el = document.createElement("a-box");

    el.setAttribute("position", {x: data.length/2 - i, y: 0, z: -5});
    el.setAttribute("scale", {x: 1, y: data[i], z: 0.1});
    el.setAttribute("color", "red");

    scene.appendChild(el);
  }
}

// spheres
function graph_spheres(data) {
  $("a-sphere").remove();

  var separation = 3;

  for (var i in data) {
    var el = document.createElement("a-sphere");

    el.setAttribute("radius", data[i] / 250);
    el.setAttribute("position", {x: (i - (data.length-1)/2)*separation, y: 0, z: -7});
    el.setAttribute("color", "purple");
    // el.setAttribute("");

    scene.appendChild(el);
  }
}


function visualize() {
  // bar_graph([random(), random(), random(), random(), random(), random(), random(), random(), random(), random(), random()], 0, 20);
  // graph_spheres([random(), random(), random(), random()]);
  graph_spheres([eq.getSpectrum()[0], eq.getSpectrum()[1], eq.getSpectrum()[2], eq.getSpectrum()[3]]);
}

function random() {
  return 5;
}

window.onload = function () {
  scene = document.querySelector("a-scene");
};

window.setInterval(visualize, 250); 
visualize()





var video = "video.mp4";

var ctx = new AudioContext();

var scene = document.querySelector("a-scene");

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
function graph_spheres() {
  $(".graph").remove();
  for (var i in data) {
    var el = document.createElement("a-spere");

    el.setAttribute("radius", data[i]);
    el.setAttribute("position", {x: data.length/2 - i, y: -3, z: -5});
  }
}


function visualize() {
  bar_graph([random(), random(), random(), random(), random(), random(), random(), random(), random(), random(), random()], 0, 20);
}

function random() {
  return 5;
}

window.onload = function () {
  scene = document.querySelector("a-scene");
};

window.setInterval(visualize, 250); 




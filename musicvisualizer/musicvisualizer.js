var ctx = new AudioContext();

var scene = document.querySelector("a-scene");

var eq = new Equalizer();
eq.play("audio.mp3");

var graph_mode = "spheres";

// bar graph
function bar_graph(data) {
  var max_width = 25;

  $(".graph").remove();
  for (var i in data) {
    var el = document.createElement("a-box");

    el.setAttribute("position", {x: i*max_width/data.length - ((max_width-1)/2), y: 0, z: -5});
    el.setAttribute("scale", {x: max_width/data.length, y: data[i]/120, z: 0.1});
    el.setAttribute("color", "red");
    el.setAttribute("class", "graph");

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
    el.setAttribute("class", "graph");

    scene.appendChild(el);
  }
}


function bar360() {
  var radius = 10;

}





// spheres
function graph_spheres(data) {
  $("a-sphere").remove();

  var separation = 3;

  for (var i in data) {
    var el = document.createElement("a-sphere");

    el.setAttribute("radius", data[i] / 325);
    el.setAttribute("position", {x: (i - (data.length-1)/2)*separation, y: -2.5, z: -7});
    el.setAttribute("color", "purple");

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
    default:
      console.log("unimplemented key: " + e.keyCode);
      break;
  }
});


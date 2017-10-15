var scene = document.querySelector("a-scene");

var eq = new Equalizer();
eq.play("audio.mp3");

var bar360 = {
  radius: 45,
  init: function(data) {
    for (var i in data) {
      var el = document.createElement("a-box");

      var angle = 360/data.length * i;

      el.setAttribute("position", {x: this.radius*Math.sin(angle*(Math.PI / 180)), y: 0, z: this.radius*Math.cos(angle*(Math.PI / 180))});
      el.setAttribute("scale", {x: (360/data.length > 1 ? 1 : 360/data.length), y: data[i]/3 + 5, z: 0.1});
      el.setAttribute("color", "red");
      el.className = "bar360";

      scene.appendChild(el);
    }
  },
  update: function(data) {
    for (var i in data) {
      var el = scene.querySelectorAll(".bar360")[i];
      el.setAttribute("scale", {x: (360/data.length > 1 ? 1 : 360/data.length), y: data[i]/3 + 5, z: 0.1});
    }
  },
  destroy: function() {
    $(".bar360").remove();
  }
};

var bar_graph = {
  max_width: 20,
  init: function(data) {
    for (var i in data) {
      var el = document.createElement("a-box");

      el.setAttribute("position", {x: i*this.max_width/data.length - ((this.max_width-1)/2), y: 0, z: -5});
      el.setAttribute("scale", {x: this.max_width/data.length, y: data[i]/120, z: 0.1});
      el.setAttribute("color", "red");
      el.className = "bar-graph";

      scene.appendChild(el);
    }
  },
  update: function(data) {
    for (var i in data) {
      var el = scene.querySelectorAll(".bar-graph")[i];
      el.setAttribute("scale", {x: this.max_width/data.length, y: data[i]/120, z: 0.1});
    }
  },
  destroy: function() {
    $(".bar-graph").remove();
  }
};


var spheres = {
  separation: 3,
  scale: 1/325,
  init: function(data) {
    for (var i in data) {
      var el = document.createElement("a-sphere");

      el.setAttribute("radius", data[i] * this.scale);
      el.setAttribute("position", {x: (i - (data.length-1)/2)*this.separation, y: -2.5, z: -7});
      el.setAttribute("color", "purple");
      el.className = "sphere";

      scene.appendChild(el);
    }
  },
  update: function(data) {
    for (var i in data) {
      var el = scene.querySelectorAll(".sphere")[i];
      el.setAttribute("radius", data[i] * this.scale)
    }
  },
  destroy: function() {
    $(".sphere").remove();
  }
};


var graphs = [bar360, bar_graph, spheres];

function visualize() {
  if (scene == null) {
    scene = document.querySelector("a-scene");
  } else {
    graphs[0].update(eq.getSpectrum());
  }
}

window.onload = function () {
  graphs[0].init(eq.getSpectrum());
  scene = document.querySelector("a-scene");
};

window.setInterval(function() {
  visualize()
}, 30);


$(window).keypress(function(e) {
  switch (e.keyCode) {
    case 32:
      graphs[0].destroy()
      graphs.push(graphs[0]);
      graphs.shift();
      graphs[0].init(eq.getSpectrum());
      break;
    default:
      console.log("unimplemented key: " + e.keyCode);
      break;
  }
});


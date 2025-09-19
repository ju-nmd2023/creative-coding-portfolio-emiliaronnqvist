class Particle {
  constructor(sketch, grid_size_in_pixels, color_set) {
    this.sketch = sketch;
    this.grid_size_in_pixels = grid_size_in_pixels;

    this.max_speed = 5;
    this.color_set = color_set;
    this.color_increment_modifier = 0.001;

    this.reset();
  }

  setColorSet(color_set) {
    this.color_set = color_set;
    this.color_increment = 0;
  }

  reset() {
    this.position = this.sketch.createVector(
      this.sketch.random(this.sketch.width),
      this.sketch.random(this.sketch.height)
    );
    this.velocity = this.sketch.createVector(0, 0);
    this.acceleration = this.sketch.createVector(0, 0);
    this.previous_position = this.position.copy();
    this.color_increment = 0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.max_speed);

    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.edges();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  show(draw_as_point = false) {
    this.sketch.push();

    if (draw_as_point) {
      this.sketch.stroke(this.color_set[0].toString("#rrggbb")); // Removes the alpha channel
      this.sketch.strokeWeight(3);
      this.sketch.point(this.position.x, this.position.y);
    } else {
      this.sketch.stroke(
        this.sketch.lerpColor(
          this.color_set[0],
          this.color_set[1],
          this.color_increment
        )
      );
      this.sketch.strokeCap(this.sketch.PROJECT);
      this.sketch.strokeWeight(1);
      this.sketch.line(
        this.position.x,
        this.position.y,
        this.previous_position.x,
        this.previous_position.y
      );
    }

    this.sketch.pop();

    this.previous_position = this.position.copy();
    this.color_increment += this.color_increment_modifier;
    if (this.color_increment > 1 || this.color_increment < 0)
      this.color_increment_modifier *= -1;
  }

  edges() {
    if (this.position.x > this.sketch.width) {
      this.position.x = 0;
      this.previous_position.x = 0;
    }

    if (this.position.x < 0) {
      this.position.x = this.sketch.width;
      this.previous_position.x = this.sketch.width;
    }

    if (this.position.y > this.sketch.height) {
      this.position.y = 0;
      this.previous_position.y = 0;
    }

    if (this.position.y < 0) {
      this.position.y = this.sketch.height;
      this.previous_position.y = this.sketch.height;
    }
  }

  follow(vectors) {
    var x = this.sketch.floor(
      this.position.x / this.sketch.pixelDensity() / this.grid_size_in_pixels
    );
    var y = this.sketch.floor(
      this.position.y / this.sketch.pixelDensity() / this.grid_size_in_pixels
    );
    var cols = this.sketch.floor(this.sketch.width / this.grid_size_in_pixels);

    index = x + y * cols;

    this.applyForce(vectors[index]);
  }
}
//= require creative-code-lab/particle.js

("use strict");

// Avoiding Global Mode: https://github.com/processing/p5.js/wiki/Global-and-instance-mode
const perlin_noise = (sketch) => {
  // This is the element where we'll create our P5 canvas
  let container = document.getElementById("sketch-holder");

  let gridSizeInPixels = 10;
  let start = 0;
  let increment = 0.01;

  let angle_multiplier = 1;
  let magnitude_multiplier = 1;

  let canvas_el;
  let number_of_particles = 250;
  let particles = [];
  let flow_field = [];
  let color_sets;
  let current_color_scheme = "bw1";

  let debug_mode = false;

  sketch.setup = () => {
    canvas_el = sketch.createCanvas(
      container.clientWidth,
      container.clientHeight
    );
    canvas_el.parent(container);

    color_sets = {
      bw1: {
        background: "#FFFFFF",
        lines: [
          sketch.color("rgba(0, 0, 0, 0.1)"),
          sketch.color("rgba(140, 140, 140, 0.1)"),
        ],
        blend_mode: sketch.DARKEST,
      },
      bw2: {
        background: "#000000",
        lines: [
          sketch.color("rgba(140, 140, 140, 0.1)"),
          sketch.color("rgba(255, 255, 255, 0.1)"),
        ],
        blend_mode: sketch.LIGHTEST,
      },
      color1: {
        background: "#000000",
        lines: [
          sketch.color("rgba(251, 82, 177, 0.1)"),
          sketch.color("rgba(250, 239, 80, 0.1)"),
        ],
        blend_mode: sketch.LIGHTEST,
      },
      color2: {
        background: "#000000",
        lines: [
          sketch.color("rgba(210, 131, 208, 0.1)"),
          sketch.color("rgba(89, 247, 137, 0.1)"),
        ],
        blend_mode: sketch.LIGHTEST,
      },
      color3: {
        background: "#FFFFFF",
        lines: [
          sketch.color("rgba(255, 0, 0, 0.1)"),
          sketch.color("rgba(0, 0, 255, 0.1)"),
        ],
        blend_mode: sketch.DARKEST,
      },
    };

    sketch.blendMode(color_sets[current_color_scheme].blend_mode);
    sketch.background(color_sets[current_color_scheme].background);
    sketch.noiseDetail(8, 0.6);

    updateParticleCount(number_of_particles);

    installControlHandlers();

    sketch.noLoop(); // Don't auto-start experiment
  };

  function updateParticleCount(value) {
    number_of_particles = parseInt(value);

    if (number_of_particles < particles.length) {
      particles.splice(number_of_particles);
    } else {
      for (var i = particles.length; i < number_of_particles; i++) {
        particles[i] = new Particle(
          sketch,
          gridSizeInPixels,
          color_sets[current_color_scheme].lines
        );
      }
    }
  }

  function updateColorScheme(scheme) {
    if (!Object.keys(color_sets).includes(scheme)) return;

    current_color_scheme = scheme;

    sketch.clear();

    if (debug_mode) {
      sketch.blendMode(sketch.BLEND);
    } else {
      sketch.blendMode(color_sets[scheme].blend_mode);
    }

    sketch.background(color_sets[scheme].background);
    particles.forEach((particle) => {
      particle.setColorSet(color_sets[scheme].lines);
    });
  }

  function reset() {
    particles.forEach((particle) => particle.reset());
    sketch.clear();
    updateColorScheme(current_color_scheme);
  }


    document
      .getElementById("flow-field-control-redo")
      .addEventListener("click", reset);
    document
      .getElementById("flow-field-control-color-scheme")
      .addEventListener("change", function (event) {
        updateColorScheme(event.target.value);
      });

    document
      .getElementById("flow-field-control-particle-count")
      .addEventListener("input", function (event) {
        document.getElementById("slider-particle-counter").innerHTML =
          event.target.value;
      });
    document
      .getElementById("flow-field-control-particle-count")
      .addEventListener("change", function (event) {
        updateParticleCount(event.target.value);
      });

    document
      .getElementById("flow-field-control-angle-multiplier")
      .addEventListener("input", function (event) {
        document.getElementById("slider-angle-multiplier").innerHTML =
          event.target.value;
      });
    document
      .getElementById("flow-field-control-angle-multiplier")
      .addEventListener("change", function (event) {
        angle_multiplier = parseInt(event.target.value);
      });

    document
      .getElementById("flow-field-control-magnitude-multiplier")
      .addEventListener("input", function (event) {
        document.getElementById("slider-magnitude-multiplier").innerHTML =
          event.target.value;
      });
    document
      .getElementById("flow-field-control-magnitude-multiplier")
      .addEventListener("change", function (event) {
        magnitude_multiplier = parseInt(event.target.value);
      });

    document
      .getElementById("flow-field-control-debug-mode")
      .addEventListener("change", function (event) {
        debug_mode = event.target.checked;

        if (debug_mode) {
          sketch.blendMode(sketch.BLEND);
        } else {
          updateColorScheme(current_color_scheme);
        }
      });

    document
      .getElementById("flow-field-control-save")
      .addEventListener("click", function () {
        sketch.save(
          canvas_el,
          `perlin_noise_flow_field_${current_color_scheme}_${debug_mode}_${number_of_particles}_${angle_multiplier}_${magnitude_multiplier}_${Math.floor(
            Date.now() / 1000
          )}`,
          "png"
        );
      });
  }

  sketch.windowResized = () => {
    sketch.resizeCanvas(container.clientWidth, container.clientHeight);
    sketch.draw();
  };

  sketch.draw = () => {
    if (debug_mode)
      sketch.background(color_sets[current_color_scheme].background);

    var z_offset = start;
    var density = sketch.pixelDensity();

    var x = 0;
    var y = 0;
    var index = 0;
    var color = 0;
    var angle = 0;

    // This maps noise values onto a 2D space
    for (x = 0; x < sketch.width * density; x += gridSizeInPixels * density) {
      for (
        y = 0;
        y < sketch.height * density;
        y += gridSizeInPixels * density
      ) {
        index = (x + y * sketch.width * density) * 4;
        noise_value = sketch.noise(
          (x / density) * increment, // Use the X as index but transform to smaller steps in the noise space
          (y / density) * increment, // Use the Y as index but transform to smaller steps in the noise space
          z_offset
        );

        angle = sketch.map(
          noise_value,
          0, // Noise lower bound value
          1, // Noise upper bound value
          0,
          sketch.TWO_PI * angle_multiplier
        );
        magnitude = sketch.map(
          noise_value,
          0, // Noise lower bound value
          1, // Noise upper bound value
          0.5,
          1 * magnitude_multiplier
        );

        vector_index =
          x / density / gridSizeInPixels +
          (y / density / gridSizeInPixels) *
            sketch.floor(sketch.width / gridSizeInPixels);
        flow_field[vector_index] = p5.Vector.fromAngle(angle);
        flow_field[vector_index].setMag(magnitude);

        if (debug_mode) {
          sketch.push();
          sketch.stroke(color_sets[current_color_scheme].lines[0]);
          sketch.translate(x, y);
          sketch.rotate(flow_field[vector_index].heading());
          sketch.line(0, 0, gridSizeInPixels * density, 0);
          // sketch.fill(color)
          // sketch.rect(x, y, gridSizeInPixels * density, gridSizeInPixels * density)
          sketch.pop();
        }
      }
    }

    start += increment;

    for (var i = 0; i < number_of_particles; i++) {
      particles[i].follow(flow_field);
      particles[i].update();
      particles[i].show(debug_mode);
    }
  };
};

// Wait for everything to load
if (document.readyState === "complete") {
  new p5(perlin_noise);
} else {
  window.onload = (event) => {
    new p5(perlin_noise);
  };
}

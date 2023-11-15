title = "Slicer";

description = `Cut up your\nenemies!
`;

characters = [];

const G = {
  WIDTH: 100,
  HEIGHT: 100,
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
};

/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector,
 * }} Enemy
 */

/**
 * @type { Enemy [] }
 */
let left_enemies;
/**
 * @type { Enemy [] }
 */
let right_enemies;
/**
 * @type { Enemy [] }
 */
let up_enemies;
/**
 * @type { Enemy [] }
 */
let down_enemies;

const ROTATION_DISTANCE = 12;
const ROTATION_SPEED = 10;

let slice_start, slice_end;

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
    };

    left_enemies = [];
    right_enemies = [];
    up_enemies = [];
    down_enemies = [];
  }
  if (right_enemies.length === 0) {
    for (let i = 0; i < 10; i++) {
      const posX = G.WIDTH + rnd(0, G.WIDTH);
      const posY = rnd(0, G.HEIGHT);
      right_enemies.push({ pos: vec(posX, posY) });
    }
  }

  player.pos = input.pos;
  color("light_blue");
  box(player.pos, 4);

  if (input.isJustPressed) {
    slice_start = 0;
  }
  if (input.isPressed) {
    color("light_red");
  } else {
    color("light_black");
  }

  //   arc(player.pos, ROTATION_DISTANCE, 1);
  //   box(test_x, test_y, 2);
  arc(
    player.pos,
    ROTATION_DISTANCE,
    2,
    ticks / ROTATION_SPEED,
    ticks / ROTATION_SPEED + PI / 4
  );
}

title = "Slicer";

description = `Cut up your\nenemies!
`;

characters = [];

const G = {
    WIDTH: 150,
    HEIGHT: 150,
    ENEMY_SIZE: 5
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

let enemy_speed;

const ROTATION_DISTANCE = 12;
const ROTATION_SPEED = 8;

let slice;

function update() {
    if (!ticks) {
        player = {
            pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
        };

        left_enemies = [];
        right_enemies = [];
        slice = 100;
        enemy_speed = 1;
    }

    // enemy creation
    if (right_enemies.length < 8) {
        const posX = G.WIDTH + rnd(0, G.WIDTH);
        const posY = rnd(0, G.HEIGHT);
        right_enemies.push({ pos: vec(posX, posY) });
    }
    if (left_enemies.length < 8) {
        const posX = -rnd(0, G.WIDTH);
        const posY = rnd(0, G.HEIGHT);
        left_enemies.push({ pos: vec(posX, posY) });
    }

    // player handling
    player.pos = input.pos;
    player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
    color("light_blue");
    box(player.pos, 4);

    if (input.isPressed) {
        if (slice > 0) {
            color("light_red");
            slice -= 1;
        } else {
            color("light_black");
        }
    } else {
        if (slice < 100) {
            slice += 1;
        }
        color("light_black");
    }

    // slicer graphic
    arc(
        player.pos,
        ROTATION_DISTANCE,
        3,
        ticks / ROTATION_SPEED,
        ticks / ROTATION_SPEED + PI / 3
    );

    // enemy handling
    remove(right_enemies, (e) => {
        e.pos.x -= enemy_speed;
        color("purple");
        const enemy = box(e.pos, G.ENEMY_SIZE);
        const isCollidingWithPlayer = enemy.isColliding.rect.light_blue;
        const isCollidingWithSlicer = enemy.isColliding.rect.light_red;

        if (isCollidingWithPlayer) {
            end();
        }
        if (isCollidingWithSlicer) {
            color("red");
            particle(e.pos)
            addScore(1, e.pos);
        }

        return (isCollidingWithSlicer || e.pos.x < -G.ENEMY_SIZE);
    });

    remove(left_enemies, (e) => {
        e.pos.x += enemy_speed;
        color("purple");
        const enemy = box(e.pos, G.ENEMY_SIZE);
        const isCollidingWithPlayer = enemy.isColliding.rect.light_blue;
        const isCollidingWithSlicer = enemy.isColliding.rect.light_red;

        if (isCollidingWithPlayer) {
            end();
        }
        if (isCollidingWithSlicer) {
            color("red");
            particle(e.pos)
            addScore(1, e.pos);
        }

        return (isCollidingWithSlicer || e.pos.x > G.WIDTH + G.ENEMY_SIZE);
    });

    color("black");
    text(slice.toString() + "/100", 5, G.HEIGHT-5);
}

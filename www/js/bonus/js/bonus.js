define(['phaser'], function(Phaser) {

/**
 * This class creates a Phaser-game.
 * @param settings {Object}
 * @constructor
 */
var Bonus = function(settings) {

    // Setup instance-variables, spot here the ones that can be set in settings-object and their default-values
    var
        // TODO: phonegap should be able to load files with ajax
        BASE64_TARGET_IMG = "data:image/png;base64,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",
        TARGET_COUNT = 5,
        mode = Phaser.CANVAS,
        tapCoordinates = settings.tapCoordinates || [],
        objectCoordinates = settings.objectCoordinates || [],
        inputDiameter = settings.inputDiameter || 100,
        basePath = settings.basePath || '',
        /** Initial width of the canvas */
        width = settings.width || 800,
        /** Initial height of the canvas */
        height = settings.height || 600,
        /** ID of the element to add the canvas to. If undefined then body will be used as parent */
        parent = settings.parent || undefined,
        /** Callback to be executed when the user clicks on the canvas on game-finished scene */
        onFinish = settings.onFinish || function() {},
        /** Whether or not to enjoy some pretty nice music while playing */
        musicEnabled = settings.musicEnabled || false,
        sfxEnabled = settings.sfxEnabled || false,
        /** @type {Phaser.Game} */
        game,
        /** @type {Phaser.Group} */
        targets,
        /** @type {Phaser.Group} */
        backgroundImageGroup,
        /** @type {Phaser.Sound} */
        tsound,
        /** @type {Phaser.Sound} */
        fsound,
        /** @type {Phaser.Sound} */
        music;

    /**
     * Reveals a sprite and soft-kills it (ie not destroy, set alive to false and leave visible)
     * @param {Phaser.Sprite} sprite
     */
    var revealSprite = function(sprite) {
        sprite.alpha = 1;
        sprite.alive = false;
    };

    /**
     * Presents the game finished scene
     */
    var finalize = function() {
        var bonusFound = TARGET_COUNT - targets.countLiving();
        game.input.onDown.addOnce(function() {
            onFinish(bonusFound);
        }, this);
    };

    /**
     * Reveals a part of the background
     * @param pointer {Phaser.Pointer}
     */
    var revealPartOfMap = function(pointer) {
        var sprite = game.add.sprite(0, 0, 'backgroundImage');
        sprite.mask = getMask(pointer, backgroundImageGroup);
        backgroundImageGroup.add(sprite, backgroundImageGroup);
    };

    /**
     * Creates a mask of the pointer
     * @param pointer {Phaser.Pointer}
     * @param group {Phaser.Group} optional
     * @returns {Phaser.Graphics}
     */
    var getMask = function(pointer, group) {
        var mask = game.add.graphics(0, 0, group);
        mask.beginFill();
        mask.drawCircle(pointer.circle.x, pointer.circle.y, pointer.circle.radius);
        mask.endFill();
        return mask;
    };

    /**
     * @param pointer {Phaser.Pointer}
     */
    var saveTapCoordinate = function(pointer) {
        tapCoordinates.push({
            x: pointer.x,
            y: pointer.y
        });
    };

    /**
     * Callback for taps/clicks
     * @param pointer {Phaser.Pointer}
     * @param humanTrigged bool whether this callback was called as a result of a actual tap. Defaults to true
     * because when the callback is called as a actual callback then only pointer is set by Phaser. When called
     * manually anything can be passed in as arguments.
     */
    var onClickTap = function(pointer, humanTrigged) {
        humanTrigged = humanTrigged || true;

        // Pointers circle diameter is by default 44px, so we need to change the pointers size manually
        pointer.circle.setTo(pointer.circle.x, pointer.circle.y, inputDiameter);

        revealPartOfMap(pointer);

        var foundObject = false;

        // For every object not yet found, do the following:
        // 1. if the object is inside the pointer, then show the part of it which is inside (a bit transparent)
        // This is done because otherwise it might happen that we have clicked around every part of the object,
        // and revealing the background, but the object is still not visible
        // 2. then check if the object is "really found" by checking if the middle of the object is inside the pointer.
        // When "really found" display the whole object without any transparency
        targets.forEachAlive(function(sprite) {
            if (Phaser.Circle.intersectsRectangle(pointer.circle, sprite.getBounds())) {
                // The effect is created by drawing a similar sprite exactly on top of the object, and mask it with
                // the same mask as when revealing part of the background
                var alphaTarget = game.add.sprite(sprite.x, sprite.y, 'target');
                alphaTarget.alpha = 0.3;
                alphaTarget.mask = getMask(pointer, backgroundImageGroup);
                backgroundImageGroup.add(alphaTarget);
            }

            // Pretend sprite X/Y is in the middle of the sprite
            var sprCenterX = sprite.x + (sprite.width * 0.5);
            var sprCenterY = sprite.y + (sprite.height * 0.5);
            if (pointer.circle.contains(sprCenterX, sprCenterY)) {
                foundObject = true;
                revealSprite(sprite);
            }
        }, this);


        // If this callback was trigged by simulation then we don't want
        // to store the tap-coordinate again, play sounds etc
        if (humanTrigged) {
//            if (sfxEnabled) {
//                if (foundObject) {
//                    fsound.play();
//                } else {
//                    tsound.play();
//                }
//            }
            saveTapCoordinate(pointer);
            finalize();
        }
    };

    /**
     *
     * @param coordinates array of Points (object with x and y property, eg Phaser.Point)
     * @param group {Phaser.Group} the group onto which the targets are added
     */
    var setupTargets = function(coordinates, group) {
        for (var i = 0; i < coordinates.length; i++) {
            var point = coordinates[i];
            var target = game.add.sprite(point.x, point.y, 'target');
            target.alpha = 0;
            target.inputEnabled = false;
            group.add(target);
        }
    };

    /**
     * Adds count number of coordinates to objectCoordinates at random positions
     * @param count {Integer} the number of objects to add
     */
    var setupNewTargets = function(count) {
        for (var i = 0; i < count; i++) {
            objectCoordinates.push({
                x: game.rnd.integerInRange(0, width - 100),
                y: game.rnd.integerInRange(0, height - 100)
            });
        }
    };

    /**
     * Simulates clicks made in the past games
     * @param taps array of Points (object with x and y property, eg Phaser.Point)
     */
    var simulateTaps = function(taps) {
        for (var i = 0; i < taps.length; i++) {
            var point = taps[i];
            var pointer = new Phaser.Pointer(game, 0);
            pointer.x = point.x;
            pointer.y = point.y;
            pointer.circle.setTo(point.x, point.y, inputDiameter);
            onClickTap(pointer, false);
        }
    };

    var init = function() {

        game = new Phaser.Game(width, height, mode, parent, {

            /* Callbacks for different states of the game */

            preload: function() {
                game.load.baseUrl = basePath;
//                game.load.audio('music',['assets/audio/rorri.ogg', 'assets/audio/rorri.mp3']);
//                game.load.audio('tsound', ['assets/audio/click_sound.ogg']);
//                game.load.audio('fsound', ['assets/audio/find_sound.ogg']);
//                game.load.image('target', 'assets/vaahtosammutin.png');
//                game.load.image('backgroundImage', 'assets/dark_sky.jpg');
                game.load.image('target', BASE64_TARGET_IMG);
                game.load.image('backgroundImage', BASE64_BG_IMG);
            },

            create: function() {
//                music = game.add.audio('music', 1, true);
//                tsound = game.add.audio('tsound');
//                fsound = game.add.audio('fsound');
//                if (musicEnabled) {
//                    music.play('' , 0, 1, true);
//                }

                game.stage.scale.setExactFit()
                game.stage.scale.startFullScreen(true);

                backgroundImageGroup = game.add.group();
                backgroundImageGroup.z = 1;

                // Put the targets to be found on top of everything
                targets = game.add.group();
                targets.z = 2;

                if (objectCoordinates.length === 0) {
                    setupNewTargets(TARGET_COUNT);
                }
                setupTargets(objectCoordinates, targets);
                simulateTaps(tapCoordinates);

                game.input.onTap.addOnce(onClickTap, this);
            }
        });
    }

    /**
     * The public interface of Bonus
     */
    return {

        play: function() {
            if (typeof game === 'undefined') {
                init();
            }
            game.paused = false;
        },

        pause: function() {
            game.paused = true;
        }

    };
};


return Bonus;

});
namespace SpriteKind {
    export const Coin = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Hero.vy == 0) {
        Hero.vy = -150
    }
})
function startInstructions () {
    game.setDialogFrame(img`
        . c b b b b b b b b b b b c . 
        c c c c c c c c c c c c c c c 
        b c c 1 1 1 1 1 1 1 1 1 c c b 
        b c 1 1 1 1 1 1 1 1 1 1 1 c b 
        b c 1 1 1 1 1 1 1 1 1 1 1 c b 
        b c 1 1 1 1 1 1 1 1 1 1 1 c b 
        b c 1 1 1 1 1 1 1 1 1 1 1 c b 
        b c 1 1 1 1 1 1 1 1 1 1 1 c b 
        b c 1 1 1 1 1 1 1 1 1 1 1 c b 
        b c 1 1 1 1 1 1 1 1 1 1 1 c b 
        b c 1 1 1 1 1 1 1 1 1 1 1 c b 
        b c 1 1 1 1 1 1 1 1 1 1 1 c b 
        b c c 1 1 1 1 1 1 1 1 1 c c b 
        c c c c c c c c c c c c c c c 
        . c b b b b b b b b b b b c . 
        `)
    game.showLongText("Reach the flag at the end of the level!", DialogLayout.Bottom)
    game.showLongText("Don't fall into the lava, or get burnt by the fire!", DialogLayout.Bottom)
    game.showLongText("Don't forget to collect the coins!", DialogLayout.Bottom)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile7`, function (sprite, location) {
    game.over(false, effects.slash)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    currentLevel += 1
    startLevel()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile10`, function (sprite, location) {
    game.over(true, effects.slash)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Ground7`, function (sprite, location) {
    game.over(false, effects.slash)
})
function startLevel () {
    if (currentLevel == 1) {
        tiles.setTilemap(tilemap`level1`)
    } else if (currentLevel == 2) {
        tiles.setTilemap(tilemap`level3`)
    }
    Hero.ay = 300
    scene.cameraFollowSprite(Hero)
    effects.starField.startScreenEffect()
    currentLevel = 1
    for (let value of sprites.allOfKind(SpriteKind.Coin)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile13`)) {
        Fire = sprites.create(assets.tile`myTile8`, SpriteKind.Enemy)
        animation.runImageAnimation(
        Fire,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . . . . . . . 
            . . . . . . 4 4 . . . . . . . . 
            . . . . . . 4 4 4 . . . . . . . 
            . . 4 . . 4 4 2 4 . . . 4 . . . 
            4 . 4 . . 4 2 2 4 4 . 4 4 . . . 
            . 4 4 4 4 4 2 2 2 2 4 4 4 4 . . 
            4 2 2 4 4 2 2 2 2 2 2 2 2 4 4 . 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 4 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 . . . . . . . . 
            . . . . 4 . 4 4 4 . . . . . . . 
            . . . 4 . 4 4 2 4 . . . 4 . . . 
            . . 4 4 . 4 2 2 4 4 . . 4 4 . . 
            . 4 4 4 4 4 2 2 2 2 4 4 4 4 . . 
            . 2 2 4 4 2 2 2 2 2 2 2 2 4 4 . 
            4 2 2 2 2 2 2 2 2 2 2 2 2 2 2 4 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            `],
        500,
        true
        )
        tiles.placeOnTile(Fire, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 5 4 4 4 5 5 5 f . . 
            . . . f 5 4 5 5 5 5 5 5 5 f . . 
            . . . f 5 4 5 5 5 5 5 5 5 f . . 
            . . . f 5 4 5 5 5 5 5 5 5 f . . 
            . . . f 5 4 5 5 5 5 5 5 5 f . . 
            . . . f 5 4 5 5 5 5 5 5 5 f . . 
            . . . f 5 4 5 5 5 5 5 5 5 f . . 
            . . . . f 5 4 4 5 5 5 5 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        animation.runImageAnimation(
        coin,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . f 5 5 4 4 4 4 4 4 5 f . . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 5 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 4 4 4 5 5 5 5 f . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . f 5 5 4 4 4 4 5 f . . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 5 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 4 4 5 5 5 f . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 5 4 4 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 5 4 4 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . f 5 5 4 4 4 4 5 f . . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 5 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 4 4 5 5 5 f . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        130,
        true
        )
        tiles.placeOnTile(coin, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        lava = sprites.create(assets.tile`myTile4`, SpriteKind.Coin)
        animation.runImageAnimation(
        lava,
        [img`
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            `,img`
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            `,img`
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            `,img`
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            `,img`
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            `,img`
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            `,img`
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            `,img`
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            `,img`
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            `,img`
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            `,img`
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            `,img`
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            `,img`
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            `,img`
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            `,img`
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            `,img`
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 5 4 2 2 2 2 5 2 2 2 4 2 2 2 
            2 2 2 2 2 2 4 2 2 2 2 5 5 2 5 2 
            4 2 2 2 5 5 2 2 4 5 2 5 5 2 2 2 
            5 2 2 2 5 5 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 4 2 2 2 4 4 2 2 2 2 
            2 2 2 4 4 2 2 2 2 2 4 4 2 5 5 2 
            2 2 2 4 4 2 2 2 5 2 2 2 2 5 5 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 5 2 2 4 2 2 2 2 2 2 2 2 2 4 2 
            2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 
            2 2 2 2 4 2 2 2 2 2 2 2 5 2 2 2 
            2 2 2 5 2 2 2 2 2 2 4 2 2 2 2 2 
            `],
        130,
        true
        )
        tiles.placeOnTile(lava, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
let lava: Sprite = null
let coin: Sprite = null
let Fire: Sprite = null
let Hero: Sprite = null
let currentLevel = 0
scene.setBackgroundImage(img`
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddbbbbddddddddddddddddddddddddddddddddddddbbbbddddddddddddddddddddddddddddddddddddbbbbddddddddddddddddddddddddddddddddddddbbbbddddddddddddddddddd
    dddddddddddbbbbbbbbbbbdddddddddddddddddddddddddddddbbbbbbbbbbbdddddddddddddddddddddddddddddbbbbbbbbbbbdddddddddddddddddddddddddddddbbbbbbbbbbbdddddddddddddddddd
    ddddddddbbbbbbbbbbbbbbddddddddddddddddddddddddddbbbbbbbbbbbbbbddddddddddddddddddddddddddbbbbbbbbbbbbbbddddddddddddddddddddddddddbbbbbbbbbbbbbbdddddddddddddddddd
    ddddddbbbbbbbbbbbbbbbbddddddddddddddddddddddddbbbbbbbbbbbbbbbbddddddddddddddddddddddddbbbbbbbbbbbbbbbbddddddddddddddddddddddddbbbbbbbbbbbbbbbbdddddddddddddddddd
    dddddbbbbbbbbbbbbbbbbbdddddddddddddddddddddddbbbbbbbbbbbbbbbbbdddddddddddddddddddddddbbbbbbbbbbbbbbbbbdddddddddddddddddddddddbbbbbbbbbbbbbbbbbdddddddddddddddddd
    dddddbbbbbbbbbbbbbbbbbdddddddddddddddddddddddbbbbbbbbbbbbbbbbbdddddddddddddddddddddddbbbbbbbbbbbbbbbbbdddddddddddddddddddddddbbbbbbbbbbbbbbbbbdddddddddddddddddd
    ddddbbbbbbbbbbbbbbbbbbbdddddddddddddddddddddbbbbbbbbbbbbbbbbbbbdddddddddddddddddddddbbbbbbbbbbbbbbbbbbbdddddddddddddddddddddbbbbbbbbbbbbbbbbbbbddddddddddddddddd
    ddddbbbbbbbbbbbbbbbbbbbdddddddddddddddddddddbbbbbbbbbbbbbbbbbbbdddddddddddddddddddddbbbbbbbbbbbbbbbbbbbdddddddddddddddddddddbbbbbbbbbbbbbbbbbbbddddddddddddddddd
    dddbbbbbbbbbbbbbbbbbbbbddddddbbbdddddddddddbbbbbbbbbbbbbbbbbbbbddddddbbbdddddddddddbbbbbbbbbbbbbbbbbbbbddddddbbbdddddddddddbbbbbbbbbbbbbbbbbbbbddddddbbbdddddddd
    dddbbbbbbbbbbbbbbbbbbbbdddddbbbbbddddddddddbbbbbbbbbbbbbbbbbbbbdddddbbbbbddddddddddbbbbbbbbbbbbbbbbbbbbdddddbbbbbddddddddddbbbbbbbbbbbbbbbbbbbbdddddbbbbbddddddd
    ddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbdddddddddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbdddddddddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbdddddddddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbddddddd
    ddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbdddddddddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbdddddddddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbdddddddddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbddddddd
    ddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbddddddddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbddddddddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbddddddddbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbdddddd
    dbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbdddddd
    dbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbdddddd
    dbbbbbbbbbbbbbbbbbbbbbbddddbbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbbbddddbbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbbbddddbbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbbbddddbbbbbbbdddddd
    bbbbbbbbbbbbbbbfbbbbbbbddddbbbbbbbddddbbbbbbbbbbbbbbbbbfbbbbbbbddddbbbbbbbddddbbbbbbbbbbbbbbbbbfbbbbbbbddddbbbbbbbddddbbbbbbbbbbbbbbbbbfbbbbbbbddddbbbbbbbddddbb
    bbbbbbbbbbbbbbffbbbbbbbddddbbbbbbbddbbbbbbbbbbbbbbbbbbffbbbbbbbddddbbbbbbbddbbbbbbbbbbbbbbbbbbffbbbbbbbddddbbbbbbbddbbbbbbbbbbbbbbbbbbffbbbbbbbddddbbbbbbbddbbbb
    bbbbbbbbbbbbbbffbbbbbbbddddbbbbbbbbdbbbbbbbbbbbbbbbbbbffbbbbbbbddddbbbbbbbbdbbbbbbbbbbbbbbbbbbffbbbbbbbddddbbbbbbbbdbbbbbbbbbbbbbbbbbbffbbbbbbbddddbbbbbbbbdbbbb
    bbbbbbbbbbbbbffffbbbbbbddddbbbbbbbbbbbbbbbbbbbbbbbbbbffffbbbbbbddddbbbbbbbbbbbbbbbbbbbbbbbbbbffffbbbbbbddddbbbbbbbbbbbbbbbbbbbbbbbbbbffffbbbbbbddddbbbbbbbbbbbbb
    bbbbbbbbbbbfffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbfffbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbcccccccbb
    bbbbbbbbbbbbfffffbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbfffffbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbfffffbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbfffffbbbbbbbbbbbbccccccccccc
    cbbbbbbbbbbbfffffffbbbbbbbbbcccccccccccccbbbbbbbbbbbfffffffbbbbbbbbbcccccccccccccbbbbbbbbbbbfffffffbbbbbbbbbcccccccccccccbbbbbbbbbbbfffffffbbbbbbbbbcccccccccccc
    cccbbbbbbbbffffffbbbbbbbbbcccccccccccccccccbbbbbbbbffffffbbbbbbbbbcccccccccccccccccbbbbbbbbffffffbbbbbbbbbcccccccccccccccccbbbbbbbbffffffbbbbbbbbbcccccccccccccc
    ccccbbbbbfffffffffbbbbbbbcccccccccccccccccccbbbbbfffffffffbbbbbbbcccccccccccccccccccbbbbbfffffffffbbbbbbbcccccccccccccccccccbbbbbfffffffffbbbbbbbccccccccccccccc
    cccccbbbbbbffffffffbbbbbcccccccccccccccccccccbbbbbbffffffffbbbbbcccccccccccccccccccccbbbbbbffffffffbbbbbcccccccccccccccccccccbbbbbbffffffffbbbbbcccccccccccccccc
    ccccccbbccfffffffbbbbbbcccccccccccccccccccccccbbccfffffffbbbbbbcccccccccccccccccccccccbbccfffffffbbbbbbcccccccccccccccccccccccbbccfffffffbbbbbbccccccccccccccccc
    ccccccccccccffffffbbbbccfcccccccccccccccccccccccccccffffffbbbbccfcccccccccccccccccccccccccccffffffbbbbccfcccccccccccccccccccccccccccffffffbbbbccfccccccccccccccc
    ccccccccccfffffffffbbcccfcccccccccccccccccccccccccfffffffffbbcccfcccccccccccccccccccccccccfffffffffbbcccfcccccccccccccccccccccccccfffffffffbbcccfccccccccccccccc
    cccccccccfffffffffffcccffccccccccccccccccccccccccfffffffffffcccffccccccccccccccccccccccccfffffffffffcccffccccccccccccccccccccccccfffffffffffcccffccccccccccccccc
    cccccccfffffffffffccccccffcccccccccccccccccccccfffffffffffccccccffcccccccccccccccccccccfffffffffffccccccffcccccccccccccccccccccfffffffffffccccccffcccccccccccccc
    cccccccccfffffffffcccccffccccccccccccccccccccccccfffffffffcccccffccccccccccccccccccccccccfffffffffcccccffccccccccccccccccccccccccfffffffffcccccffccccccccccccccc
    cccccccccfffffffccccccffffcccccccccccccccccccccccfffffffccccccffffcccccccccccccccccccccccfffffffccccccffffcccccccccccccccccccccccfffffffccccccffffcccccccccccccc
    ccccccccffcffffffffccffffffcccccccccccccccccccccffcffffffffccffffffcccccccccccccccccccccffcffffffffccffffffcccccccccccccccccccccffcffffffffccffffffccccccccccccc
    ccccccccccffffffffffcccffcccccccccccfcccccccccccccffffffffffcccffcccccccccccfcccccccccccccffffffffffcccffcccccccccccfcccccccccccccffffffffffcccffcccccccccccfccc
    ccccccccfffffffffffccffffffcccccccccfcccccccccccfffffffffffccffffffcccccccccfcccccccccccfffffffffffccffffffcccccccccfcccccccccccfffffffffffccffffffcccccccccfccc
    cccfcccffffffffffffcffffffffcccccccfffcccccfcccffffffffffffcffffffffcccccccfffcccccfcccffffffffffffcffffffffcccccccfffcccccfcccffffffffffffcffffffffcccccccfffcc
    cccffcccccffffffffffffffffccccccccccffcccccffcccccffffffffffffffffccccccccccffcccccffcccccffffffffffffffffccccccccccffcccccffcccccffffffffffffffffccccccccccffcc
    ccffccccffffffffffffffffffffcccccccffcccccffccccffffffffffffffffffffcccccccffcccccffccccffffffffffffffffffffcccccccffcccccffccccffffffffffffffffffffcccccccffccc
    cccffccffffffffffffffffffffffcccccffffcccccffccffffffffffffffffffffffcccccffffcccccffccffffffffffffffffffffffcccccffffcccccffccffffffffffffffffffffffcccccffffcc
    ccfffffffffffffffffffffffffccccccccffffcccfffffffffffffffffffffffffccccccccffffcccfffffffffffffffffffffffffccccccccffffcccfffffffffffffffffffffffffccccccccffffc
    cccffffffffffffffffffffffffffcccccffffcccccffffffffffffffffffffffffffcccccffffcccccffffffffffffffffffffffffffcccccffffcccccffffffffffffffffffffffffffcccccffffcc
    cccfffffffffffffffffffffffffffcccffffffccccfffffffffffffffffffffffffffcccffffffccccfffffffffffffffffffffffffffcccffffffccccfffffffffffffffffffffffffffcccffffffc
    ccffffffffffffffffffffffffffccccccffffccccffffffffffffffffffffffffffccccccffffccccffffffffffffffffffffffffffccccccffffccccffffffffffffffffffffffffffccccccffffcc
    cfffffffffffffffffffffffffffffccfffffffccfffffffffffffffffffffffffffffccfffffffccfffffffffffffffffffffffffffffccfffffffccfffffffffffffffffffffffffffffccfffffffc
    ccfffffffffffffffffffffffffffffccfffffffccfffffffffffffffffffffffffffffccfffffffccfffffffffffffffffffffffffffffccfffffffccfffffffffffffffffffffffffffffccfffffff
    ccffffffffffffffffffffffffffffccffffffffccffffffffffffffffffffffffffffccffffffffccffffffffffffffffffffffffffffccffffffffccffffffffffffffffffffffffffffccffffffff
    fffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
currentLevel = 1
Hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . 9 9 9 9 9 9 . . . . . 
    . . . . 9 9 9 9 9 9 9 9 9 9 . . 
    . . . . f f f d d d f d . . . . 
    . . . f d f d d d d f d d d . . 
    . . . f d f f d d d d f d d . . 
    . . . . f d d d d d f f f f . . 
    . . . . . d d d d d d . . . . . 
    . . . . 9 9 6 9 9 6 9 9 . . . . 
    . . . 9 9 9 6 9 9 6 9 9 9 . . . 
    . . 9 9 9 9 6 6 6 6 9 9 9 9 . . 
    . . d d 9 6 8 6 6 8 6 9 d d . . 
    . . d d d 6 6 6 6 6 6 d d d . . 
    . . d d 6 6 6 6 6 6 6 6 d d . . 
    . . . . 6 6 6 . . 6 6 6 . . . . 
    . . . 9 9 9 . . . . 9 9 9 . . . 
    `, SpriteKind.Player)
controller.moveSprite(Hero, 60, 0)
startLevel()
game.onUpdate(function () {
    Hero.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . 9 9 9 9 9 9 . . . . . 
        . . . . 9 9 9 9 9 9 9 9 9 9 . . 
        . . . . f f f d d d f d . . . . 
        . . . f d f d d d d f d d d . . 
        . . . f d f f d d d d f d d . . 
        . . . . f d d d d d f f f f . . 
        . . . . . d d d d d d . . . . . 
        . . . . 9 9 6 9 9 6 9 9 . . . . 
        . . . 9 9 9 6 9 9 6 9 9 9 . . . 
        . . 9 9 9 9 6 6 6 6 9 9 9 9 . . 
        . . d d 9 6 8 6 6 8 6 9 d d . . 
        . . d d d 6 6 6 6 6 6 d d d . . 
        . . d d 6 6 6 6 6 6 6 6 d d . . 
        . . . . 6 6 6 . . 6 6 6 . . . . 
        . . . 9 9 9 . . . . 9 9 9 . . . 
        `)
    if (Hero.vy < 0) {
        Hero.setImage(img`
            . . . . . 9 9 9 9 9 9 . . . . . 
            . . . . 9 9 9 9 9 9 9 9 9 9 . . 
            . . . . f f f d d d f d . . . . 
            . . . f d f d d d d f d d d . . 
            . . . f d f f d d d d f d d . . 
            . . . . f d d d d d f f f f . . 
            . . . . . d d d d d d . . . . . 
            . . . . . d d d d d d . . . . . 
            . . . . 9 9 6 9 9 6 9 9 . . . . 
            . . . 9 9 9 6 9 9 6 9 9 9 . . . 
            . . 9 9 9 9 6 6 6 6 9 9 9 9 . . 
            . . d d 9 6 8 6 6 8 6 9 d d . . 
            . . d d d 6 6 6 6 6 6 d d d . . 
            . . d d 6 6 6 . . 6 6 6 d d . . 
            . . . 9 9 9 . . . . 9 9 9 . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else if (Hero.vy > 0) {
        Hero.setImage(img`
            . . . . . 9 9 9 9 9 9 . . . . . 
            . . . . 9 9 9 9 9 9 9 9 9 9 . . 
            . . . . f f f d d d f d . . . . 
            . . . f d f d d d d f d d d . . 
            . . . f d f f d d d d f d d . . 
            . . . . f d d d d d f f f f . . 
            . . . . . d d d d d d . . . . . 
            . . . . . d d d d d d . . . . . 
            . . . . 9 9 6 9 9 6 9 9 . . . . 
            . . . 9 9 9 6 9 9 6 9 9 9 . . . 
            . . 9 9 9 9 6 6 6 6 9 9 9 9 . . 
            . . d d 9 6 8 6 6 8 6 9 d d . . 
            . . d d d 6 6 6 6 6 6 d d d . . 
            . . d d 6 6 6 6 6 6 6 6 d d . . 
            . . . 9 9 9 . . . . 9 9 9 . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    if (Hero.vx < 0) {
        Hero.image.flipX()
    }
})

// start screen
class StartScean {
    constructor() {
        super({ key: 'StartScene' });
      }      

    preload() {
        this.load.image('start', '6F3B15CA-1554-4807-80BE-36B2DA42E6DD.PNG');
    }

    create() {
        const background = this.add.image(0, 0, 'startScreen');
        background.setOrigin(0, 0);
        background.setScale(0.5, 0.5);
    

    this.input.on ('pointerUp', () => {
        this.scene.start('GameScene');
        this.scene.stop('StartScene');
    });
}
}
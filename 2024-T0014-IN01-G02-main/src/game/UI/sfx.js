export class SFX {
    constructor(scene) {
        this.scene = scene;
        this.sounds = {}; // Objeto para armazenar os sons
    }

    preload(key, path) {
        this.scene.load.audio(key, path);
    }

    create(key, config = {}) {
        // Adiciona som ao objeto sounds usando a chave fornecida
        this.sounds[key] = this.scene.sound.add(key, config);
    }

    play(key) {
        if (this.sounds[key]) {
            this.sounds[key].play();
        }
    }

    stop(key) {
        if (this.sounds[key] && this.sounds[key].isPlaying) {
            this.sounds[key].stop();
        }
    }

    get(key) {
        return this.sounds[key];
    }
}

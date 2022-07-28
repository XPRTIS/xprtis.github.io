/* Contains all logic regarding audio in the game. */

class AudioManager {
    constructor() {
        this.audioMapping = {};
        this.muted = false;
    }

    addSound(docId, soundName, isBackgroundMusic) {
        var sound = new Sound(soundName, docId, isBackgroundMusic);
        this.audioMapping[soundName] = sound;
    }

    playSound(soundName) {
        if (KEEP_AUDIO_OFF || this.muted) return;
        try {
            var sound = this.audioMapping[soundName];
            if (sound.isBackgroundMusic) {
                return;
            }
            sound.playSound();
        } catch {
            console.error("Error trying to play soundName = " + soundName);
        }
    }

    enableOrDisableMusic(soundName) {
        if (KEEP_AUDIO_OFF || this.muted) return;
        try {
            var sound = this.audioMapping[soundName];
            if (!sound.isBackgroundMusic) {
                return;
            }
            sound.enableOrDisableMusic();
        } catch {
            console.error("Error trying to play music: " + soundName);
        }
    }

    muteOrUnmuteAllAudio() {
        this.muted = !this.muted;
        if (this.muted) {
            for (const soundName in this.audioMapping) {
                this.audioMapping[soundName].pauseSound();
            }
        } else {
            for (const soundName in this.audioMapping) {
                var sound = this.audioMapping[soundName];
                // Enables music if the background music was paused, but
                // don't enable other sounds until they're invoked:
                if (sound.isBackgroundMusic && !sound.audioEnabled) {
                    sound.enableOrDisableMusic();
                }
            }
        }
    }
}

class Sound {
    constructor(soundName, docId, isBackgroundMusic) {
        this.soundName = soundName;
        this.audioElement = document.getElementById(docId);
        this.isBackgroundMusic = isBackgroundMusic;
        this.audioEnabled = false;
    }

    enableOrDisableMusic() {
        if (this.isBackgroundMusic) {
            this.audioEnabled = !this.audioEnabled;
            this.audioEnabled ? 
                (this.audioElement.play(), this.audioElement.loop = true) :
                this.audioElement.pause();
        }
    }

    playSound() {
        if (this.isBackgroundMusic) {
            // Background music should use "enableOrDisableMusic" method, since
            // we never want the background music to replay. Theoretically
            // this should never happen:
            console.warn("playSound was called on background music.");
            this.enableOrDisableMusic();
        } else {
            this.audioElement.play();
        }
    }

    pauseSound() {
        if (this.isBackgroundMusic) {
            this.audioEnabled = false;
        }

        this.audioElement.pause();
    }
}

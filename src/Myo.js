var Myo = module.exports = function(context) {
    'use strict';
    var self = this;

    if (!context) {
        throw new Error('Missing context');
    }
    /**
     * A vibration lasting a small amount of time (VibrationLengthShort)
     */
    self.VIBRATION_SHORT = 0;

    /**
     * A vibration lasting a moderate amount of time (VibrationLengthMedium)
     */
    self.VIBRATION_MEDIUM = 1;

    /**
     * A vibration lasting a long amount of time (VibrationLengthLong)
     */
    self.VIBRATION_LONG = 2;

    /**
     * Unlock for a fixed period of time.
     */
    self.UNLOCK_TIMED = 0;

    /**
     * Unlock until explicitly told to re-lock.
     */
    self.UNLOCK_HOLD = 1;

    /**
     * User did a single, discrete action, such as pausing a video.
     */
    self.USER_ACTION_SINGLE = 0;

    /**
     * @private
     *
     */
    self.context = context;
};

/**
 * Request the RSSI of the Myo.
 *
 * <p>An onRssi event will likely be generated with the value of the RSSI.</p>
 *
 */
Myo.prototype.requestRssi = function() {
    'use strict';
    var self = this;

    self.context.send({
        'requestRssi': true
    });
};

/**
 * Engage the Myo's built in vibration motor.
 * @param length
 *
 */
Myo.prototype.vibrate = function(length) {
    'use strict';
    var self = this;

    switch (length) {
        case self.VIBRATION_SHORT:
            self.context.send({
                'command': 'vibrate',
                'args': [self.VIBRATION_SHORT]
            });
            break;
        case self.VIBRATION_MEDIUM:
            self.context.send({
                'command': 'vibrate',
                'args': [self.VIBRATION_MEDIUM]
            });
            break;
        case self.VIBRATION_LONG:
            self.context.send({
                'command': 'vibrate',
                'args': [self.VIBRATION_LONG]
            });
            break;
        default:
            throw new Error('Valid values are: Myo.VIBRATION_SHORT, Myo.VIBRATION_MEDIUM, Myo.VIBRATION_LONG');
    }
};

/**
 * Unlock the given Myo.
 * Can be called when a Myo is paired.
 *
 */
Myo.prototype.unlock = function(option) {
    'use strict';
    var self = this;

    switch (option) {
        case self.UNLOCK_TIMED:
            self.context.send({
                'command': 'unlock',
                'args': [self.UNLOCK_TIMED]
            });
            break;
        case self.UNLOCK_HOLD:
            self.context.send({
                'command': 'unlock',
                'args': [self.UNLOCK_HOLD]
            });
            break;
        default:
            throw new Error('Valid values are: Myo.UNLOCK_TIMED, Myo.UNLOCK_HOLD');
    }
};

/**
 * Lock the given Myo immediately.
 * Can be called when a Myo is paired.
 *
 */
Myo.prototype.lock = function() {
    'use strict';
    var self = this;

    self.context.send({
        'command': 'lock'
    });
};

/**
 * Notify the given Myo that a user action was recognized.
 * Can be called when a Myo is paired. Will cause Myo to vibrate.
 *
 */
Myo.prototype.notifyUserAction = function(action) {
    'use strict';
    var self = this;

    switch (action) {
        case self.USER_ACTION_SINGLE:
            self.context.send({
                'command': 'notifyUserAction',
                'args': [self.USER_ACTION_SINGLE]
            });
            break;
        default:
            throw new Error('Valid values are: Myo.USER_ACTION_SINGLE');
    }
};

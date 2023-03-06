import React from 'react';

const reactionListRef = React.createRef();

/**
 * Show the ReportActionContextMenu modal popover.
 *
 * @param {Object} [event] - A press event.
 * @param {Element} contextMenuAnchor - popoverAnchor
 * @param {Array} users - array of users id
 * @param {String} emojiName - name of emoji
 * @param {Function} [onShow] - Run a callback when Menu is shown
 * @param {Function} [onHide] - Run a callback when Menu is hidden
 */
function showReactionList(
    event,
    contextMenuAnchor,
    users,
    emojiName,
    onShow = () => {},
    onHide = () => {},
) {
    if (!reactionListRef.current) {
        return;
    }
    reactionListRef.current.showReactionList(
        event,
        contextMenuAnchor,
        users,
        emojiName,
        onShow,
        onHide,
    );
}

/**
 * Hide the ReportActionContextMenu modal popover.
 * Hides the popover menu with an optional delay
 * @param {Boolean} shouldDelay - whether the menu should close after a delay
 * @param {Function} [onHideCallback=() => {}] - Callback to be called after Context Menu is completely hidden
 */
function hideReactionList(shouldDelay, onHideCallback = () => {}) {
    if (!reactionListRef.current) {
        return;
    }
    if (!shouldDelay) {
        reactionListRef.current.hideReactionList(onHideCallback);

        return;
    }

    // Save the active instanceID for which hide action was called.
    // If menu is being closed with a delay, check that whether the same instance exists or a new was created.
    // If instance is not same, cancel the hide action
    const instanceID = reactionListRef.current.instanceID;
    setTimeout(() => {
        if (reactionListRef.current.instanceID !== instanceID) {
            return;
        }

        reactionListRef.current.hideReactionList(onHideCallback);
    }, 800);
}

export {
    reactionListRef,
    showReactionList,
    hideReactionList,
};

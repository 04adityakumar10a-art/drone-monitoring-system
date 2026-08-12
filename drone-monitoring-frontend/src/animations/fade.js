export const fadeIn = {

    initial: {

        opacity: 0

    },

    animate: {

        opacity: 1

    },

    transition: {

        duration: 0.3

    }

};

export const fadeUp = {

    initial: {

        opacity: 0,

        y: 20

    },

    animate: {

        opacity: 1,

        y: 0

    },

    transition: {

        duration: 0.4,

        ease: "easeOut"

    }

};

export const fadeDown = {

    initial: {

        opacity: 0,

        y: -20

    },

    animate: {

        opacity: 1,

        y: 0

    },

    transition: {

        duration: 0.4,

        ease: "easeOut"

    }

};

export const fadeScale = {

    initial: {

        opacity: 0,

        scale: 0.95

    },

    animate: {

        opacity: 1,

        scale: 1

    },

    transition: {

        duration: 0.35

    }

};
export const parentAnimation = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.2
        }
    },
}

export const childAnimation = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 }
    },

}
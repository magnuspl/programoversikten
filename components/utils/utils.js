export const toUrl = (input) => {
    const lowerCase = input.toLowerCase()
    if(lowerCase && typeof lowerCase === 'string') {
        return lowerCase
            .replace(/ - /g, '-')
            .replace(/: /g, '-')
            .replace(/ /g, '-');
    }
};

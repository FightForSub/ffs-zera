const defaultValue = {
    SCORE_ASC: 1000,
    SCORE_DESC: -1000
};

const compare = {
    SCORE_ASC: (a, b) => (a || defaultValue['SCORE_ASC']) - (b || defaultValue['SCORE_ASC']),
    SCORE_DESC: (a, b) => -(a || defaultValue['SCORE_DESC']) + (b || defaultValue['SCORE_DESC'])
}

export {
    compare,
    defaultValue
}
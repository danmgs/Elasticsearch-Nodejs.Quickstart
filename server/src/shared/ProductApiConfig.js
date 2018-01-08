const soldBarrierStatusRangeConfig = {
    min: 10,
    max: 300, // process.env.SOLD_BARRIER_MAX
};

const maxEditDistanceConfig = 4;
const maxFuzzyConfig = 'auto';

const enumSearchOptions = {
    isSearchNone: 'isSearchNone',
    isSearchFuzzy: 'isSearchFuzzy',
    isSearchExactMatch: 'isSearchExactMatch',
    isSearchProximity: 'isSearchProximity',
};

module.exports = {
    soldBarrierStatusRangeConfig,
    maxEditDistanceConfig,
    maxFuzzyConfig,
    enumSearchOptions
};

/**
 *
 * Object that stores all the values that are set by
 * the user and might be used for a search query.
 *
 * The default region (Stockholm) and number of results
 * per page (10) are set when the page loads.
 *
 */

export default {
    searchBoxInput: '',
    resultsPerPage: '10',
    currentPage: '1',
    filterSettings: {
        regionList: ['Stockholms län'],
        countyList: [],
        jobCategoryList: [],
        jobGroupList: [],
    },
    favorites: [],
};
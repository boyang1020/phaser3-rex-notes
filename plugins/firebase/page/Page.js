import GetValue from '../../utils/object/GetValue.js';
import LoadFirstPage from './LoadFirstPage.js';
import LoadNextPage from './LoadNextPage.js';
import LoadPreviousPage from './LoadPreviousPage.js';

class Page {
    constructor(config) {
        this.setItemCount(GetValue(config, 'itemCount', 10));
        this.setQuery(
            GetValue(config, 'query.next', undefined),
            GetValue(config, 'query.previous', undefined)
        );
        this.pageIndex = undefined;
        this.startItemIndex = undefined;
        this.endItemIndex = undefined;
        this.startDocRef = undefined;
        this.endDocRef = undefined;
    }

    setItemCount(count) {
        this.itemCount = count;
        return this;
    }

    setQuery(nextQuery, prevQuery) {
        this.nextQuery = nextQuery;
        this.prevQuery = prevQuery;
        return this;
    }
}

var methods = {
    loadFirstPage: LoadFirstPage,
    loadNextPage: LoadNextPage,
    loadPreviousPage: LoadPreviousPage
}

Object.assign(
    Page.prototype,
    methods
);

export default Page;
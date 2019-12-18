import GetValue from '../../utils/object/GetValue.js';
import Post from './Post.js';
import Config from '../preload/DefaultConfig.js';

class LeaderBoard {
    constructor(config) {
        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));

        this.userInfo = { userID: '', userName: '' };
        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', ''));
        this.setBoardID(GetValue(config, 'boardID', ''));
        this.setTag(GetValue(Config, 'tag', undefined));
    }

    shutdown() {
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
    }

    setUser(userID, userName) {
        if (typeof (userID) === 'string') {
            this.userInfo.userID = userID;
            this.userInfo.userName = userName;
        } else {
            this.userInfo = userID;
        }
        return this;
    }

    setBoardID(boardID) {
        this.boardID = boardID;
        return this;
    }

    setTag(tag) {
        this.tag = tag;
        return this;
    }

    getRecordQuery(boardID, customTag, userID, timeTag) {
        var query = this.rootRef;
        query = (boardID) ? query.where('boardID', '==', boardID) : query;
        query = (customTag) ? query.where('tag', '==', customTag) : query;
        query = (userID) ? query.where('userID', '==', userID) : query;

        if (timeTag !== undefined) {
            for(var k in timeTag) { // {d:10}, {w:10}, {m:5}, or {y:2020}
                query = query.where(`tag${k.toUpperCase()}`, '==', timeTag[k]);
                break;
            }
        }
        return query;
    }
}

var methods = {
    post: Post
}

Object.assign(
    LeaderBoard.prototype,
    methods
);

export default LeaderBoard;
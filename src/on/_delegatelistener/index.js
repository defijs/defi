import addListener from '../_addlistener';
import defs from '../../_core/defs';
import arrayAddHandler from './arrayaddhandler';
import objectSetHandler from './objectsethandler';
import arrayRemoveHandler from './arrayremovehandler';
import objectRemoveHandler from './objectremovehandler';
import changeHandler from './changehandler';

// adds delegated event listener to an object by given path
export default function delegateListener(object, givenPath, name, callback, context, info = {}) {
    // if typeof path is string and path is not empty string then split it
    let path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;

    if (!path || !path.length) {
        // if no path then add simple listener
        addListener(object, name, callback, context, info);
    } else {
        // else do all magic
        const key = path[0];
        let pathStr; // needed for undelegation

        if (path.length > 1) {
            path = nofn.slice(path, 1);
            pathStr = path.join('.');
        } else {
            path = [];
            pathStr = path[0] || '';
        }

        const delegatedData = {
            path,
            name,
            callback,
            context,
            info,
            object
        };

            // the event is triggered by "set"
            addListener(object, `_change:delegated:${key}`, changeHandler, null, {
                delegatedData,
                pathStr
            });

            // call handler manually
            changeHandler({
                value: object[key]
            }, delegatedData);
    }
}

export const persist = store => next => action => {
    const returns = next(action);
    if (process.browser) {
      serialize(store);
    }
    return returns;
};

const sessionStorageKey = 'some key';

function serialize(store) {
    setStorage(store.getState());
}

export function deserialize() {
    return getStorage();
}

function getStorage() {
    if (!process.browser || !window.sessionStorage) {
        return;
    }
    const storage = window.sessionStorage[sessionStorageKey];
    if (!storage) {
        return {};
    } else {
        return JSON.parse(storage);
    }
}

function setStorage(state) {
    if (typeof state === 'object') {
        window.sessionStorage[sessionStorageKey] = JSON.stringify(state);
    } else {
        window.sessionStorage[sessionStorageKey] = '';
    }
}

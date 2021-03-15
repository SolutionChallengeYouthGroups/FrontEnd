export type ListReducerAction = "add" | "remove" | "replace";
export function listReducer<T>(state: T[], action: {
    actionType: ListReducerAction, item?: T, index?: number
}){
    switch (action.actionType){
        case "add":
            if (action.item === undefined){
                throw new TypeError("action.item must be defined for operation 'add'");
            }
            return [...state, action.item]
        case "remove":
            if (action.index === undefined){
                throw new TypeError("action.index must be defined for operation 'index'");
            }
            return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
        case "replace":
            if (action.index === undefined || action.item === undefined){
                throw new TypeError("action.index and action.item must be defined for operation 'replace'");
            }
            return [...state.slice(0, action.index), action.item, ...state.slice(action.index + 1)];
    }
}
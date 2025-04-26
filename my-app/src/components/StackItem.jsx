import Newsblock from "./Newsblock";
import NewsShortListBlock from "./NewsShortListBlock";

export default function StackItem () {
    return (
        <div><Newsblock /></div>
    )
}

// 1 блок новина, заголовок, 3 короткі новини
export function StackItem3s () {
    return (
        <><div><Newsblock /></div>
        <div><NewsShortListBlock /></div>
        <div><NewsShortListBlock /></div>
        <div><NewsShortListBlock /></div></>
    )
}

// 1 блок новина, заголовок, 4 короткі новини
export function StackItem4s () {
    return (
        <><div><Newsblock /></div>
        <div><NewsShortListBlock /></div>
        <div><NewsShortListBlock /></div>
        <div><NewsShortListBlock /></div>
        <div><NewsShortListBlock /></div></>
    )
}

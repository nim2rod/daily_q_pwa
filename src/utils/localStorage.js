export function getFromLocal() {
    let data = localStorage.getItem('userCode');
    return data ? JSON.parse(data) : `function solution(){

}`;
}

export function setToLocal(codeTyped) {
    localStorage.setItem('userCode', JSON.stringify(codeTyped));
}

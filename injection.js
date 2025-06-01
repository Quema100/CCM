let i = 0;
let p = 0;
let fin = false;
let latei = null;
let lateP = null;
let spellstart = false;
let recallstart = false;
let alertPressed = false;

const recallEvents = () => {
    document.querySelector('div[class="btn-top-menu"] > a[onclick]').addEventListener('click', () => {
        p = 0;
        lateP = null;
        console.log("초기화되었습니다.");
    });

    document.addEventListener('keydown', (e) => {
        console.log(e.key);

        if ( e.key >= '1' && e.key <= '4' && alertPressed) {
            setTimeout(() => {
                p++;
                lateP = null;
                console.log(`문제를 다음으로 넘겼습니다. 현재 인덱스: ${p}`);
                alertPressed = false;
            },1500)
        }
    });

    document.addEventListener('keydown', (e) => {
        console.log(e.key);
        if (e.key === ' ' && fin) {
            lateP = null;
            alertPressed = false;
            console.log(`문제를 다음으로 넘겼습니다. 현재 인덱스: ${i}`);
            fin = false;
        }
    });

    document.addEventListener('keyup', (e) => {
        console.log(e.key);
        if (e.key === ' ' && fin) {
            lateP = null;
            alertPressed = false;
            console.log(`문제를 다음으로 넘겼습니다. 현재 인덱스: ${i}`);
            fin = false;
        }
    });
}

const recall = () => {
    if (!window.location.pathname.startsWith("/Recall")) return p = 0, recallstart = false, console.log("리콜 페이지가 아닙니다.");

    if (!recallstart) {
        recallEvents();
        recallstart = true;
        console.log("이벤트 리스너가 설정되었습니다.");
    }

    const totalCount = parseInt(document.querySelector('.total_count').innerText.replace(/[^0-9]/g, ''), 10);
    const knownCount = parseInt(document.querySelector('.known_count').innerText.replace(/[^0-9]/g, ''), 10);
    console.log(`전체 문제: ${totalCount}, 알고 있는 문제: ${knownCount}`);
    console.log(`현재 문제: ${p}`);
    console.log(`지연된 문제: ${lateP}`);

    const recallM = document.querySelectorAll('.card-quest-item.cc-table.middle.fill-parent-w.back-quest.answer > .card-quest-list > .cc-ellipsis.l1')[p]

    if (knownCount === lateP) return console.log("문제를 풀고 있습니다.");
    if (p >= totalCount) return p = 0, fin = true, console.log("모든 문제를 완료했습니다.");

    if (recallM && !alertPressed) {
        lateP = knownCount
        alert(recallM.innerText);
        alertPressed = true;
        console.log("alert가 실행되었습니다.");
    }
}

const spellEvents = () => {
    let enterPressed = false;

    document.querySelector('div[class="btn-top-menu"] > a[onclick]').addEventListener('click', () => {
        i = 0;
        latei = null;
        enterPressed = false;
        console.log("초기화되었습니다.");
    });

    document.addEventListener('keydown', (e) => {
        console.log(e.key);
        if (e.key === 'Enter') {
            enterPressed = true;
            console.log("엔터 키가 눌렸습니다. 이제 스페이스바를 누를 수 있습니다.");
        }
        if (e.key === ' ' && enterPressed) {
            i++;
            latei = null;
            console.log(`문제를 다음으로 넘겼습니다. 현재 인덱스: ${i}`);
            enterPressed = false;
        }
    });

    document.addEventListener('keyup', (e) => {
        console.log(e.key);
        if (e.key === 'Enter') {
            enterPressed = true;
            console.log("엔터 키가 눌렸습니다. 이제 스페이스바를 누를 수 있습니다.");
        }
        if (e.key === ' ' && enterPressed) {
            i++;
            latei = null;
            console.log(`문제를 다음으로 넘겼습니다. 현재 인덱스: ${i}`);
            enterPressed = false;
        }
    });
}

const spell = () => {
    let input

    if (!window.location.pathname.startsWith("/Spell")) return i = 0, spellstart = false, console.log("스펠링 페이지가 아닙니다.");

    if (!spellstart) {
        spellEvents();
        spellstart = true;
        console.log("이벤트 리스너가 설정되었습니다.");
    }

    const totalCount = parseInt(document.querySelector('.total_count').innerText.replace(/[^0-9]/g, ''), 10);
    const knownCount = parseInt(document.querySelector('.known_count').innerText.replace(/[^0-9]/g, ''), 10);
    console.log(`전체 문제: ${totalCount}, 알고 있는 문제: ${knownCount}`);
    console.log(`현재 문제: ${i}`);
    console.log(`지연된 문제: ${latei}`);

    const currentText = document.querySelectorAll('.text-normal.spell-answer')[i]
    if (!currentText) return i = 0;
    const current = currentText.querySelector('.text-normal.spell-answer >.spell-content.font-32') || currentText.querySelector('.text-normal.spell-answer >.spell-content');
    console.log(current)
    if (!current) return console.log("텍스트를 찾을 수 없습니다.");
    if (knownCount === latei) return console.log("문제를 풀고 있습니다.");
    latei = knownCount
    if (i >= totalCount) return console.log("모든 문제를 완료했습니다.");
    for (let j = 0; j < study_data.length; j++) {
        if (current.innerText === study_data[j].back) {
            input = study_data[j].front + ' ';
            break;
        }
    }

    const inputField = document.querySelectorAll('div[class="text-normal spell-input"]>.form-control.input-lg.input-answer.m-center.w-90p')[i];
    console.log(inputField)
    if (inputField) {
        inputField.value = input;

    } else {
        console.error(`입력 필드를 찾을 수 없습니다. 인덱스: ${i}`);
    }
}

window.onload = () => { spell(); recall(); }
setInterval(() => {spell(); recall();}, 1000)
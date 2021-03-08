let bezier = [
    {A: {x: 655, y: 0}, B: {x: 658, y: 110}, C: {x: 660, y: 220}, D: {x: 650, y: 330}},
    {A: {x: 650, y: 330}, B: {x: 630, y: 420}, C: {x: 585, y: 480}, D: {x: 505, y: 527}},
    {A: {x: 505, y: 527}, B: {x: 412, y: 570}, C: {x: 312, y: 560}, D: {x: 235, y: 505}},
    {A: {x: 235, y: 505}, B: {x: 180, y: 464}, C: {x: 140, y: 400}, D: {x: 136, y: 301}},
    {A: {x: 136, y: 301}, B: {x: 140, y: 200}, C: {x: 179, y: 145}, D: {x: 250, y: 97}},
    {A: {x: 250, y: 97}, B: {x: 322, y: 55}, C: {x: 418, y: 60}, D: {x: 489, y: 100}},
    {A: {x: 489, y: 100}, B: {x: 590, y: 170}, C: {x: 590, y: 250}, D: {x: 590, y: 300}},
    {A: {x: 590, y: 300}, B: {x: 575, y: 420}, C: {x: 500, y: 475}, D: {x: 433, y: 491}},
    {A: {x: 433, y: 491}, B: {x: 300, y: 520}, C: {x: 221, y: 415}, D: {x: 207, y: 356}},
    {A: {x: 207, y: 356}, B: {x: 180, y: 255}, C: {x: 222, y: 175}, D: {x: 320, y: 137}},
    {A: {x: 320, y: 137}, B: {x: 450, y: 100}, C: {x: 550, y: 215}, D: {x: 526, y: 324}},
    {A: {x: 526, y: 324}, B: {x: 500, y: 405}, C: {x: 417, y: 445}, D: {x: 345, y: 423}},
    {A: {x: 345, y: 423}, B: {x: 265, y: 385}, C: {x: 260, y: 325}, D: {x: 266, y: 253}},
];

const Y = bezier.map((seg, i) => {
    return (function (t) {
        return ({
            x: (
                (Math.pow(1 - t, 3) * seg.A.x) +
                (3 * Math.pow(1 - t, 2) * t * seg.B.x) +
                (3 * (1 - t) * Math.pow(t, 2) * seg.C.x) +
                (Math.pow(t, 3) * seg.D.x)
            ),
            y: (
                (Math.pow(1 - t, 3) * seg.A.y) +
                (3 * Math.pow(1 - t, 2) * t * seg.B.y) +
                (3 * (1 - t) * Math.pow(t, 2) * seg.C.y) +
                (Math.pow(t, 3) * seg.D.y)
            ),
        });
    });
});
console.log(Y)
const s = [];
const n = 2600;
const m = Array(bezier.length).fill(n / bezier.length);
console.log(m)
bezier.forEach((seg, i) => {
    s[i] = [];
    const dt = 1 / m[i];

    for (let t = 0; t < 1; t += dt) {

        s[i].push(Y[i](t));
    }
});

function mag(a, b) {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

let l = [];
for (let i = 0; i < bezier.length; i++) {
    l[i] = 0;
    for (let j = 0; j < m[i] - 1; j++) {
        l[i] += mag(
            (s[i][j + 1].x - s[i][j].x),
            (s[i][j + 1].y - s[i][j].y)
        );
    }
    if (i < bezier.length - 1) {
        l[i] += mag(
            (s[i + 1][0].x - s[i][m[i] - 1].x),
            (s[i + 1][0].y - s[i][m[i] - 1].y)
        );
    }
}
const l_total = l.reduce((a, c) => {
    return a + c;
});
console.log(l)
console.log(l_total)

bezier.forEach((seg, i) => {
    s[i] = [];
    m[i] = Math.floor((l[i] / l_total) * n);
    const dt = 1 / m[i];
    for (let t = 0; t < 1; t += dt) {
        s[i].push(Y[i](t));
    }
});

const d_avg = l_total / (n - 1);
const step_size = (1 / n) / 10;
for (let i = 0; i < bezier.length; i++) {
    let t = [];
    for (let j = 0; j < m[i]; j++) {
        t[j] = j / m[i];
    }
    for (let r = 0; r < 100; r++) {
        let d = [];
        for (let j = 0; j < m[i] - 1; j++) {
            d[j] = mag(
                (s[i][j + 1].x - s[i][j].x),
                (s[i][j + 1].y - s[i][j].y)
            );
        }
        const d_err = d.map((segment) => {
            return (segment - d_avg);
        });
        let offset = 0;
        const cutoff = (i === bezier.length - 1) ? 0 : 1;
        for (let j = 1; j < m[i] - cutoff; j++) {
            offset += d_err[j - 1];
            t[j] -= step_size * offset;
            s[i][j] = Y[i](t[j]);
        }
    }
}

let b = [];

for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < s[i].length; j++) {
        b.push(s[i][j]);
    }
}
class Bezier {
    constructor(referencePoints) {
        this.referencePoints = referencePoints;
        this.pointsArray = [];
        this.numberOfTotalPoint = this.referencePoints.length * 100;
        this.rowLengthArray = this.getRowLengthArray();
        this.pointsFunctionArray = this.getXAndYPoint();
        this.setSameRowLengthPoints();
        this.evenlyDistributedRowLengthArr = [];
        this.totalPathLength = 0;
    }

    getRowLengthArray() {
        return Array(this.referencePoints.length).fill(this.numberOfTotalPoint / this.referencePoints.length);
    }

    getXAndYPoint() {
        return this.referencePoints.map((row, col) => {
            return (t) => {
                return {
                    x: (
                        (Math.pow(1 - t, 3) * row.A.x) +
                        (3 * Math.pow(1 - t, 2) * t * row.B.x) +
                        (3 * (1 - t) * Math.pow(t, 2) * row.C.x) +
                        (Math.pow(t, 3) * row.D.x)
                    ),
                    y: (
                        (Math.pow(1 - t, 3) * row.A.y) +
                        (3 * Math.pow(1 - t, 2) * t * row.B.y) +
                        (3 * (1 - t) * Math.pow(t, 2) * row.C.y) +
                        (Math.pow(t, 3) * row.D.y)
                    ),
                };
            };
        });
    }

    setSameRowLengthPoints() {
        this.referencePoints.forEach((row, col) => {

            this.pointsArray[col] = [];
            const dt = 1 / this.rowLengthArray[col];

            for (let t = 0; t < 1; t += dt) {

                this.pointsArray[col].push(this.pointsFunctionArray[col](t));
            }
        });
    }

    getEvenlyDistributedLength(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }

    setEvenlyDistributedRowLengthArray() {
        for (let i = 0; i < this.referencePoints.length; i++) {
            this.evenlyDistributedRowLengthArr[i] = 0;
            for (let j = 0; j < this.rowLengthArray[i] - 1; j++) {
                this.evenlyDistributedRowLengthArr[i] += this.getEvenlyDistributedLength(
                    (this.pointsArray[i][j + 1].x - this.pointsArray[i][j].x),
                    (this.pointsArray[i][j + 1].y - this.pointsArray[i][j].y)
                );
            }
            if (i < this.referencePoints.length - 1) {
                this.evenlyDistributedRowLengthArr[i] += this.getEvenlyDistributedLength(
                    (this.pointsArray[i + 1][0].x - this.pointsArray[i][this.rowLengthArray[i] - 1].x),
                    (this.pointsArray[i + 1][0].y - this.pointsArray[i][this.rowLengthArray[i] - 1].y)
                );
            }
        }
    }

    getTotalPathLength() {
        this.totalPathLength = this.evenlyDistributedRowLengthArr.reduce((a, c) => {
            return a + c;
        });
    }

    setEvenlyDistributedRowLengthPoints() {
        this.setEvenlyDistributedRowLengthArray();
        this.getTotalPathLength();
        this.referencePoints.forEach((row, col) => {
            this.pointsArray[col] = [];
            this.rowLengthArray[col] =
                Math.floor((this.evenlyDistributedRowLengthArr[col] / this.totalPathLength) * this.numberOfTotalPoint);
            const dt = 1 / this.rowLengthArray[col];
            for (let t = 0; t < 1; t += dt) {
                this.pointsArray[col].push(this.pointsFunctionArray[col](t));
            }
        });
    }

    getEqualizationOfDiscontinuities() {
        this.setEvenlyDistributedRowLengthPoints();
        const averageRowLength = this.totalPathLength / (this.numberOfTotalPoint - 1);
        const step = (1 / this.numberOfTotalPoint) / 10;

        for (let i = 0; i < this.referencePoints.length; i++) {
            let t = [];
            for (let j = 0; j < this.rowLengthArray[i]; j++) {
                t[j] = j / this.rowLengthArray[i];
            }
            for (let r = 0; r < 4; r++) {
                let d = [];
                for (let j = 0; j < this.rowLengthArray[i] - 1; j++) {
                    d[j] = this.getEvenlyDistributedLength(
                        (this.pointsArray[i][j + 1].x - this.pointsArray[i][j].x),
                        (this.pointsArray[i][j + 1].y - this.pointsArray[i][j].y)
                    );
                }
                const d_err = d.map((row) => {
                    return (row - averageRowLength);
                });
                let offset = 0;
                const cutoff = (i === this.referencePoints.length - 1) ? 0 : 1;
                for (let j = 1; j < this.rowLengthArray[i] - cutoff; j++) {
                    offset += d_err[j - 1];
                    t[j] -= step * offset;
                    this.pointsArray[i][j] = this.pointsFunctionArray[i](t[j]);
                }
            }
        }
    }

    getGamePoints() {
        this.setEvenlyDistributedRowLengthArray();
        this.getTotalPathLength();
        this.setEvenlyDistributedRowLengthPoints();
        this.getEqualizationOfDiscontinuities();

        let gamePointsArray = [];

        this.pointsArray.forEach(function (value, key) {
            value.forEach(function (value) {
                gamePointsArray.push(value);

            })
        });
        return gamePointsArray;
    }
}

export {Bezier};

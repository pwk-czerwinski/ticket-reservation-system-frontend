import * as Konva from 'konva';

/**
 * Class responsible for creating stadium on html5 canvas element.
 */
class StadiumCreator {
    /**
     * The most important method which is responsible for drawing complete
     * stadium with sectors and their names on html5 canvas element.
     *
     * @param sectors
     * @param goFurther
     */
    drawStadium(sectors, goFurther) {
        let scale = 1;

        if (this.getScreenWidth() <= 640) {
            scale = 0.5;
        }

        const stage = new Konva.Stage({
            container: 'stadium-container',
            width: 640 * scale,
            height: 510 * scale
        });

        const layer = new Konva.Layer();
        const createdSectors = this.createSectors(scale);
        const createdSectorsNames = this.createSectorsNames(scale, sectors);

        createdSectors.map((createdSector, i) =>
            this.drawSector(layer, createdSector, createdSectorsNames[i], goFurther)
        );

        this.drawFootballPitch(layer);
        stage.add(layer);
    }

    /**
     * Creates all available sectors.
     *
     * @param scale
     * @returns {Konva.Line[]}
     */
    createSectors(scale) {
        const sectorV1 = this.createSector([260, 20, 260, 200, 370, 200, 370, 20].map((size) => {
            return size * scale;
        }));
        const sectorV2 = this.createSector([260, 320, 260, 500, 370, 500, 370, 320].map((size) => {
            return size * scale;
        }));
        const sectorA1 = this.createSector([250, 320, 250, 500, 10, 460, 180, 320].map((size) => {
            return size * scale;
        }));
        const sectorA2 = this.createSector([180, 210, 180, 310, 10, 450, 10, 110].map((size) => {
            return size * scale;
        }));
        const sectorA3 = this.createSector([250, 20, 250, 200, 180, 200, 10, 100].map((size) => {
            return size * scale;
        }));
        const sectorA4 = this.createSector([380, 20, 380, 200, 460, 200, 620, 100].map((size) => {
            return size * scale;
        }));
        const sectorA5 = this.createSector([460, 210, 460, 310, 630, 450, 630, 110].map((size) => {
            return size * scale;
        }));
        const sectorA6 = this.createSector([380, 320, 460, 320, 620, 455, 380, 500].map((size) => {
            return size * scale;
        }));

        return [sectorV1, sectorV2, sectorA1, sectorA2, sectorA3, sectorA4, sectorA5, sectorA6];
    }

    /**
     * Creates all available sectors names.
     *
     * @param scale
     * @param sectors
     * @returns {Konva.Text[]}
     */
    createSectorsNames(scale, sectors) {
        let count = 0;
        const textV1 = this.createSectorName(290*scale, 85*scale, sectors[count].name);
        const textV2 = this.createSectorName(290*scale, 390*scale, sectors[++count].name);
        const textA1 = this.createSectorName(150*scale, 380*scale, sectors[++count].name);
        const textA2 = this.createSectorName(70*scale, 240*scale, sectors[++count].name);
        const textA3 = this.createSectorName(150*scale, 100*scale, sectors[++count].name);
        const textA4 = this.createSectorName(420*scale, 100*scale, sectors[++count].name);
        const textA5 = this.createSectorName(520*scale, 240*scale, sectors[++count].name);
        const textA6 = this.createSectorName(420*scale, 380*scale, sectors[++count].name);

        return [textV1, textV2, textA1, textA2, textA3, textA4, textA5, textA6];
    }

    /**
     * Creates sector.
     *
     * @param points
     * @returns {Konva.Line}
     */
    createSector(points) {
        return new Konva.Line({
            points: points,
            fill: '#0074D9',
            stroke: 'black',
            strokeWidth: 1,
            closed : true
        });
    }

    /**
     * Creates sector name.
     *
     * @param x
     * @param y
     * @param text
     * @returns {Konva.Text}
     */
    createSectorName(x, y, text) {
        return new Konva.Text({
            x: x,
            y: y,
            text: text,
            fontSize: 15,
            fontFamily: 'Calibri',
            fontStyle: 'bold',
            fill: 'white'
        });
    }

    /**
     * Changes sector color.
     *
     * @param layer
     * @param sector
     * @param text
     */
    changeSectorColor(layer, sector, text) {
        const fill = sector.fill() === 'yellow' ? '#0074D9' : 'yellow';
        const fillText = text.fill() === 'white' ? 'black' : 'white';
        sector.fill(fill);
        text.fill(fillText);
        layer.draw();
    }

    /**
     * Draws sector.
     *
     * @param layer
     * @param sector
     * @param text
     * @param goFurther
     */
    drawSector(layer, sector, text, goFurther) {
        const konvaArr = [];
        konvaArr.push(sector);
        konvaArr.push(text);

        for (let i = 0; i < konvaArr.length; i++) {
            konvaArr[i].on('mouseover', () => this.changeSectorColor(layer, sector, text));
            konvaArr[i].on('mouseout', () => this.changeSectorColor(layer, sector, text));
            konvaArr[i].on('click', () => goFurther(text.text()));
            konvaArr[i].on('tap', () => goFurther(text.text()));
        }

        layer.add(sector);
        layer.add(text);
    }

    /**
     * Draws football pitch (middle of stadium).
     *
     * @param layer
     */
    drawFootballPitch(layer) {
        let scale = 1;

        if (this.getScreenWidth() <= 360) {
            scale = 0.5;
        }

        const footballPitch = new Konva.Line({
            points: [190, 210, 190, 310, 450, 310, 450, 210].map((size) => size * scale),
            fill: 'green',
            stroke: 'white',
            strokeWidth: 2,
            closed : true
        });
        layer.add(footballPitch);
    }

    /**
     * Gets screen width.
     *
     * @returns {number}
     */
    getScreenWidth() {
        return window.innerWidth;
    }
}

export default new StadiumCreator();

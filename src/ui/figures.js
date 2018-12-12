export const createXCanvas = (row, tile) => {

    let xCanvas = document.createElement("canvas");
    xCanvas.id = `xCanvas-${row}-${tile}`;
    xCanvas.width = "120";
    xCanvas.height = "120";

    let xShape = xCanvas.getContext("2d");

    let region = new Path2D();
    region.moveTo(20, 40);
    region.lineTo(40, 20);
    region.lineTo(60, 40);
    region.lineTo(80, 20);
    region.lineTo(100, 40);
    region.lineTo(80, 60);
    region.lineTo(100, 80);
    region.lineTo(80, 100);
    region.lineTo(60, 80);
    region.lineTo(40, 100);
    region.lineTo(20, 80);
    region.lineTo(40, 60);
    region.lineTo(20, 40);
    region.closePath();


    let grd = xShape.createLinearGradient(0, 0, 170, 0);
    grd.addColorStop(0, "#ff6e7f");
    grd.addColorStop(1, "#bfe9ff");

    xShape.fillStyle = grd;
    xShape.fill(region);

    return xCanvas;
};


export const createOCanvas = (row, tile) => {

    let oCanvas = document.createElement("canvas");
    oCanvas.id = `oCanvas-${row}-${tile}`;
    oCanvas.width = "120";
    oCanvas.height = "120";

    let oShape = oCanvas.getContext("2d");

    let region2 = new Path2D();
    region2.arc(60, 60, 40, 0, 2 * Math.PI);

    let region3 = new Path2D();
    region3.arc(60, 60, (40 - Math.sqrt(800)), 0, 2 * Math.PI);

    let grd2 = oShape.createLinearGradient(0, 0, 170, 0);
    grd2.addColorStop(0, "#77A1D3");
    grd2.addColorStop(0.5, "#79CBCA");
    grd2.addColorStop(1, "#E684AE");

    oShape.fillStyle = grd2;
    oShape.fill(region2);
    oShape.fillStyle = 'white';
    oShape.fill(region3);

    return oCanvas;
};


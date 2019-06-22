class OyvindGraph {
  constructor({
    id,
    width = 1920,
    height = 1080,
    background = "#34495e",
    lineWidth = 5,
    lineColor = "#ffffff",
    shadowColor = "#3498db",
    horizontalLineColor = "#ecf0f1",
    gridColor = "black"
  }) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.background = background;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.shadowColor = shadowColor;
    this.horizontalLineColor = horizontalLineColor;
    this.gridColor = gridColor;
    this.canvas = document.createElement("Canvas");
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
    this.context = this.canvas.getContext("2d");
    document.getElementById(this.id).appendChild(this.canvas);
  }

  _maxValue = arr => arr.reduce((acc, val) => Math.max(acc, val), -Infinity);

  _minValue = arr => arr.reduce((acc, val) => Math.min(acc, val), Infinity);

  _averageValue = arr => arr.reduce((acc, val) => acc + val) / arr.length;

  _maxDevianceFromAverage = (avg, max, min) => Math.max(max - avg, avg - min);

  _standardDeviance = (graphData, avg) =>
    graphData.map(val => Math.abs(val - avg)).reduce((a, b) => a + b, 0) /
    graphData.length;

  // Calculate the distance between the vertical lines of the grid
  // We want it to be at least 10 lines, but not more than 20
  // Find the highest number lower than the number of values which is divisible
  // by 10
  _verticalPeriod = ({ length }) => (length - (length % 10)) / 10;

  _horizontalPeriod = verticalSpan => (verticalSpan - (verticalSpan % 10)) / 10;
  _horizontalPeriod = verticalSpan =>
    Math.pow(10, Math.floor(Math.log10(verticalSpan / 10)));

  createGraph(graphData, horizontalLines = []) {
    const maxValue = this._maxValue(graphData);
    const minValue = this._minValue(graphData);
    const averageValue = this._averageValue(graphData);
    const standardDeviance = this._standardDeviance(graphData, averageValue);

    // Make sure that the space above and below the graph is at least as large
    // the area used to display the graph
    const verticalSpan = standardDeviance * 8;

    // Draw gradient background
    const linearGradient = this.context.createLinearGradient(
      0,
      0,
      0,
      this.height
    );
    linearGradient.addColorStop(0, this.background);
    linearGradient.addColorStop(1, "black");
    this.context.fillStyle = linearGradient;
    this.context.fillRect(0, 0, this.width, this.height);

    // Draw the vertical lines of the grid
    const verticalPeriod = this._verticalPeriod(graphData);
    for (let i = 0; i < graphData.length; i += verticalPeriod) {
      this.context.beginPath();
      const currentX = (i * this.width) / (graphData.length - 1);
      const currentY = 0;
      const nextX = currentX;
      const nextY = this.height;

      this.context.moveTo(currentX, currentY);
      this.context.lineTo(nextX, nextY);

      this.context.strokeStyle = this.gridColor;
      this.context.lineWidth = 1;

      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0;
      this.context.shadowBlur = 0;

      this.context.stroke();
    }

    // Draw the correct horizontal lines of the grid
    // Draw horizontal lines for each value
    const minHorizontalLineValue = minValue - (minValue % 10);
    const horizontalPeriod = this._horizontalPeriod(verticalSpan);
    //const horizontalPeriod = 1000;
    let horizontalLineValue = -(
      verticalSpan -
      (verticalSpan % horizontalPeriod)
    );
    const horizontalLineData = [];
    while (horizontalLineValue < verticalSpan) {
      horizontalLineData.push(horizontalLineValue);
      horizontalLineValue += horizontalPeriod;
    }
    horizontalLineData.forEach(lineYValue => {
      this.context.beginPath();
      const currentX = 0;
      const currentY =
        ((verticalSpan / 2 + averageValue - lineYValue) * this.height) /
        verticalSpan;
      const nextX = this.width;
      const nextY = currentY;

      this.context.moveTo(currentX, currentY);
      this.context.lineTo(nextX, nextY);

      this.context.strokeStyle = this.gridColor;
      this.context.lineWidth = 1;

      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0;
      this.context.shadowBlur = 0;

      this.context.stroke();
    });

    // Draw horizontal lines specified by the user
    horizontalLines.forEach(lineYValue => {
      this.context.beginPath();
      const currentX = 0;
      const currentY =
        ((verticalSpan / 2 + averageValue - lineYValue) * this.height) /
        verticalSpan;
      const nextX = this.width;
      const nextY = currentY;

      this.context.moveTo(currentX, currentY);
      this.context.lineTo(nextX, nextY);

      this.context.strokeStyle = this.horizontalLineColor;
      this.context.lineWidth = 2;

      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0;
      this.context.shadowBlur = 0;

      this.context.stroke();
    });

    // Draw graph
    for (let i = 0; i < graphData.length - 1; i++) {
      this.context.beginPath();
      const currentX = (i * this.width) / (graphData.length - 1);
      const currentY =
        ((verticalSpan / 2 + averageValue - graphData[i]) * this.height) /
        verticalSpan;

      const nextX = ((i + 1) * this.width) / (graphData.length - 1);
      const nextY =
        ((verticalSpan / 2 + averageValue - graphData[i + 1]) * this.height) /
        verticalSpan;

      this.context.moveTo(currentX, currentY);
      this.context.lineTo(nextX, nextY);

      this.context.strokeStyle = this.lineColor;
      this.context.lineWidth = this.lineWidth;
      this.context.lineCap = "round";

      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0; //this.lineWidth;
      this.context.shadowBlur = 10; //this.lineWidth;
      this.context.shadowColor = this.shadowColor;

      this.context.stroke();
    }
  }
}

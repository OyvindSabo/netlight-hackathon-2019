class OyvindGraph {
  constructor({
    id,
    width = 1920,
    height = 1080,
    background = "#2c3e50",
    lineWidth = 5,
    lineColor = "#ffffff",
    shadowColor = "#3498db",
    horizontalLineColor = "#ecf0f1"
  }) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.background = background;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.shadowColor = shadowColor;
    this.horizontalLineColor = horizontalLineColor;
  }

  _maxValue = arr => arr.reduce((val, acc) => Math.max(val, acc), -Infinity);

  _minValue = arr => arr.reduce((val, acc) => Math.min(val, acc), Infinity);

  _averageValue = arr => arr.reduce((val, acc) => val + acc) / arr.length;

  _maxDevianceFromAverage = (avg, max, min) => Math.max(max - avg, avg - min);

  createGraph(graphData, horizontalLines = []) {
    const canvas = document.createElement("Canvas");
    canvas.setAttribute("width", this.width);
    canvas.setAttribute("height", this.height);
    document.getElementById(this.id).appendChild(canvas);

    const maxValue = this._maxValue(graphData);
    const minValue = this._minValue(graphData);
    const averageValue = this._averageValue(graphData);
    const maxDevianceFromAverage = this._maxDevianceFromAverage(
      averageValue,
      maxValue,
      minValue
    );
    const verticalSpan = (maxValue - minValue) * 1.2;

    const context = canvas.getContext("2d");

    // Clear canvas
    const linearGradient = context.createLinearGradient(0, 0, 0, this.height);
    linearGradient.addColorStop(0, this.background);
    linearGradient.addColorStop(1, "black");
    context.fillStyle = linearGradient;
    context.fillRect(0, 0, this.width, this.height);

    // Draw exponential lines and numbers

    // Draw graph
    context.beginPath();
    for (let i = 0; i < graphData.length - 1; i++) {
      const currentX = (i * this.width) / (graphData.length - 1);
      const currentY =
        ((verticalSpan / 2 + averageValue - graphData[i]) * this.height) /
        verticalSpan;

      const nextX = ((i + 1) * this.width) / (graphData.length - 1);
      const nextY =
        ((verticalSpan / 2 + averageValue - graphData[i + 1]) * this.height) /
        verticalSpan;

      context.moveTo(currentX, currentY);
      context.lineTo(nextX, nextY);

      context.strokeStyle = this.lineColor;
      context.lineWidth = this.lineWidth;
      context.lineCap = "round";

      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0; //this.lineWidth;
      context.shadowBlur = this.lineWidth;
      context.shadowColor = this.shadowColor; //this.lineColor;*

      context.stroke();
    }

    // Draw horizontal lines specified by the user
    context.beginPath();
    horizontalLines.forEach(lineYValue => {
      const currentX = 0;
      const currentY =
        ((verticalSpan / 2 + averageValue - lineYValue) * this.height) /
        verticalSpan;
      const nextX = this.width;
      const nextY = currentY;

      context.moveTo(currentX, currentY);
      context.lineTo(nextX, nextY);

      context.strokeStyle = this.horizontalLineColor;
      context.lineWidth = 2; //this.horizontalLineWidth;
      context.lineCap = "round";

      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 0; //2 * this.lineWidth;
      context.shadowColor = this.shadowColor; //this.lineColor;*/

      context.stroke();
    });
  }
}

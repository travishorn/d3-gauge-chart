/* globals d3 */

const gaugeChart = (o) => {
  const chart = d3.select(o.el);
  const width = chart.attr('width');
  const center = width / 2;
  const outerBezelWidth = width * 0.009;
  const outerBezelRadius = center - outerBezelWidth;
  const innerBezelWidth = width * 0.072;
  const innerBezelRadius = outerBezelRadius - (innerBezelWidth / 2);
  const tickHeight = outerBezelWidth + innerBezelWidth + (width * 0.027);
  const tickWidth = width * 0.009;
  const tickHiderRadius = width * 0.345;
  const labelY = center / 1.3;
  const valueLabelY = width * 0.75;
  const labelFontSize = width * 0.13;
  const needleWidth = width * 0.054;
  const needleCapRadius = width * 0.059;
  const tickSpacing = 13.5;
  const lastTickAngle = 135;
  let angle = -135;

  const needleScale = d3.scaleLinear()
    .domain([o.min || 0, o.max || 100])
    .range([angle, lastTickAngle]);

  const needleAngle = needleScale(o.value);

  /* outer bezel */
  chart.append('circle')
    .attr('class', 'gaugeChart-bezel-outer')
    .attr('cx', center)
    .attr('cy', center)
    .attr('stroke-width', outerBezelWidth)
    .attr('r', outerBezelRadius);

  /* face */
  chart.append('circle')
    .attr('class', 'gaugeChart-face')
    .attr('cx', center)
    .attr('cy', center)
    .attr('r', outerBezelRadius - 1);

  /* inner bezel */
  chart.append('circle')
    .attr('class', 'gaugeChart-bezel-inner')
    .attr('cx', center)
    .attr('cy', center)
    .attr('stroke-width', innerBezelWidth)
    .attr('r', innerBezelRadius);

  while (angle <= lastTickAngle) {
    chart.append('line')
      .attr('class', 'gaugeChart-tick')
      .attr('x1', center)
      .attr('y1', center)
      .attr('x2', center)
      .attr('y2', tickHeight)
      .attr('stroke-width', tickWidth)
      .attr('transform', `rotate(${angle} ${center} ${center})`);

    angle += tickSpacing;
  }

  /* tick hider */
  chart.append('circle')
    .attr('class', 'gaugeChart-tickHider')
    .attr('cx', center)
    .attr('cy', center)
    .attr('r', tickHiderRadius);

  /* label */
  chart.append('text')
    .attr('class', 'gaugeChart-label')
    .attr('x', center)
    .attr('y', labelY)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('font-size', labelFontSize)
    .text(o.label);

  /* value label */
  chart.append('text')
    .attr('class', 'gaugeChart-label-value')
    .attr('x', center)
    .attr('y', valueLabelY)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('font-size', labelFontSize)
    .text(o.value);

  /* needle */
  chart.append('path')
    .attr('class', 'gaugeChart-needle')
    .attr('stroke-width', outerBezelWidth)
    .attr('d', `M ${center - needleWidth / 2} ${center}
                L ${center} ${tickHeight}
                L ${center + needleWidth / 2} ${center} Z`)
    .attr('transform', `rotate(${needleAngle} ${center} ${center})`);

  /* needle cap */
  chart.append('circle')
    .attr('class', 'gaugeChart-needle-cap')
    .attr('cx', center)
    .attr('cy', center)
    .attr('stroke-width', outerBezelWidth)
    .attr('r', needleCapRadius);
};

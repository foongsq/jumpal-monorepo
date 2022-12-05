import React from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

JumpalLineChart.propTypes = {
  data: PropTypes.array,
  dimensions: PropTypes.object,
};

export default function JumpalLineChart({ data, dimensions }) {
  const svgRef = React.useRef(null);
  const { height, margin } = dimensions;
  const [svgWidth, setSvgWidth] = React.useState(
    Math.min(window.innerWidth * 0.9, 1000 - 64)
  );

  const setDimension = () => {
    setSvgWidth(Math.min(window.innerWidth * 0.9, 1000 - 64));
    setWidth(svgWidth - margin.left - margin.right);
  };

  React.useEffect(() => {
    window.addEventListener("resize", setDimension);
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [svgWidth]);

  const [width, setWidth] = React.useState(
    svgWidth - margin.left - margin.right
  );
  const svgHeight = height + margin.top + margin.bottom;

  React.useEffect(() => {
    const xScale = d3
      .scaleUtc() // creates a time scale with a domain and range
      .domain(
        // min and max values
        d3.extent(data[0].items, (d) => new Date(d.time).getTime())
      )
      .range([0, width - 20]); // how much space the chart takes up in this axis, offset by 150 to accommodate line labels
    const yScale = d3
      .scaleLinear()
      .domain([
        Math.max(d3.min(data[0].items, (d) => parseInt(d.score)) - 10, 0),
        d3.max(data[0].items, (d) => parseInt(d.score)) + 10,
      ])
      .range([height, 0]);

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`); // transform to add margins for entire chart

    // Add X grid lines with labels
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(20) // number of separators for X axis
      .tickSize(-height); // how long the lines should be
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`) // where the axis should be
      .call(xAxis);
    xAxisGroup.selectAll("line").attr("stroke", "grey"); // axis line color
    xAxisGroup
      .selectAll("text")
      .attr("color", "grey")
      .attr("font-size", "0.5rem"); // axis labels
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.bottom)
      .text("Date"); // axis name

    // Add Y grid lines with labels
    const yAxis = d3.axisLeft(yScale).ticks(10).tickSize(-width);
    const yAxisGroup = svg.append("g").call(yAxis);
    yAxisGroup.selectAll("line").attr("stroke", "grey");
    yAxisGroup
      .selectAll("text")
      .attr("color", "grey")
      .attr("font-size", "0.75rem");
    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", 0 - margin.top / 2)
      .text("Score");

    // Draw the lines
    const line = d3
      .line()
      .x((d) => xScale(d.time))
      .y((d) => yScale(d.score));
    svg
      .selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 3)
      .attr("d", (d) => line(d.items));

    // Add the points
    svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(data)
      .enter()
      .append("g")
      .style("fill", (d) => d.color)
      .selectAll("myPoints")
      .data((d) => d.items)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.time))
      .attr("cy", (d) => yScale(d.score))
      .attr("r", 5)
      .attr("stroke", "white");

    // Add a legend at the end of each line
    const wrap = (text, width) => {
      text.each(function () {
        // eslint-disable-next-line no-invalid-this
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line = [];
        const lineHeight = 1.1; // ems
        const y = text.attr("y");
        let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y);
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", lineHeight + "em")
              .text(word);
          }
        }
      });
    };
    svg
      .selectAll("myLabels")
      .data(data)
      .enter()
      .append("g")
      .append("text")
      .datum((d) => {
        return { name: d.name, color: d.color, value: d.items[0] };
      }) // keep only the last value of each time series
      .attr(
        "transform",
        (d) =>
          "translate(" +
          xScale(d.value.time) +
          "," +
          yScale(d.value.score) +
          ")"
      ) // Put the text at the position of the last point
      .attr("x", 12) // shift the text a bit more right
      .text((d) => d.name)
      .style("fill", (d) => d.color)
      .style("font-size", 15)
      .call(wrap, 50);
  }, [data, width]); // Redraw chart if data changes

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}

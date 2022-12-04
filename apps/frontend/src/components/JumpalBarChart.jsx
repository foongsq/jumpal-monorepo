import React from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

JumpalBarChart.propTypes = {
  data: PropTypes.array,
  dimensions: PropTypes.object,
};

export default function JumpalBarChart({ data, dimensions }) {
  // const [windowWidth, setWindowWidth] = useState(
  //   Math.min(window.innerWidth, 1000) * 0.95
  // );

  // const setDimension = () => {
  //   setWindowWidth(Math.min(window.innerWidth, 1000) * 0.95);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", setDimension);
  //   return () => {
  //     window.removeEventListener("resize", setDimension);
  //   };
  // }, [windowWidth, data]);

  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  React.useEffect(() => {
    const xScale = d3
      .scaleTime()
      .domain(
        d3.extent(data[0].items, (d) => {
          // console.log(new Date(d.time).getTime());
          return new Date(d.time).getTime();
        })
      )
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([
        Math.max(
          d3.min(data[0].items, (d) => {
            console.log(d.score);
            return parseInt(d.score);
          }) - 10,
          0
        ),
        d3.max(data[0].items, (d) => {
          console.log(d.score);
          return parseInt(d.score);
        }) + 10,
      ])
      .range([height, 0]);

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X grid lines with labels
    const xAxis = d3.axisBottom(xScale).ticks(5).tickSize(-height);
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);
    xAxisGroup.select(".domain").remove();
    xAxisGroup.selectAll("line").attr("stroke", "grey");
    xAxisGroup
      .selectAll("text")
      .attr("color", "grey")
      .attr("font-size", "0.75rem");
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.bottom)
      .text("Date");

    // Add Y grid lines with labels
    const yAxis = d3.axisLeft(yScale).ticks(10).tickSize(-width);
    const yAxisGroup = svg.append("g").call(yAxis);
    yAxisGroup.select(".domain").remove();
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
  }, [data]); // Redraw chart if data changes

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}

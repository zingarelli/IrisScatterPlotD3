import 'react-dropdown/style.css';
import { extent, format, scaleLinear, scaleOrdinal } from 'd3'
import { useData } from "./useData";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import Marks from "./Marks";
import Dropdown from 'react-dropdown';
import { useState } from 'react';
import ColorLegend from './ColorLegend';

const menuHeight = 60;
const width = 800;
const height = 570 - menuHeight;
const circleRadius = 7;

// we use margin to make room for axes in the plot area
const margin = { top: 70, right: 120, bottom: 75, left: 100 }
const xAxisLabelOffset = 55;
const yAxisLabelOffset = 50;
const titleYOffset = 40;

// innerWidth and innerHeight will represent the available space to actually plot the data
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

// options for the dropdown menus (using the third-party library)
const attributes = [
    { value: 'sepal_length', label: 'Sepal Length' },
    { value: 'sepal_width', label: 'Sepal Width' },
    { value: 'petal_length', label: 'Petal Length' },
    { value: 'petal_width', label: 'Petal Width' },
    { value: 'species', label: 'Species' },
]

// returns the text for a given value in attributes
const getText = value => {
    const attribute = attributes.find(item => item.value === value);
    return attribute ? attribute.label : '';
}

// render a scatter plot using iris dataset, with menus to change axes values. Each iris species will set a different color for the plot marks
export default function ScatterPlot() {
    const data = useData();
    const [hoveredValue, setHoveredValue] = useState(null);

    const initialXAttribute = 'sepal_length';
    const initialYAttribute = 'sepal_width';
    const [xAttribute, setXAttribute] = useState(initialXAttribute);
    const [yAttribute, setYAttribute] = useState(initialYAttribute);

    if (!data) return <pre>Loading...</pre>;

    // accessor functions that return what field in our data we want to represent x and y values
    const xValue = d => d[xAttribute];
    const yValue = d => d[yAttribute];

    // accessor function to get which iris species the element belongs to
    // will be used to paint the mark with a different color for each species
    const colorValue = d => d.species;

    // text for the X and Y axis and color legend
    const xAxisLabel = getText(xAttribute);
    const yAxisLabel = getText(yAttribute);
    const colorLegendLabel = 'Species';

    // d3.format returns a function that will receive a number as parameter and return a formatted string with the format specified as parameter in the format function. '.2s' will format the string using the International Systems of Units (SI - "Système International d'Unités") with 2 significant digits
    const formatToSI = format('.2s');

    // Linear scale transforms your domain (numerical data) to fit in the available range
    const xScale = scaleLinear()
        // extent function takes data and an accessor function to tell where to look for the data. It returns both min and max in an array [min, max]
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        // nice makes sure the domain starts and ends with "nice", rounded values
        .nice();

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([0, innerHeight]);

    // An ordinal scale uses discrete domain and range, and map each element in the domain to its correspondent element in range (domain[0] maps to range[0] and so on)
    const colorScale = scaleOrdinal()
        // map will return an array of species for all the elements of data, which will include duplicates, but domain() is inteligent enough to remove the duplicates and use an array of unique values.
        .domain(data.map(colorValue))
        // we map each element of the domain to a different color. We know beforehand that we only have 3 species, so we add 3 color values.
        .range(['#E6842A', '#137B80', '#8E6C8A']);

    // filteredData returns only data associated to a species, based on the item that is hovered on the color legend
    const filteredData = data.filter(d => colorValue(d) === hoveredValue);

    return (
        <>
            <div className='iris__menus'>                
                {/* using a third-party dropdown solution (https://github.com/fraserxu/react-dropdown) */}
                <div className='iris__dropdownContainer'>
                    <span>X</span>
                    <Dropdown
                        options={attributes}
                        value={initialXAttribute}
                        // to know what the onChange returns, console.log the event
                        // onChange={e => console.log(e)}
                        onChange={({ value }) => setXAttribute(value)}
                    />
                </div>
                <div className='iris__dropdownContainer'>
                    <span>Y</span>
                    <Dropdown
                        options={attributes}
                        value={initialYAttribute}
                        // to know what the onChange returns, console.log the event
                        // onChange={e => console.log(e)}
                        onChange={({ value }) => setYAttribute(value)}
                    />
                </div>
            </div>
            <svg width={width} height={height}>
                <text
                    className="title"
                    y={titleYOffset}
                    x={width / 2}
                    textAnchor="middle"
                >
                    Scatterplot for the Iris dataset
                </text>
                {/* adjust margin top and margin left */}
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom
                        xScale={xScale}
                        innerHeight={innerHeight}
                        tickFormat={formatToSI}
                    />
                    <text
                        className="axis-label"
                        textAnchor="middle"
                        x={innerWidth / 2}
                        y={innerHeight + xAxisLabelOffset}
                    >
                        {xAxisLabel}
                    </text>
                    <AxisLeft yScale={yScale} innerWidth={innerWidth} />
                    <text
                        className="axis-label"
                        textAnchor="middle"
                        // g is already translating this text, so we'll translate back to where we want the text to be, and then rotate it
                        transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
                    >
                        {yAxisLabel}
                    </text>
                    {/* when hovering over a color in the legend, we add opacity to every mark, and then use another Mark component with filtered data on top of this one, in order to hightlight the marks for the hovered color */}
                    <g opacity={hoveredValue ? 0.2 : 1}>
                        <Marks
                            data={data}
                            xScale={xScale}
                            yScale={yScale}
                            colorScale={colorScale}
                            xValue={xValue}
                            yValue={yValue}
                            colorValue={colorValue}
                            tooltipFormat={formatToSI}
                            circleRadius={circleRadius}
                        />
                    </g>
                    {/* adding the marks we want to highlight */}
                    <Marks
                        data={filteredData}
                        xScale={xScale}
                        yScale={yScale}
                        colorScale={colorScale}
                        xValue={xValue}
                        yValue={yValue}
                        colorValue={colorValue}
                        tooltipFormat={formatToSI}
                        circleRadius={circleRadius}
                    />
                    <g transform={`translate(${innerWidth + 30}, 50)`}>
                        <text
                            className="legend-label"
                            textAnchor="middle"
                            x={32}
                            y={-30}
                        >
                            {colorLegendLabel}
                        </text>
                        <ColorLegend
                            colorScale={colorScale}
                            tickSpacing={25}
                            tickSize={circleRadius}
                            tickTextOffset={12}
                            onHover={value => setHoveredValue(value)}
                            hoveredValue={hoveredValue}
                        />
                    </g>
                </g>
            </svg>
        </>
    )
}
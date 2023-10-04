// render vertical lines and tick values along the x-axis
export default function AxisBottom({ xScale, innerHeight, tickFormat }) {
    return (
        <>
            {/* vertical grid line for each tick value */}
            {xScale.ticks().map(value => (
                <g className="tick" key={value} transform={`translate(${xScale(value)}, 0)`}>
                    {/* line expects (x1, y1) and (x2, y2) coordinates to draw a line; when a value is not passed, it defaults to zero. Stroke, although required, is being set via CSS */}
                    <line
                        y2={innerHeight}
                    />
                    <text
                        y={innerHeight + 15}
                        // 'magic number' in dy for a vertical shift, so that text does not overlap with line
                        dy='0.71em'
                        style={{ textAnchor: 'middle' }}
                    >
                        {tickFormat(value)}
                    </text>
                </g>
            ))}
        </>
    )
}


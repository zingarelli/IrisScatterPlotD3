// draw circles representing each point in data, using the provided scales for x and y axis. It also paints the circle based on a color scale
export default function Marks({
    data,
    xScale,
    yScale,
    colorScale,
    xValue,
    yValue,
    colorValue, // accessor to which property in data to look for a color value
    tooltipFormat,
    circleRadius
}) {
    return (
        <>
            {data.map((d, index) => (
                <circle
                    key={index}
                    cx={xScale(xValue(d))}
                    cy={yScale(yValue(d))}
                    r={circleRadius}
                    fill={colorScale(colorValue(d))}
                >
                    {/* a title inside the circle element will create a text that will be displayed a few milliseconds after the user hovers over it (just like in an image tag) */}
                    <title>
                        ({tooltipFormat(xValue(d))}, {tooltipFormat(yValue(d))})
                    </title>
                </circle>
            ))}
        </>
    )
}
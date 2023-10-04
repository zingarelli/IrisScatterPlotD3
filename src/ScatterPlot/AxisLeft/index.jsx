// render horizontal lines and tick values along the y-axis
export default function AxisLeft({ yScale, innerWidth }) {
    return (
        <>
            {/* horizontal grid line for each tick value */}
            {yScale.ticks().map(value => (
                // the y position is being set by the tranform property
                <g className="tick" key={value} transform={`translate(0, ${yScale(value)})`}>
                    <line
                        x2={innerWidth}
                    />
                    <text
                        style={{ textAnchor: 'end' }}
                        // another magical number
                        dy={'.32em'}
                        x={-15}
                    >
                        {value}
                    </text>
                </g>
            ))}
        </>
    )
}
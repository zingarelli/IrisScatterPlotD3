// renders a legend for a color scale. colorScale is an ordinal scale, whose domain represents iris species and range represents a color. When an item is hovered over, we activate the parent's function to do something with the mouseEnter event
export default function ColorLegend({
    colorScale,
    tickSpacing = 20,
    tickSize = 8,
    tickTextOffset = 12,
    onHover,
    hoveredValue
}) {
    return (<>
        {colorScale.domain().map((domainValue, idx) => (
            <g
                className="tick"
                key={idx}
                transform={`translate(0, ${idx * tickSpacing})`}
                onMouseEnter={() => onHover(domainValue)}
                // we pass null when the mouse leaves to indicate that no item is hovered over
                onMouseOut={() => onHover(null)}
                // we add opacity to highlight the item that is being hovered over
                opacity={hoveredValue && domainValue !== hoveredValue ? 0.2 : 1}
            >
                <circle
                    fill={colorScale(domainValue)}
                    r={tickSize}
                />
                <text className="legend-text" dy='.32em' x={tickTextOffset}>{domainValue}</text>
            </g>
        ))}
    </>)
}
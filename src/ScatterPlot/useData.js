import { useEffect, useState } from "react";
import { csv } from 'd3'

const url = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv'

// custom hook to return data fetched from a URL
export const useData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // d3.csv() performs the fetch, parses the content from the response and returns it as a promise. The content will be an array of objects, each corresponding to a line in the csv file. 
        // d3.csv() can also receive a second argument, which is a callback function that you can define to transform the data for each row and return the transformed row. For example: create new columns (new properties for the object) or filter rows based on some condition.
        const row = d => {
            // making sure we're dealing with numbers
            d.sepal_length = +d.sepal_length;
            d.sepal_width = +d.sepal_width;
            d.petal_length = +d.petal_length;
            d.petal_width = +d.petal_width;
            return d;
        };
        csv(url, row).then(data => setData(data));
    }, [])

    return data;
}
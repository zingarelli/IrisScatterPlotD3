# Iris Scatter Plot 

[Click here to read the English version of this Readme](#credits)

Gráfico de dispersão baseado no famoso Iris dataset (um conjunto de dados a respeito de três espécies da flor Iris). É possível selecionar as características nos eixos X e Y, bem como ver dados específicos ao passar o mouse sobre uma espécie desejada na legenda.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Gráfico de dispersão colorido**
| :label: Tecnologias | D3, React, SVG
| :rocket: URL         | https://iris-scatter-plot-d3.vercel.app
| :fire: Curso     | https://www.youtube.com/watch?v=2LhoCfjm8R4

![](https://github.com/zingarelli/IrisScatterPlotD3/assets/19349339/22f56a58-9b54-4472-9568-2bac50ade1a2#vitrinedev)

## Créditos 

Este projeto foi baseado nas aulas do curso "Data Visualization with D3, JavaScript, React", criado por [Curran Kelleher](https://www.youtube.com/channel/UCSwd_9jyX4YtDYm9p9MxQqw) e disponível no [Youtube (em inglês)](https://www.youtube.com/watch?v=2LhoCfjm8R4).

Os menus dropdown para seleção dos dados para os eixos X e Y foram criados utilizando a biblioteca [react-dropdown](https://www.npmjs.com/package/react-dropdown), que permite criar um menu semelhante ao do elemento HTML `<select>`, porém mais customizável.

## Detalhes do projeto

Este é um projeto desenvolvido em React, que utiliza a [biblioteca D3](https://d3js.org) para criação dos componentes que constituem a área de plotagem dos dados, utilizados pelo componente `<ScatterPlot />`.

A pessoa usuária pode selecionar os dados que serão exibidos nos eixos X e Y, representados pelos componentes `<AxisBottom />` e `<AxisLeft />`, respectivamente. Os atributos disponíveis são Sepal Length, Sepal Width, Petal Length, Petal Width e Species. Os dados são plotados como círculos (component `<Marks />`), que utilizam uma escala ordinal para serem pintados com uma cor distinta, baseada na espécie que os dados representam, o que possibilita uma terceira dimensão para analisar os dados.

Há uma legenda posicionada ao lado direito do gráfico, indicando a cor aplicada a cada espécie. Ao passar o mouse sobre o nome ou a cor de uma das espécies, os dados dela são destacados no gráfico, como pode ser visto no GIF abaixo.

#![gráfico de dispersão "Sepal Length x Sepal Width". Ao passar o mouse sobre uma das espécies na legenda, seus dados são destacados no gráfico, enquanto os outros recebem uma cor opaca](https://github.com/zingarelli/IrisScatterPlotD3/assets/19349339/2e5c609d-9386-45c3-a5db-f7e79b09de1a)

## Instalação

O projeto foi criado com o [Vite](https://vitejs.dev).

Após cloná-lo ou baixá-lo, abra um terminal, navegue até a pasta do projeto e rode o comando abaixo para instalar as dependências necessárias.

    npm install

Feito isso, o app pode ser iniciado em modo de desenvolvimento com o seguinte comando:

    npm run dev

O app irá rodar na URL http://127.0.0.1:5173.

---

## Credits

This project was based on the lessons from the course "Data Visualization with D3, JavaScript, React," created by [Curran Kelleher](https://www.youtube.com/channel/UCSwd_9jyX4YtDYm9p9MxQqw) and available on [YouTube](https://www.youtube.com/watch?v=2LhoCfjm8R4).

The dropdown menus were created using the [react-dropdown library](https://www.npmjs.com/package/react-dropdown), which allows for the creation of a menu similar to the HTML `<select>` element but with more customization options.

## Project Details

This is a project developed in React, using the [D3 library](https://d3js.org) to create components that draw the plotting area, as can be seen in the `<ScatterPlot />` component.

Users can select which attributes will be represented in the X and Y axes, rendered by the `<AxisBottom />` and `<AxisLeft />` components, respectively. The available attributes are Sepal Length, Sepal Width, Petal Length, Petal Width, and Species. The data is plotted as circles (`<Marks />` component), using an ordinal scale to paint them in distinct colors based on the species the data represents, enabling a third dimension for data analysis.

There is a legend positioned on the right side of the chart, indicating the color applied to each species. When hovering over the name or color of one of the species, its data is highlighted on the chart, as can be seen in the GIF below.

![Scatter plot "Sepal Length x Sepal Width". When hovering over one of the species in the legend, its data is highlighted on the chart, while the others are painted with an opaque color](https://github.com/zingarelli/IrisScatterPlotD3/assets/19349339/2e5c609d-9386-45c3-a5db-f7e79b09de1a)

## Instalation

This is a React project bootstrapped with [Vite](https://vitejs.dev).

After cloning or downloading this project, open a terminal, navigate to the project's folder and run the following command in order to install all necessary dependencies:

    npm install

After that, you can run the app in development mode with the following command:

    npm run dev

The app will run at http://127.0.0.1:5173.
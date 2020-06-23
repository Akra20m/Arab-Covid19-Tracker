import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { CountryContext } from '../contexts/CountryContext';
import { translateName } from '../helper';

class PieChart extends React.Component {
  static contextType = CountryContext;

  componentDidMount() {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create('piechartdiv', am4charts.PieChart);
    // chart.innerRadius = am4core.percent(30);

    chart.data = this.context.countries.map((item) => {
      return {
        country: translateName[item.Slug],
        confirmedCases: item.TotalConfirmed,
        confirmedCasesAr: item.TotalConfirmed.toLocaleString('ar-EG')
      };
    });

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'confirmedCases';
    pieSeries.dataFields.category = 'country';
    pieSeries.slices.template.tooltipText = `[bold]{country}[/]
    الإصابات {confirmedCasesAr}`;
    pieSeries.labels.template.disabled = true;
    // pieSeries.labels.template.paddingTop = 0;
    // pieSeries.labels.template.paddingBottom = 0;
    // pieSeries.labels.template.fontSize = 14;

    pieSeries.slices.template.stroke = am4core.color('#000000');
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 0.9;
    pieSeries.radius = am4core.percent(75);
    let hs = pieSeries.slices.template.states.getKey('hover');
    hs.properties.scale = 1.5;
    let as = pieSeries.slices.template.states.getKey('active');
    as.properties.shiftRadius = 0;
    // chart.legend = new am4charts.Legend();
    // chart.legend.maxHeight = 60;
    // chart.legend.scrollable = true;
    // chart.legend.markers.template.disabled = true;
    // chart.legend.itemContainers.template.paddingTop = 0;
    // chart.legend.itemContainers.template.paddingBottom = 0;
    // chart.legend.itemContainers.template.fontSize = 10;
    // chart.legend.labels.template.text = '[bold]{name}[/]';
    // chart.legend.valueLabels.template.align = 'left';
    // chart.legend.valueLabels.template.textAlign = 'start';

    // this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div className={'piechart-container ' + this.context.currentStyle}>
        <h2>نسبة الإصابات لكل دولة</h2>
        <div className='piechart-custom' id='piechartdiv'></div>
      </div>
    );
  }
}

export default PieChart;

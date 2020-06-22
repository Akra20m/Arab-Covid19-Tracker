import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { CountryContext } from '../contexts/CountryContext';
import { translateName } from '../helper';

class PieChart extends React.Component {
  static contextType = CountryContext;

  componentDidMount() {
    console.log(this.context.countries);
    let chart = am4core.create('piechartdiv', am4charts.PieChart);

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
    pieSeries.slices.template.stroke = am4core.color('#000000');
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 0.9;
    pieSeries.radius = am4core.percent(65);
    let hs = pieSeries.slices.template.states.getKey('hover');
    hs.properties.scale = 1.5;
    let as = pieSeries.slices.template.states.getKey('active');
    as.properties.shiftRadius = 0;

    // chart.legend = new am4charts.Legend();

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div className={'piechart-container ' + this.context.currentStyle}>
        <div className='piechart-custom' id='piechartdiv'></div>
      </div>
    );
  }
}

export default PieChart;

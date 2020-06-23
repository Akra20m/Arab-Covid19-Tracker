import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import { CountryContext } from '../contexts/CountryContext';
import { translateName } from '../helper';

class NewMap extends React.Component {
  static contextType = CountryContext;
  createMap() {
    let map = am4core.create('mapdiv', am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Miller();
    let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.data = this.context.countries.map((item) => {
      return {
        id: item.CountryCode,
        TotalConfirmed: item.TotalConfirmed.toLocaleString('ar-EG'),
        TotalRecovered: item.TotalRecovered.toLocaleString('ar-EG'),
        TotalDeaths: item.TotalDeaths.toLocaleString('ar-EG'),
        name: translateName[item.Slug],
        value: item.TotalConfirmed
      };
    });
    polygonSeries.useGeodata = true;
    polygonSeries.include = [
      'DZ',
      'BH',
      'DJ',
      'EG',
      'IQ',
      'JO',
      'KW',
      'LB',
      'LY',
      'MR',
      'MA',
      'OM',
      'PS',
      'QA',
      'SA',
      'SO',
      'SD',
      'SY',
      'TN',
      'AE',
      'YE'
    ];
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,

      min: am4core.color(this.context.currentStyle ? '#d9fbfc' : '#fffce8'),
      max: am4core.color(this.context.currentStyle ? '#00adb5' : '#ffd800')
    });
    map.zoomControl = new am4maps.ZoomControl();

    // add heat legend
    var heatLegend = map.chartContainer.createChild(am4maps.HeatLegend);
    heatLegend.valign = 'bottom';
    heatLegend.align = 'left';
    heatLegend.width = am4core.percent(40);
    heatLegend.series = polygonSeries;
    heatLegend.orientation = 'horizontal';
    heatLegend.padding(20, 20, 20, 20);
    heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
    heatLegend.valueAxis.renderer.labels.template.fill = am4core.color('#fff');
    heatLegend.valueAxis.renderer.minGridDistance = 40;

    map.series.push(polygonSeries);
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = `[bold]{name}[/]
  الإصابات {TotalConfirmed}\nالمتعافين {TotalRecovered}\nالوفيات {TotalDeaths}`;
    let hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color(
      this.context.currentStyle ? '#00adb5' : '#ffd800'
    );

    this.map = map;
  }
  componentDidMount() {
    this.createMap();
  }
  componentDidUpdate() {
    this.createMap();
  }
  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <div className='map-container'>
        <div
          className={'map-custom ' + this.context.currentStyle}
          id='mapdiv'
        ></div>
      </div>
    );
  }
}

export default NewMap;

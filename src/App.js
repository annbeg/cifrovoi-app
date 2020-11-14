import logo from './logo.svg';
import './App.css';
// import Highcharts from 'highcharts';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Chart from './components/Chart.js';
// import Selecter from './components/Selecter.js';
import React, { useState, Component } from 'react'; 

// import селекта
import Select from "react-select";
import { FixedSizeList as List } from "react-window";

require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
// require('highcharts/modules/map')(Highcharts)


// НАЧАЛО СЕЛЕКТА


const height = 35;

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

const Selecter = ({ data, active, onChange }) => (

    <Select
        // style={{width:'10%'}}
        defaultValue={active}
        isMulti
        // name="colors"
        options = {data}
        components ={{ MenuList }}
        onChange = {(values) => onChange(values)}
        // onChange={(values) => console.log(values)}
        // className="basic-multi-select"
        // classNamePrefix="select"
    />
);



// КОНЕЦ СЕЛЕКТА


var users = require('./data_last.json');
var users1 = require('./data_last_13.json');



const skillsSet = require('./list_of_dicts.json');

var mom = Object.keys(users['scipy'])

mom.forEach(function(part, index) {
  this[index] = Number(part);
}, mom);

mom = [mom,Object.values(users['scipy'])][0].map((_, colIndex) => [mom,Object.values(users['scipy'])].map(row => row[colIndex]))

var mom1 = Object.keys(users1['scipy'])

mom1.forEach(function(part, index) {
  this[index] = Number(part);
}, mom1);

mom1= [mom1,Object.values(users1['scipy'])][0].map((_, colIndex) => [mom1,Object.values(users1['scipy'])].map(row => row[colIndex]))

// console.log(mom)

function App() {
  const [activeCharts, setActiveCharts] = useState([
    {value: 'scipy',label: 'scipy'}
  ]);
  const [optionSeries, setOptionSeries] = useState([
    {
    data: mom,
    name: 'numpy',
  },
  {
    data: mom1,
    name: 'scipy',
  }])
  const optionsStackOverflow = {
    title: {
      text: 'Востребованность на StackOverflow'
    },
    yAxis: [{
      height: '75%',
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        // text: 'AAPL'
      }
    }, {
      top: '75%',
      height: '25%',
      labels: {
        align: 'right',
        x: -3
      },
      offset: 0,
      title: {
        // text: 'MACD'
      }
    }],
    series: optionSeries
  }
  
  function onChoose(values) {
    if (values) {
        var series = []
        for (var step = 0;step<values.length;step++){
          var mom = Object.keys(users[values[step].label])

          mom.forEach(function(part, index) {
            this[index] = Number(part);
          }, mom);

          mom = [mom,Object.values(users[values[step].label])][0].map((_, colIndex) => [mom,Object.values(users[values[step].label])].map(row => row[colIndex]))

          var mom1 = Object.keys(users1[values[step].label])

          mom1.forEach(function(part, index) {
            this[index] = Number(part);
          }, mom1);

          mom1= [mom1,Object.values(users1[values[step].label])][0].map((_, colIndex) => [mom1,Object.values(users1[values[step].label])].map(row => row[colIndex]))
          series.push({
            data: mom,
            name: values[step].label,
          })
          series.push({
            data: mom1,
            name: values[step].label+' prediction',
          })
        }
        setOptionSeries(series)

    }else{
      setOptionSeries([])
    }
  }
  
  return (
    <div className='App'>
      <div style={{height:'100px'}}>

      </div>
      
          <Chart options={optionsStackOverflow}>
          </Chart>
        
      <div style={{width:'50%', margin: 'auto'}}>
        <Selecter data={skillsSet} active={activeCharts} onChange = {onChoose}></Selecter>
      </div>
    </div>
  );
}

export default App;
